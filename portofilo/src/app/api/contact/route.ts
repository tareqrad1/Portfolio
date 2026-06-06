import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Run on the Node.js runtime (Resend SDK needs it, not the edge runtime).
export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ContactPayload = {
  name?: unknown
  email?: unknown
  subject?: unknown
  message?: unknown
}

// Minimal HTML escaping so user input can't inject markup into the email.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: Request) {
  let body: ContactPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  // ── Validation ──
  const errors: Record<string, string> = {}
  if (name.length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email.'
  if (subject.length < 2) errors.subject = 'Please add a subject.'
  if (message.length < 10) errors.message = 'Message must be at least 10 characters.'
  if (name.length > 120 || subject.length > 160 || message.length > 5000) {
    errors.message = 'One or more fields are too long.'
  }
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed.', fields: errors }, { status: 422 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !to || !from) {
    console.error('Contact form: missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL')
    return NextResponse.json(
      { error: 'Email service is not configured. Please try again later.' },
      { status: 500 },
    )
  }

  const resend = new Resend(apiKey)

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    subject: escapeHtml(subject),
    message: escapeHtml(message).replace(/\n/g, '<br />'),
  }

  try {
    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${from}>`,
      to: [to],
      replyTo: email, // replying in your inbox goes straight to the sender
      subject: `Portfolio · ${subject}`,
      text: `New message from your portfolio contact form\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `
        <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;background:#f5f1ec;border-radius:16px;overflow:hidden;border:1px solid rgba(26,26,26,0.1)">
          <div style="height:6px;background:linear-gradient(90deg,#C2362F,#8E2A28)"></div>
          <div style="padding:28px 32px">
            <p style="margin:0 0 18px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#C2362F;font-weight:700">New Portfolio Message</p>
            <table style="width:100%;border-collapse:collapse;font-size:14px;color:#1a1a1a">
              <tr><td style="padding:6px 0;color:#4A453F;width:90px">Name</td><td style="padding:6px 0;font-weight:600">${safe.name}</td></tr>
              <tr><td style="padding:6px 0;color:#4A453F">Email</td><td style="padding:6px 0;font-weight:600"><a href="mailto:${safe.email}" style="color:#C2362F;text-decoration:none">${safe.email}</a></td></tr>
              <tr><td style="padding:6px 0;color:#4A453F">Subject</td><td style="padding:6px 0;font-weight:600">${safe.subject}</td></tr>
            </table>
            <div style="margin-top:20px;padding:18px;background:#ffffff;border:1px solid rgba(26,26,26,0.08);border-radius:12px;font-size:14px;line-height:1.6;color:#1a1a1a">${safe.message}</div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend send error:', error)
      return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
