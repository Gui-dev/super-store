'use client'

import { useCart } from '@/hooks/use-cart'
import { CartItem } from './cart-item'
import { computeProductTotalPrice } from '@/helpers/product'

export const Cart = () => {
  const { products } = useCart()

  return (
    <div className="mt-8 flex flex-col gap-5">
      {products.map((product) => {
        const product_final = computeProductTotalPrice({ product }) as any
        return <CartItem key={product.id} product={product_final} />
      })}
    </div>
  )
}
