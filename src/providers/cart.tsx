'use client'

import { ReactNode, createContext, useState } from 'react'
import { ProductWithTotalPrice } from '@/helpers/product'

export interface ICartProduct extends ProductWithTotalPrice {
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
    const product_is_already_on_cart = products.some(
      (cart_product) => cart_product.id === product.id,
    )
    if (product_is_already_on_cart) {
      setProducts((prev) =>
        prev.map((cart_product) => {
          if (cart_product.id === product.id) {
            return {
              ...cart_product,
              quantity: cart_product.quantity + product.quantity,
            }
          }
          return cart_product
        }),
      )
      return
    }
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
