'use client'

import { useState } from 'react'
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

type Fields = { name: string; email: string; subject: string; message: string }
type Status = 'idle' | 'loading' | 'success' | 'error'

const EMPTY: Fields = { name: '', email: '', subject: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: Fields): Partial<Record<keyof Fields, string>> {
  const e: Partial<Record<keyof Fields, string>> = {}
  if (values.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!EMAIL_RE.test(values.email.trim())) e.email = 'Please enter a valid email.'
  if (values.subject.trim().length < 2) e.subject = 'Please add a subject.'
  if (values.message.trim().length < 10) e.message = 'Tell me a little more (10+ chars).'
  return e
}

export default function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState<string>('')

  const update =
    (key: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }))
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError('')
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        if (data?.fields) setErrors(data.fields)
        setServerError(data?.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      setValues(EMPTY)
    } catch {
      setServerError('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-red/15 text-accent-red">
          <CheckCircle2 size={34} />
        </div>
        <h3 className="font-display text-2xl font-bold text-white">Message sent!</h3>
        <p className="max-w-[34ch] font-body text-sm leading-relaxed text-white/55">
          Thanks for reaching out — your message landed in my inbox. I usually reply within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-2 rounded-full border border-white/15 px-6 py-2.5 font-body text-sm font-medium text-white/80 transition-colors hover:border-accent-red/50 hover:text-white"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          value={values.name}
          onChange={update('name')}
          error={errors.name}
          placeholder="Your name"
          autoComplete="name"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={update('email')}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <Field
        label="Subject"
        name="subject"
        value={values.subject}
        onChange={update('subject')}
        error={errors.subject}
        placeholder="What's this about?"
      />

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={update('message')}
          placeholder="Tell me about your project, role, or idea…"
          aria-invalid={!!errors.message}
          className={`resize-none rounded-xl border bg-white/[0.04] px-4 py-3 font-body text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-accent-red/60 focus:bg-white/[0.06] ${
            errors.message ? 'border-accent-red/70' : 'border-white/12'
          }`}
        />
        {errors.message && <FieldError msg={errors.message} />}
      </div>

      {serverError && (
        <div className="flex items-center gap-2 rounded-xl border border-accent-red/40 bg-accent-red/10 px-4 py-3 font-body text-sm text-white/80">
          <AlertCircle size={16} className="shrink-0 text-accent-red" />
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="group mt-1 flex items-center justify-center gap-2.5 rounded-full bg-accent-red px-8 py-4 font-body text-base font-semibold text-white shadow-[0_12px_40px_-8px_rgba(194,54,47,0.55)] transition-all duration-300 hover:bg-accent-deep hover:shadow-[0_16px_48px_-8px_rgba(194,54,47,0.65)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send size={17} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>
    </form>
  )
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
  autoComplete,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  placeholder?: string
  type?: string
  autoComplete?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={`rounded-xl border bg-white/[0.04] px-4 py-3 font-body text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-accent-red/60 focus:bg-white/[0.06] ${
          error ? 'border-accent-red/70' : 'border-white/12'
        }`}
      />
      {error && <FieldError msg={error} />}
    </div>
  )
}

function FieldError({ msg }: { msg: string }) {
  return (
    <span className="flex items-center gap-1.5 font-body text-xs text-accent-red">
      <AlertCircle size={12} />
      {msg}
    </span>
  )
}
