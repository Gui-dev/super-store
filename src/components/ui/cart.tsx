'use client'

import { useCart } from '@/hooks/use-cart'
import { CartItem } from './cart-item'
import { computeProductTotalPrice } from '@/helpers/product'
import { Separator } from './separator'

export const Cart = () => {
  const { products, subtotal, total, total_discount } = useCart()

  return (
    <div className="mt-8 flex flex-col gap-5">
      {products.length === 0 && (
        <div className="flex items-center justify-center">
          <p className="text-center">
            Você ainda não tem nenhum produto no carrinho!
          </p>
        </div>
      )}

      {products.map((product) => {
        const product_final = computeProductTotalPrice({ product }) as any
        return <CartItem key={product.id} product={product_final} />
      })}

      {products.length > 0 && (
        <div className="flex flex-col gap-3">
          <Separator />
          <div className="flex items-center justify-between text-xs">
            <span>Subtotal</span>
            <strong>R$ {subtotal.toFixed(2)}</strong>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-xs">
            <span>Entrega</span>
            <p>Grátis</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-xs">
            <span>Total de descontos</span>
            <strong>R$ {total_discount.toFixed(2)}</strong>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-xs">
            <span>Total </span>
            <strong className="text-lg">R$ {total.toFixed(2)}</strong>
          </div>
        </div>
      )}
    </div>
  )
}
