'use client'

import { useState } from 'react'
import { BOOKING_TYPES } from '@/lib/booking'
import { contactHref } from '@/lib/site'

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  date: '',
  budget: '',
  details: '',
}

function mailtoFor(email, values) {
  const lines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.phone ? `Phone: ${values.phone}` : '',
    `Booking: ${values.projectType}`,
    values.date ? `Date: ${values.date}` : '',
    values.budget ? `Budget: ${values.budget}` : '',
    '',
    values.details,
  ].filter(Boolean)
  const subject = encodeURIComponent('Booking request')
  const body = encodeURIComponent(lines.join('\n'))
  const address = contactHref(email).split('?')[0]
  return `${address}?subject=${subject}&body=${body}`
}

export default function BookingForm({ email }) {
  const [values, setValues] = useState(EMPTY)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [fallback, setFallback] = useState(false)

  function update(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  async function onSubmit(event) {
    event.preventDefault()
    setStatus('sending')
    setMessage('')
    setFieldErrors({})
    setFallback(false)

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setStatus('success')
        setValues(EMPTY)
        return
      }
      setStatus('error')
      setMessage(data.error || 'Could not send that.')
      setFieldErrors(data.fields || {})
      setFallback(Boolean(data.fallback))
    } catch {
      setStatus('error')
      setMessage('Could not send that.')
      setFallback(true)
    }
  }

  if (status === 'success') {
    return (
      <p className="form-status" role="status">
        Request sent.
      </p>
    )
  }

  return (
    <form className="booking-form" onSubmit={onSubmit} noValidate>
      <label className="field">
        <span>Name</span>
        <input
          name="name"
          value={values.name}
          onChange={update}
          autoComplete="name"
          required
        />
        {fieldErrors.name ? <small>{fieldErrors.name}</small> : null}
      </label>
      <label className="field">
        <span>Email</span>
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={update}
          autoComplete="email"
          required
        />
        {fieldErrors.email ? <small>{fieldErrors.email}</small> : null}
      </label>
      <label className="field">
        <span>Phone (optional)</span>
        <input
          name="phone"
          type="tel"
          value={values.phone}
          onChange={update}
          autoComplete="tel"
        />
        {fieldErrors.phone ? <small>{fieldErrors.phone}</small> : null}
      </label>
      <label className="field">
        <span>Booking</span>
        <select
          name="projectType"
          value={values.projectType}
          onChange={update}
          required
        >
          <option value="">Choose</option>
          {BOOKING_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {fieldErrors.projectType ? <small>{fieldErrors.projectType}</small> : null}
      </label>
      <label className="field">
        <span>Date (optional)</span>
        <input name="date" type="date" value={values.date} onChange={update} />
        {fieldErrors.date ? <small>{fieldErrors.date}</small> : null}
      </label>
      <label className="field">
        <span>Budget (optional)</span>
        <input name="budget" value={values.budget} onChange={update} />
      </label>
      <label className="field">
        <span>Details</span>
        <textarea
          name="details"
          rows={6}
          value={values.details}
          onChange={update}
          required
        />
        {fieldErrors.details ? <small>{fieldErrors.details}</small> : null}
      </label>
      <button className="send" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending' : 'Send request'}
      </button>
      {status === 'error' ? (
        <p className="form-status" role="alert">
          {message}{' '}
          {fallback ? (
            <a href={mailtoFor(email, values)}>Email Jasiah instead.</a>
          ) : null}
        </p>
      ) : null}
    </form>
  )
}
