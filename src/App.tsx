import { useMemo, useState } from "react"
import {
  Check,
  ChevronDown,
  Copy,
  Eye,
  EyeOff,
  MessageCircle,
  ShieldCheck,
} from "lucide-react"
import { Button } from "./components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Textarea } from "./components/ui/textarea"

interface MessageFields {
  service: string
  customer: string
  username: string
  password: string
  profile: string
  pin: string
  description: string
  warranty: string
  expirationDate: string
}

interface Feedback {
  action: "copy" | "copyBoth" | "share"
  message: string
  type: "error" | "success"
}

type FeedbackHandler = (feedback: Feedback) => void

const serviceOptions = [
  "Disney+ Sin Espn",
  "Disney+",
  "PrimeVideo",
  "HBO Max",
  "Spotify",
  "Netflix",
  "Canva Pro",
  "Capcut Pro",
  "Chatgpt+",
  "Crunchyroll",
  "YT Premiun",
  "Vix",
  "FlujoTv",
]

const warrantyDefault =
  "100% de garantia ante caidas y problemas con el servicio"

const paymentDetails = {
  ci: "18006390",
  phone: "04246598611",
  holder: "Virginia Rosales",
}

const initialFields: MessageFields = {
  service: "",
  customer: "",
  username: "",
  password: "",
  profile: "",
  pin: "",
  description: "",
  warranty: warrantyDefault,
  expirationDate: "",
}

const formattedMessageLabels = new Set([
  "*Servicio:*",
  "*Cliente:*",
  "*Usuario / Correo:*",
  "*Clave:*",
  "*Perfil:*",
  "*PIN:*",
  "*Descripción:*",
  "*Garantía:*",
  "*Fecha de vencimiento:*",
  "*Datos para realizar el pago*",
  "*C.I.:*",
  "*Teléfono:*",
  "*Titular:*",
  "*Monto:*",
])

function formatExpirationDate(value: string) {
  if (!value) return "[Fecha de vencimiento]"

  const [year, month, day] = value.split("-")
  if (!year || !month || !day) return value

  return `${day}/${month}/${year}`
}

function buildMessage(fields: MessageFields) {
  const accessDetails = [
    fields.username.trim()
      ? `📧 *Usuario / Correo:* ${fields.username.trim()}`
      : "",
    fields.password.trim() ? `🔑 *Clave:* ${fields.password.trim()}` : "",
    fields.profile.trim() ? `🎭 *Perfil:* ${fields.profile.trim()}` : "",
    fields.pin.trim() ? `🔢 *PIN:* ${fields.pin.trim()}` : "",
  ].filter(Boolean)

  return [
    `📺 *Servicio:* ${fields.service.trim() || "[Servicio]"}`,
    fields.customer.trim() ? `👤 *Cliente:* ${fields.customer.trim()}` : "",
    accessDetails.join("\n"),
    fields.description.trim()
      ? `📝 *Descripción:* ${fields.description.trim()}`
      : "",
    fields.warranty.trim() ? `🛡️ *Garantía:* ${fields.warranty.trim()}` : "",
    fields.expirationDate
      ? `📅 *Fecha de vencimiento:* ${formatExpirationDate(fields.expirationDate)}`
      : "",
  ]
    .filter(Boolean)
    .join("\n\n")
}

function buildPaymentMessage(amount: string) {
  return [
    "💳 *Datos para realizar el pago*",
    `🪪 *C.I.:* ${paymentDetails.ci}`,
    `📱 *Teléfono:* ${paymentDetails.phone}`,
    `👤 *Titular:* ${paymentDetails.holder}`,
    `💵 *Monto:* ${amount.trim() ? `Bs. ${amount.trim()}` : "[Monto en Bs.]"}`,
  ].join("\n")
}

function renderMessagePreview(message: string) {
  return message
    .split(/(\*(?:Datos para realizar el pago|(?:Servicio|Cliente|Usuario \/ Correo|Clave|Perfil|PIN|Descripción|Garantía|Fecha de vencimiento|C\.I\.|Teléfono|Titular|Monto):)\*)/g)
    .map((part, index) =>
      formattedMessageLabels.has(part) ? (
        <strong key={index}>{part.slice(1, -1)}</strong>
      ) : (
        part
      ),
    )
}

function App() {
  const [fields, setFields] = useState(initialFields)
  const [visibleCredentials, setVisibleCredentials] = useState({
    password: false,
    pin: false,
  })
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [isPaymentAmountValid, setIsPaymentAmountValid] = useState(false)
  const [paymentFeedback, setPaymentFeedback] = useState<Feedback | null>(null)
  const [combinedFeedback, setCombinedFeedback] = useState<Feedback | null>(null)

  const message = useMemo(() => buildMessage(fields), [fields])
  const paymentMessage = useMemo(
    () => buildPaymentMessage(paymentAmount),
    [paymentAmount],
  )
  const isReady = Boolean(fields.service.trim())
  const isPaymentReady =
    isPaymentAmountValid &&
    paymentAmount.trim() !== "" &&
    Number.isFinite(Number(paymentAmount)) &&
    Number(paymentAmount) > 0

  function updateField(field: keyof MessageFields, value: string) {
    setFields((currentFields) => ({ ...currentFields, [field]: value }))
    setFeedback(null)
    setCombinedFeedback(null)
  }

  function toggleCredential(field: keyof typeof visibleCredentials) {
    setVisibleCredentials((currentVisibility) => ({
      ...currentVisibility,
      [field]: !currentVisibility[field],
    }))
  }

  async function copyText(
    text: string,
    setResult: FeedbackHandler,
    successMessage: string,
    action: Feedback["action"] = "copy",
  ) {
    if (!navigator.clipboard?.writeText) {
      setResult({
        action,
        message:
          "Este navegador no permite copiar desde esta página. Usa Compartir por WhatsApp.",
        type: "error",
      })
      return
    }

    try {
      await navigator.clipboard.writeText(text)
      setResult({
        action,
        message: successMessage,
        type: "success",
      })
    } catch (error) {
      console.error("No se pudo copiar el mensaje.", error)
      setResult({
        action,
        message:
          "No se pudo copiar. Revisa los permisos del navegador o usa Compartir por WhatsApp.",
        type: "error",
      })
    }
  }

  async function copyMessage() {
    if (!isReady) return
    await copyText(
      message,
      setFeedback,
      "Mensaje copiado. Ya puedes pegarlo en WhatsApp.",
    )
  }

  async function copyPaymentMessage() {
    if (!isPaymentReady) return
    await copyText(
      paymentMessage,
      setPaymentFeedback,
      "Mensaje de pago copiado.",
    )
  }

  async function copyCombinedMessages() {
    if (!isReady || !isPaymentReady) return
    await copyText(
      `${message}\n\n${paymentMessage}`,
      setCombinedFeedback,
      "Ambos mensajes copiados.",
      "copyBoth",
    )
  }

  function shareMessage() {
    if (!isReady) return

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`
    const shareWindow = window.open(url, "_blank")

    if (!shareWindow) {
      setFeedback({
        action: "share",
        message:
          "El navegador bloqueó la nueva pestaña. Permite ventanas emergentes o copia el mensaje.",
        type: "error",
      })
      return
    }

    shareWindow.opener = null
    setFeedback({
      action: "share",
      message: "WhatsApp se abrió en una nueva pestaña.",
      type: "success",
    })
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <span className="brand-name">Mensaje de servicio</span>
          <span className="privacy-note">
            <ShieldCheck aria-hidden="true" size={16} />
            Procesamiento local · sin cuenta
          </span>
        </div>
      </header>

      <main className="main-content">
        <div className="page-intro">
          <h1>Prepara tu mensaje</h1>
          <p>
            Los datos del cliente a la izquierda; el mensaje listo para
            compartir, a la derecha.
          </p>
        </div>

        <div className="workspace">
          <Card className="workspace-card form-panel">
            <CardHeader className="panel-header">
              <CardTitle className="panel-title">Datos para el mensaje</CardTitle>
            </CardHeader>
            <CardContent className="panel-content">
              <form
                className="message-form"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="field-group">
                  <Label className="field-label" htmlFor="service">
                    Servicio
                  </Label>
                  <div className="service-select-wrap">
                    <select
                      className="service-select"
                      id="service"
                      onChange={(event) =>
                        updateField("service", event.target.value)
                      }
                      required
                      value={fields.service}
                    >
                      <option disabled value="">
                        Selecciona un servicio
                      </option>
                      {serviceOptions.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden="true"
                      className="service-select-icon"
                    />
                  </div>
                </div>

                <div className="field-group">
                  <Label className="field-label" htmlFor="customer">
                    Cliente <span className="optional-label">(opcional)</span>
                  </Label>
                  <Input
                    autoComplete="name"
                    id="customer"
                    onChange={(event) =>
                      updateField("customer", event.target.value)
                    }
                    placeholder="Nombre del cliente"
                    value={fields.customer}
                  />
                </div>

                <div className="field-group">
                  <Label className="field-label" htmlFor="username">
                    Usuario / Correo{" "}
                    <span className="optional-label">(opcional)</span>
                  </Label>
                  <Input
                    autoComplete="off"
                    id="username"
                    onChange={(event) =>
                      updateField("username", event.target.value)
                    }
                    placeholder="Usuario o correo de acceso"
                    value={fields.username}
                  />
                </div>

                <div className="field-row date-profile-row">
                  <div className="field-group">
                    <Label className="field-label" htmlFor="expiration-date">
                      Fecha de vencimiento{" "}
                    </Label>
                    <Input
                      className="expiration-date-input"
                      id="expiration-date"
                      onChange={(event) =>
                        updateField("expirationDate", event.target.value)
                      }
                      type="date"
                      value={fields.expirationDate}
                    />
                  </div>
                  <div className="field-group">
                    <Label className="field-label" htmlFor="profile">
                      Perfil <span className="optional-label">(opcional)</span>
                    </Label>
                    <Input
                      autoComplete="off"
                      id="profile"
                      onChange={(event) =>
                        updateField("profile", event.target.value)
                      }
                      placeholder="Perfil"
                      value={fields.profile}
                    />
                  </div>
                </div>

                <div className="field-row">
                  <div className="field-group">
                    <Label className="field-label" htmlFor="password">
                      Clave <span className="optional-label">(opcional)</span>
                    </Label>
                    <div className="secret-field">
                      <Input
                        autoComplete="new-password"
                        className="secret-input"
                        id="password"
                        onChange={(event) =>
                          updateField("password", event.target.value)
                        }
                        placeholder="Clave"
                        type={visibleCredentials.password ? "text" : "password"}
                        value={fields.password}
                      />
                      <Button
                        aria-label={
                          visibleCredentials.password
                            ? "Ocultar clave"
                            : "Mostrar clave"
                        }
                        className="secret-toggle"
                        onClick={() => toggleCredential("password")}
                        size="icon"
                        type="button"
                        variant="ghost"
                      >
                        {visibleCredentials.password ? (
                          <EyeOff aria-hidden="true" />
                        ) : (
                          <Eye aria-hidden="true" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="field-group">
                    <Label className="field-label" htmlFor="pin">
                      PIN <span className="optional-label">(opcional)</span>
                    </Label>
                    <div className="secret-field">
                      <Input
                        autoComplete="off"
                        className="secret-input"
                        id="pin"
                        inputMode="numeric"
                        onChange={(event) =>
                          updateField("pin", event.target.value)
                        }
                        placeholder="PIN"
                        type={visibleCredentials.pin ? "text" : "password"}
                        value={fields.pin}
                      />
                      <Button
                        aria-label={
                          visibleCredentials.pin ? "Ocultar PIN" : "Mostrar PIN"
                        }
                        className="secret-toggle"
                        onClick={() => toggleCredential("pin")}
                        size="icon"
                        type="button"
                        variant="ghost"
                      >
                        {visibleCredentials.pin ? (
                          <EyeOff aria-hidden="true" />
                        ) : (
                          <Eye aria-hidden="true" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="field-group">
                  <Label className="field-label" htmlFor="description">
                    Descripción{" "}
                    <span className="optional-label">(opcional)</span>
                  </Label>
                  <Textarea
                    className="short-textarea"
                    id="description"
                    onChange={(event) =>
                      updateField("description", event.target.value)
                    }
                    placeholder="Añade un detalle útil para tu cliente"
                    rows={2}
                    value={fields.description}
                  />
                </div>

                <div className="field-group">
                  <Label className="field-label" htmlFor="warranty">
                    Mensaje de garantía{" "}
                    <span className="optional-label">(opcional)</span>
                  </Label>
                  <Textarea
                    className="warranty-textarea"
                    id="warranty"
                    onChange={(event) =>
                      updateField("warranty", event.target.value)
                    }
                    rows={2}
                    value={fields.warranty}
                  />
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="workspace-card preview-panel">
            <CardHeader className="panel-header preview-header">
              <CardTitle className="panel-title">
                Vista previa para WhatsApp
              </CardTitle>
              <span className="live-indicator">
                <span aria-hidden="true" className="live-dot" />
                Se actualiza al escribir
              </span>
            </CardHeader>
            <CardContent className="preview-content">
              <pre aria-label="Vista previa del mensaje" className="message-preview">
                {renderMessagePreview(message)}
              </pre>
              <div className="action-row">
                <Button
                  className="action-button"
                  disabled={!isReady}
                  onClick={copyMessage}
                  type="button"
                >
                  {feedback?.action === "copy" && feedback.type === "success" ? (
                    <Check aria-hidden="true" />
                  ) : (
                    <Copy aria-hidden="true" />
                  )}
                  {feedback?.action === "copy" && feedback.type === "success"
                    ? "Mensaje copiado"
                    : "Copiar mensaje"}
                </Button>
                <Button
                  className="action-button"
                  disabled={!isReady}
                  onClick={shareMessage}
                  type="button"
                  variant="outline"
                >
                  <MessageCircle aria-hidden="true" />
                  Compartir por WhatsApp
                </Button>
              </div>
              <p className="review-note">
                Confirma los datos antes de enviar el mensaje.
              </p>
              {feedback && (
                <p
                  aria-live={feedback.type === "error" ? "assertive" : "polite"}
                  className={`feedback-message ${feedback.type}`}
                  role={feedback.type === "error" ? "alert" : "status"}
                >
                  {feedback.message}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="workspace payment-workspace">
          <Card className="workspace-card payment-form-panel">
            <CardHeader className="panel-header">
              <CardTitle className="panel-title">Datos para el pago</CardTitle>
            </CardHeader>
            <CardContent className="panel-content">
              <dl className="payment-details">
                <div className="payment-detail-row">
                  <dt>C.I.</dt>
                  <dd>{paymentDetails.ci}</dd>
                </div>
                <div className="payment-detail-row">
                  <dt>Teléfono</dt>
                  <dd>{paymentDetails.phone}</dd>
                </div>
                <div className="payment-detail-row">
                  <dt>Titular</dt>
                  <dd>{paymentDetails.holder}</dd>
                </div>
              </dl>
              <div className="field-group">
                <Label className="field-label" htmlFor="payment-amount">
                  Monto en Bs.
                </Label>
                <Input
                  autoComplete="off"
                  id="payment-amount"
                  inputMode="decimal"
                  min="0.01"
                  onChange={(event) => {
                    setPaymentAmount(event.target.value)
                    setIsPaymentAmountValid(event.currentTarget.validity.valid)
                    setPaymentFeedback(null)
                    setCombinedFeedback(null)
                  }}
                  placeholder="0,00"
                  required
                  step="0.01"
                  type="number"
                  value={paymentAmount}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="workspace-card preview-panel payment-preview-panel">
            <CardHeader className="panel-header preview-header">
              <CardTitle className="panel-title">
                Vista previa del mensaje de pago
              </CardTitle>
              <span className="live-indicator">
                <span aria-hidden="true" className="live-dot" />
                Se actualiza al escribir
              </span>
            </CardHeader>
            <CardContent className="preview-content">
              <pre
                aria-label="Vista previa del mensaje de pago"
                className="message-preview"
              >
                {renderMessagePreview(paymentMessage)}
              </pre>
              <div className="action-row">
                <Button
                  className="action-button"
                  disabled={!isPaymentReady}
                  onClick={copyPaymentMessage}
                  type="button"
                >
                  {paymentFeedback?.action === "copy" &&
                  paymentFeedback.type === "success" ? (
                    <Check aria-hidden="true" />
                  ) : (
                    <Copy aria-hidden="true" />
                  )}
                  {paymentFeedback?.action === "copy" &&
                  paymentFeedback.type === "success"
                    ? "Mensaje copiado"
                    : "Copiar mensaje"}
                </Button>
                <Button
                  className="action-button"
                  disabled={!isReady || !isPaymentReady}
                  onClick={copyCombinedMessages}
                  type="button"
                  variant="outline"
                >
                  {combinedFeedback?.type === "success" ? (
                    <Check aria-hidden="true" />
                  ) : (
                    <Copy aria-hidden="true" />
                  )}
                  {combinedFeedback?.type === "success"
                    ? "Ambos mensajes copiados"
                    : "Copiar ambos mensajes"}
                </Button>
              </div>
              {paymentFeedback && (
                <p
                  aria-live={
                    paymentFeedback.type === "error" ? "assertive" : "polite"
                  }
                  className={`feedback-message ${paymentFeedback.type}`}
                  role={
                    paymentFeedback.type === "error" ? "alert" : "status"
                  }
                >
                  {paymentFeedback.message}
                </p>
              )}
              {combinedFeedback && (
                <p
                  aria-live={
                    combinedFeedback.type === "error" ? "assertive" : "polite"
                  }
                  className={`feedback-message ${combinedFeedback.type}`}
                  role={
                    combinedFeedback.type === "error" ? "alert" : "status"
                  }
                >
                  {combinedFeedback.message}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default App
