'use client'

import { ICartProduct } from '@/providers/cart'
import Image from 'next/image'
import { Button } from './button'
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'

interface ICartItem {
  product: ICartProduct
}

export const CartItem = ({ product }: ICartItem) => {
  const { increaseProductQuantity, decreaseProductQuantity } = useCart()

  const handleIncreaseProductQuantity = () => {
    increaseProductQuantity(product.id)
  }

  const handleDecreaseProductQuantity = () => {
    decreaseProductQuantity(product.id)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.image_urls[0]}
            alt={product.name}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold">{product.name}</p>
          <div className="flex items-center gap-2">
            {product.discount_percent > 0 && (
              <>
                <p className="text-sm font-bold">
                  R$ {product.total_price.toFixed(2)}
                </p>
                <p className="text-xs line-through opacity-75">
                  R$ {Number(product.base_price).toFixed(2)}
                </p>
              </>
            )}
            {product.discount_percent === 0 && (
              <p className="text-sm font-bold">
                R$ {Number(product.base_price).toFixed(2)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7"
              onClick={handleDecreaseProductQuantity}
            >
              <MinusIcon size={16} />
            </Button>
            <span className="text-xs">{product.quantity}</span>
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7"
              onClick={handleIncreaseProductQuantity}
            >
              <PlusIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div>
        <Button size="icon" variant="outline" className="h-7 w-7">
          <TrashIcon size={16} />
        </Button>
      </div>
    </div>
  )
}
