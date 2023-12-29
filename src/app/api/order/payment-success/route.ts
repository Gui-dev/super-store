import { NextRequest, NextResponse } from 'next/server'

import { stripe } from '@/providers/stripe'
import { prisma } from '@/lib/prisma'

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
    const session = event.data.object
    await stripe.checkout.sessions.retrieve(event.data.object.id, {
      expand: ['line_items'],
    })

    await prisma.order.update({
      where: {
        id: session.metadata!.order_id,
      },
      data: {
        status: 'PAYMENT_CONFIRMED',
      },
    })
  }

  return NextResponse.json({
    code: 201,
    received: true,
  })
}
