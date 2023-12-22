import { NextRequest, NextResponse } from 'next/server'

import { stripe } from '@/providers/stripe'

export const POST = async (request: NextRequest) => {
  const text = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({
      code: 401,
      message: 'No signature found',
    })
  }

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET_KEY,
  )

  if (event.type === 'checkout.session.completed') {
    const session_with_line_items = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ['line_items'],
      },
    )

    console.log('SESSION_METADATA: ', session_with_line_items.line_items)
  }

  return NextResponse.json({
    code: 201,
    received: true,
  })
}
