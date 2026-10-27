---
name: "Mensaje de servicio"
description: "Prepara, revisa y comparte mensajes de entrega por WhatsApp."
colors:
  primary: "#2868e8"
  on-primary: "#ffffff"
  page-background: "#f9fafb"
  surface: "#ffffff"
  foreground: "#111827"
  body-text: "#374151"
  muted-text: "#6b7280"
  border: "#e5e7eb"
  input-border: "#d1d5db"
typography:
  title:
    fontFamily: "Inter Variable, Inter, sans-serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: "1.25"
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Inter Variable, Inter, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "1.5"
  label:
    fontFamily: "Inter Variable, Inter, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "1.35"
rounded:
  control: "6px"
  preview: "10px"
  panel: "12px"
spacing:
  field-gap: "8px"
  panel-inset: "20px"
  workspace-gap: "20px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.control}"
    height: "40px"
    padding: "0 14px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.body-text}"
    rounded: "{rounded.control}"
    height: "34px"
    padding: "7px 9px"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.panel}"
    padding: "20px"
---

# Design System: Mensaje de servicio

## Overview

**Creative North Star: "Revisa antes de enviar"**

The interface is a quiet, practical workspace for preparing a customer-facing message. It uses familiar web-app conventions so the form stays quick to scan and the final text remains easy to verify before sharing.

The visual language is intentionally restrained: cool page background, white bordered surfaces, readable dark text, and blue reserved for actions and focus. There is no decorative imagery or persistent navigation competing with the task.

**Key Characteristics:**
- A narrow form paired with a broader live preview on desktop.
- Clear, editable message content with bold, emoji-guided labels and optional details omitted when blank.
- Local-first interaction without retaining customer credentials.

## Colors

The palette stays neutral and cool, with one blue accent for primary actions and focus.

### Primary
- **Action Blue** (#2868e8): Copy action, focus accents, and small live-state indicators.

### Neutral
- **Cool Page Ground** (#f9fafb): Main application background.
- **White Surface** (#ffffff): Form, preview, header, and input backgrounds.
- **Ink** (#111827): Headings and primary text.
- **Message Text** (#374151): Preview and input values.
- **Muted Gray** (#6b7280): Supporting text and optional labels.
- **Soft Border** (#e5e7eb): Panel and preview boundaries.
- **Input Border** (#d1d5db): Form control outlines.

## Typography

**Display Font:** Inter Variable, Inter, sans-serif  
**Body Font:** Inter Variable, Inter, sans-serif  
**Label Font:** Inter Variable, Inter, sans-serif

**Character:** Neutral and direct, with restrained weight changes so field labels, panel titles, and the page heading remain easy to distinguish.

### Hierarchy
- **Title** (600, 28px, 1.25 line-height, -0.035em tracking): The page heading.
- **Panel title** (600, 15px, 1.4 line-height): Form and preview section headings.
- **Body** (400, 14px, 1.5 line-height): Supporting copy and message preview.
- **Label** (500, 12px, 1.35 line-height): Form labels and compact status text.

## Layout

At wide widths, center the workspace in a 1124px maximum container. Use a 390px form column, a flexible preview column, and a 20px gap. Stack the form above the preview at 900px and below. At 520px and below, use 16px page gutters, stack the expiration date and profile fields, and give the native date input a 44px touch height with 16px text; the desktop header and content use 20px gutters. Keep the primary actions directly below the preview.

Use compact 8px gaps between related form groups and 20px panel insets. Keep all form fields visible together on desktop and avoid horizontal scrolling at phone widths.

## Elevation & Depth

The interface is flat by default. White surfaces are separated from the page ground by thin borders rather than shadows. Focus is communicated with a blue border and a soft 3px ring; do not use ambient card shadows.

## Shapes

Use 12px corners for the main panels, 10px for the message preview, and 6px for controls and action buttons. Keep outlines thin and consistent. Avoid pill-shaped controls.

## Components

### Buttons
- **Shape:** 6px corners, 40px action height.
- **Primary:** Action Blue with white text; 14px horizontal padding.
- **Secondary:** White surface with a subtle outline and dark text.
- **Focus / Disabled:** Preserve the visible blue focus treatment; disabled actions remain visibly subdued until required fields are complete.

### Cards / Containers
- **Background:** White against the cool page ground.
- **Corner Style:** 12px panels with a 1px soft border and no shadow.
- **Internal Padding:** 20px.

### Inputs / Fields
- **Style:** White fill, 1px input border, 6px corners, 34px height.
- **Focus:** Blue border and soft blue ring.
- **Optional fields:** Mark as optional and omit them from the outgoing text when blank. Bold each outgoing field label and pair it with a relevant emoji.

### Message Preview
- **Style:** White surface with a 1px soft border, 10px corners, and 20px padding.
- **Content:** Preserve line breaks and wrap long text so the complete message can be reviewed before sharing.

## Do's and Don'ts

### Do:
- **Do** use Inter and the cool neutral palette with blue as the sole action accent.
- **Do** keep the preview visible beside the form on wide screens and below it on mobile.
- **Do** initialize the editable warranty text with the provider's approved message.
- **Do** keep credentials in the active page only; never add browser or server persistence.

### Don't:
- **Don't** invent warranty terms, customer information, or service credentials.
- **Don't** add gradients, decorative imagery, or card shadows to the work surface.
- **Don't** show blank optional fields in the message sent to WhatsApp.
