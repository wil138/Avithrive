import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body || {}

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }

    const encodedEmail = encodeURIComponent(String(email))
    const encodedPassword = encodeURIComponent(String(password))
    const backendUrl = `http://127.0.0.1:8005/login/${encodedEmail}/${encodedPassword}`

    const res = await fetch(backendUrl, { method: 'GET', headers: { accept: 'application/json' } })
    const text = await res.text().catch(() => '')

    const contentType = res.headers.get('content-type') || 'application/json'

    return new NextResponse(text, {
      status: res.status,
      headers: { 'content-type': contentType },
    })
  } catch (err) {
    return NextResponse.json({ error: 'Proxy error' }, { status: 502 })
  }
}
