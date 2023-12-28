'use server'

import { prisma } from '@/lib/prisma'
import { ICartProduct } from '@/providers/cart'
import { Order } from '@prisma/client'

interface ICreateOrder {
  products: ICartProduct[]
  user_id: string
}

export const createOrder = async ({
  products,
  user_id,
}: ICreateOrder): Promise<Order> => {
  const order = await prisma.order.create({
    data: {
      user_id,
      status: 'WAITING_FOR_PAYMENT',
      order_product: {
        createMany: {
          data: products.map((product) => {
            return {
              product_id: product.id,
              base_price: product.base_price,
              discount_percent: product.discount_percent,
              quantity: product.quantity,
            }
          }),
        },
      },
    },
  })

  return order
}
