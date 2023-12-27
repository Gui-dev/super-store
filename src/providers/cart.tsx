'use client'

import { ReactNode, createContext, useEffect, useMemo, useState } from 'react'
import { ProductWithTotalPrice } from '@/helpers/product'

export interface ICartProduct extends ProductWithTotalPrice {
  quantity: number
}

interface ICartContext {
  products: ICartProduct[]
  cart_subtotal: number
  cart_total: number
  cart_total_discount: number
  subtotal: number
  total: number
  total_discount: number
  addProductToCart: (product: ICartProduct) => void
  removeProductsFromCart: (product_id: string) => void
  increaseProductQuantity: (product_id: string) => void
  decreaseProductQuantity: (product_id: string) => void
}

interface ICartProvider {
  children: ReactNode
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cart_subtotal: 0,
  cart_total: 0,
  cart_total_discount: 0,
  subtotal: 0,
  total: 0,
  total_discount: 0,
  addProductToCart: () => {},
  removeProductsFromCart: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
})

export const CartProvider = ({ children }: ICartProvider) => {
  const [products, setProducts] = useState<ICartProduct[]>([])
  const subtotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.base_price) * product.quantity
    }, 0)
  }, [products])
  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.total_price * product.quantity
    }, 0)
  }, [products])
  const total_discount = total - subtotal

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

  const removeProductsFromCart = (product_id: string) => {
    setProducts((prev) =>
      prev.filter((cart_product) => cart_product.id !== product_id),
    )
  }

  const increaseProductQuantity = (product_id: string) => {
    setProducts((prev) =>
      prev.map((cart_product) => {
        if (cart_product.id === product_id) {
          return {
            ...cart_product,
            quantity: cart_product.quantity + 1,
          }
        }
        return cart_product
      }),
    )
  }

  const decreaseProductQuantity = (product_id: string) => {
    setProducts((prev) =>
      prev
        .map((cart_product) => {
          if (cart_product.id === product_id) {
            return {
              ...cart_product,
              quantity: cart_product.quantity - 1,
            }
          }
          return cart_product
        })
        .filter((cart_product) => cart_product.quantity > 0),
    )
  }

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('@super_store:cart', JSON.stringify(products))
    }
  }, [products])

  useEffect(() => {
    const products = localStorage.getItem('@super_store:cart')
    if (products) {
      setProducts(JSON.parse(products))
    }
  }, [])

  return (
    <CartContext.Provider
      value={{
        products,
        cart_subtotal: 0,
        cart_total: 0,
        cart_total_discount: 0,
        subtotal,
        total,
        total_discount,
        addProductToCart,
        removeProductsFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
