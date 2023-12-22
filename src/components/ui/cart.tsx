'use client'

import { loadStripe } from '@stripe/stripe-js'

import { useCart } from '@/hooks/use-cart'
import { CartItem } from './cart-item'
import { computeProductTotalPrice } from '@/helpers/product'
import { Separator } from './separator'
import { ScrollArea } from './scroll-area'
import { Button } from './button'
import { createCheckout } from '@/actions/checkout'

export const Cart = () => {
  const { products, subtotal, total, total_discount } = useCart()

  const handleFineshedPurchase = async () => {
    const checkout = await createCheckout(products)
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    })
  }

  return (
    <div className="mt-8 flex h-full flex-col gap-5 pb-16">
      {products.length === 0 && (
        <div className="flex items-center justify-center">
          <p className="text-center">Você ainda não tem nenhum produto no carrinho!</p>
        </div>
      )}

      <ScrollArea className="h-full">
        <div className="flex h-full flex-col gap-5 overflow-hidden pb-4">
          {products.map((product) => {
            const product_final = computeProductTotalPrice({ product }) as any
            return <CartItem key={product.id} product={product_final} />
          })}
        </div>
      </ScrollArea>

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

          <Button className="mt-7 font-bold uppercase" onClick={handleFineshedPurchase}>
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  )
}
