'use client'

import { useCart } from '@/hooks/use-cart'
import { CartItem } from './cart-item'

export const Cart = () => {
  const { products } = useCart()

  return (
    <div className="flex">
      <h1>CART</h1>
      <CartItem products={products} />
    </div>
  )
}
