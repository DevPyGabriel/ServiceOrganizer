# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + TypeScript + Vite, using shadcn/ui. Deployable as a static website.

## Users

Personal use by a service provider preparing delivery messages for end customers.

## Product Purpose

Create a clear, formatted WhatsApp message containing service and customer details, ready to copy or share from any device.

## Capabilities and Constraints

- Include the service in each message; customer, username/email, and expiration date are optional and omitted when blank.
- Support optional password, profile, PIN, and description fields.
- Allow the optional warranty message to be edited, prefilled with "100% de garantia ante caidas y problemas con el servicio".
- Allow the prepared message to be copied or shared directly through WhatsApp.
- Provide a separate copyable payment message with predefined C.I., phone, and account holder details, plus a user-entered amount in Bs.
- Allow copying the service and payment messages together only when the required service details and a valid positive payment amount are provided.
- Select the service from the user's fixed catalog.
- Format message field labels in bold and add a guiding emoji to each label.
- Require only the service field in the service message and omit other blank optional details.
- Keep credentials in the current page session; do not persist them.
- Support a responsive web experience on desktop and mobile devices.
- Deployment host is undecided.

## Brand Commitments

Use the Inter font and shadcn/ui components.

## Evidence on Hand

- User-provided service selector: Disney+ Sin Espn, Disney+, PrimeVideo, HBO Max, Spotify, Netflix, Canva Pro, Capcut Pro, Chatgpt+, Crunchyroll, YT Premiun, Vix, and FlujoTv.
- User-provided warranty message: "100% de garantia ante caidas y problemas con el servicio". No customer data was provided.

## Product Principles

- Make it quick to prepare a complete customer message.
- Keep optional details out of the message when they are blank.
- Make the final message easy to review, copy, and share.
- Avoid retaining credentials after the current page session.
