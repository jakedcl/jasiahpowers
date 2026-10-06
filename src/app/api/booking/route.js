import { createClient } from '@sanity/client'
import { projectId, dataset } from '@/lib/sanity'
import { BOOKING_TYPES } from '@/lib/booking'

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

  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token) {
    return Response.json(
      { error: 'Booking inbox is not configured.', fallback: true },
      { status: 503 }
    )
  }

  try {
    const writer = createClient({
      projectId,
      dataset,
      apiVersion: '2023-05-03',
      token,
      useCdn: false,
    })
    await writer.create({
      _type: 'bookingRequest',
      name,
      email,
      phone: phone || undefined,
      projectType,
      date: date || undefined,
      budget: budget || undefined,
      details,
      submittedAt: new Date().toISOString(),
    })
  } catch {
    return Response.json(
      { error: 'Could not save the request.', fallback: true },
      { status: 502 }
    )
  }

  return Response.json({ ok: true })
}
