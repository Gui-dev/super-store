'use client'

import { ReactNode, createContext, useState } from 'react'
import { Product } from '@prisma/client'

export interface ICartProduct extends Product {
  quantity: number
}

interface ICartContext {
  products: ICartProduct[]
  cart_subtotal: number
  cart_total: number
  cart_total_discount: number
  addProductToCart: (product: ICartProduct) => void
}

interface ICartProvider {
  children: ReactNode
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cart_subtotal: 0,
  cart_total: 0,
  cart_total_discount: 0,
  addProductToCart: () => {},
})

export const CartProvider = ({ children }: ICartProvider) => {
  const [products, setProducts] = useState<ICartProduct[]>([])

  const addProductToCart = (product: ICartProduct) => {
    setProducts((prev) => [...prev, product])
  }
  return (
    <CartContext.Provider
      value={{
        products,
        cart_subtotal: 0,
        cart_total: 0,
        cart_total_discount: 0,
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
