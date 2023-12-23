'use server'

import { ICartProduct } from '@/providers/cart'
import { stripe } from '@/providers/stripe'

export const createCheckout = async (products: ICartProduct[]) => {
  const checkout = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: process.env.HOST_URL,
    cancel_url: process.env.HOST_URL,
    line_items: products.map((product) => {
      return {
        price_data: {
          currency: 'brl',
          product_data: {
            name: product.name,
            description: product.description,
            images: product.image_urls,
          },
          unit_amount: product.total_price * 100,
        },
        quantity: product.quantity,
      }
    }),
  })

  return checkout
}
