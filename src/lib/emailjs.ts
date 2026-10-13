
// ─────────────────────────────────────────────────────────────
// EmailJS configuration
//
// How to set up:
//  1. Sign up at https://www.emailjs.com (free tier: 200 emails/month)
//  2. Add Email Service → connect your email account → copy the Service ID
//  3. Create an Email Template for the CONTACT form with these variables:
//       {{from_name}}  {{from_email}}  {{subject}}  {{budget}}  {{message}}
//     Set "To Email" to contact@techgeek.support
//     Copy the Template ID → paste into CONTACT_TEMPLATE_ID below
//  4. Create a second Email Template for the SUPPORT form with these variables:
//       {{from_name}}  {{from_email}}  {{category}}  {{question}}
//     Set "To Email" to contact@techgeek.support
//     Copy the Template ID → paste into SUPPORT_TEMPLATE_ID below
//  5. Go to Account → Public Key → paste into PUBLIC_KEY below
//
// ─────────────────────────────────────────────────────────────

export const EMAILJS_CONFIG = {
  PUBLIC_KEY:          import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  SERVICE_ID:          import.meta.env.VITE_EMAILJS_SERVICE_ID,
  CONTACT_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
  SUPPORT_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_SUPPORT_TEMPLATE_ID,
} as const


