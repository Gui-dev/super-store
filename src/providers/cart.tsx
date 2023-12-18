'use client'

import { ReactNode, createContext } from 'react'
import { Product } from '@prisma/client'

interface ICartProduct extends Product {
  quantity: number
}

interface ICartContext {
  products: ICartProduct[]
  cart_subtotal: number
  cart_total: number
  cart_total_discount: number
}

interface ICartProvider {
  children: ReactNode
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cart_subtotal: 0,
  cart_total: 0,
  cart_total_discount: 0,
})

export const CartProvider = ({ children }: ICartProvider) => {
  return (
    <CartContext.Provider
      value={{
        products: [],
        cart_subtotal: 0,
        cart_total: 0,
        cart_total_discount: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
