import { Resend } from 'resend'
import { BOOKING_TYPES } from '@/lib/booking'

const DEFAULT_TO = 'jasiahsteez@gmail.com'
const DEFAULT_FROM = 'onboarding@resend.dev'

function clean(value, max) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, max)
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const name = clean(body.name, 120)
  const email = clean(body.email, 200)
  const phone = clean(body.phone, 40)
  const projectType = clean(body.projectType, 40)
  const date = clean(body.date, 20)
  const budget = clean(body.budget, 80)
  const details = String(body.details || '').trim().slice(0, 4000)

  const fields = {}
  if (name.length < 2) fields.name = 'Name is required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fields.email = 'A valid email is required.'
  }
  if (phone && !/^[0-9+().\-\s]{7,40}$/.test(phone)) {
    fields.phone = 'Check the phone number.'
  }
  if (!BOOKING_TYPES.includes(projectType)) {
    fields.projectType = 'Choose a booking type.'
  }
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    fields.date = 'Use a valid date.'
  }
  if (details.length < 10) fields.details = 'Add a few details.'

  if (Object.keys(fields).length) {
    return Response.json({ error: 'Check the form.', fields }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return Response.json(
      { error: 'Booking email is not configured.', fallback: true },
      { status: 503 }
    )
  }

  const lines = [`Name: ${name}`, `Email: ${email}`]
  if (phone) lines.push(`Phone: ${phone}`)
  lines.push(`Booking: ${projectType}`)
  if (date) lines.push(`Date: ${date}`)
  if (budget) lines.push(`Budget: ${budget}`)
  lines.push('', details)

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: process.env.BOOKING_FROM_EMAIL || DEFAULT_FROM,
      to: process.env.BOOKING_TO_EMAIL || DEFAULT_TO,
      replyTo: email,
      subject: `Booking request: ${projectType} from ${name}`,
      text: lines.join('\n'),
    })
    if (error) {
      return Response.json(
        { error: 'Could not send the request.', fallback: true },
        { status: 502 }
      )
    }
  } catch {
    return Response.json(
      { error: 'Could not send the request.', fallback: true },
      { status: 502 }
    )
  }

  return Response.json({ ok: true })
}
