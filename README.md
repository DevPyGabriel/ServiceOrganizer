# Mensaje de servicio

Aplicación web responsive para preparar, revisar y compartir mensajes de entrega de servicios por WhatsApp.

## Funcionalidades

- Permite elegir un servicio de un catálogo fijo.
- Incluye cliente, usuario/correo y fecha de vencimiento.
- Permite agregar clave, perfil, PIN y descripción de forma opcional.
- Inicia el mensaje editable de garantía con: `100% de garantia ante caidas y problemas con el servicio`.
- Destaca en negrita las etiquetas del mensaje y añade emojis para identificar cada dato.
- Omite los campos opcionales que se dejan vacíos.
- Actualiza la vista previa mientras se completa el formulario.
- Copia el mensaje o abre WhatsApp con el texto preparado.
- Mantiene los datos en la página abierta; no los guarda ni los envía a un servidor propio. Al compartir, el texto se incluye en el enlace de WhatsApp.

## Desarrollo local

Requiere Node.js y npm.

```bash
npm install
npm run dev
```

Para comprobar la compilación y previsualizar la versión de producción:

```bash
npm run lint
npm run build
npm run preview
```

## Publicación

Es un sitio estático, sin backend. Ejecuta `npm run build` y publica el contenido de `dist/` en cualquier proveedor de hosting estático. No se requiere configuración de servidor ni variables de entorno.

Publica el sitio con HTTPS: los navegadores requieren un contexto seguro para habilitar la API del portapapeles. El botón de WhatsApp abre `wa.me` para continuar en la aplicación o en WhatsApp Web.
