'use client'

import { useState } from 'react'
import { MinusIcon, PlusIcon, ShoppingCartIcon, TruckIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ProductWithTotalPrice } from '@/helpers/product'
import DiscountBadge from '@/components/ui/discount-badge'
import { useCart } from '@/hooks/use-cart'

interface IProductInfo {
  product: ProductWithTotalPrice
}

export const ProductInfo = ({ product }: IProductInfo) => {
  const [quantity, setQuantity] = useState(1)
  const { addProductToCart } = useCart()

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1))
  }

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleAddProductToCart = () => {
    addProductToCart({
      ...product,
      quantity,
    })
  }

  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-lg">{product.name}</h1>
      <div className="flex items-center">
        {product.discount_percent > 0 && (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">
                R$ {product.total_price.toFixed(2)}
              </h2>
              <DiscountBadge discount_percent={product.discount_percent} />
            </div>
            <p className="text-sm line-through opacity-75">
              De: R$ {Number(product.base_price).toFixed(2)}
            </p>
          </div>
        )}
        {product.discount_percent === 0 && (
          <h2 className="text-xl font-bold">
            R$ {Number(product.base_price).toFixed(2)}
          </h2>
        )}
      </div>
      <div className="flex items-center gap-4 py-4">
        <Button size="icon" variant="outline" onClick={handleDecreaseQuantity}>
          <MinusIcon size={16} />
        </Button>
        <span>{quantity}</span>
        <Button size="icon" variant="outline" onClick={handleIncreaseQuantity}>
          <PlusIcon size={16} />
        </Button>
      </div>

      <Button
        className="mt-8 flex items-center gap-2 font-bold uppercase"
        onClick={handleAddProductToCart}
      >
        <ShoppingCartIcon size={16} absoluteStrokeWidth />
        Adicionar ao carrinho
      </Button>

      <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-4 py-2">
        <div className="flex items-center gap-2">
          <TruckIcon />
          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold">Correios</span>
            </p>
            <p className="text-xs text-green-500">
              Envio para todo <span className="font-bold">Brasil</span>
            </p>
          </div>
        </div>
        <p className="text-xs font-bold">Frete grátis</p>
      </div>

      <div className="flex flex-col gap-3 py-8">
        <h3 className="text-base font-bold">Descrição</h3>
        <p className="text-sm leading-6 opacity-60">{product.description}</p>
      </div>
    </div>
  )
}
