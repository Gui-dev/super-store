import Image from 'next/image'

import { Prisma } from '@prisma/client'
import { computeProductTotalPrice } from '@/helpers/product'

interface IOrderProductItem {
  order_product: Prisma.OrderProductGetPayload<{
    include: {
      product: true
    }
  }>
}

export const OrderProductItem = ({ order_product }: IOrderProductItem) => {
  const { base_price, discount_percent, total_price } =
    computeProductTotalPrice({
      product: order_product.product,
    })

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={order_product.product.image_urls[0]}
          alt={order_product.product.name}
          sizes="vw"
          height={0}
          width={0}
          className="h-auto w-auto object-contain"
        />
      </div>
      <div className="flex w-full flex-col gap-1">
        <div className="mb-1 flex items-center justify-center rounded-md bg-accent px-3 py-1">
          <p className="text-[10px]">
            Vendido e entregue por: <strong>Super Store</strong>
          </p>
        </div>
        <p className="text-xs">{order_product.product.name}</p>
        <div className="flex w-full flex-1 items-center justify-between">
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold">R$ {total_price.toFixed(2)}</p>
            {discount_percent > 0 && (
              <p className="text-xs line-through opacity-60">
                R$ {Number(base_price).toFixed(2)}
              </p>
            )}
          </div>
          <p className="text-xs opacity-60">qntd: {order_product.quantity}x</p>
        </div>
      </div>
    </div>
  )
}
