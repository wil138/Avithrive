import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password, name, email, age, phone } = body || {}

    if (!username || !password || !name || !email || !age || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const backendUrl = `https://fm5sp9ml-8005.use.devtunnels.ms/register`

    const res = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ username, password, name, email, age, phone }),
    })

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
