import Image from 'next/image'
import Link from 'next/link'

import { ProductWithTotalPrice } from '@/helpers/product'
import DiscountBadge from './discount-badge'

interface IProductItem {
  product: ProductWithTotalPrice
}

export const ProductItem = ({ product }: IProductItem) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <article className="relative flex flex-col gap-4">
        {product.discount_percent > 0 && (
          <DiscountBadge
            discount_percent={product.discount_percent}
            className="absolute left-3 top-3"
          />
        )}
        <div className="flex h-[170px] w-full items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.image_urls[0]}
            alt={product.name}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="max-w-[170px] truncate text-sm" title={product.name}>
            {product.name}
          </h1>
          <div className="flex items-center justify-center gap-2">
            {product.discount_percent > 0 && (
              <>
                <p className="text-base font-semibold">
                  R${product.total_price.toFixed(2)}
                </p>
                <p className="text-xs line-through opacity-75">
                  R${Number(product.base_price).toFixed(2)}
                </p>
              </>
            )}
            {product.discount_percent === 0 && (
              <p className="text-base font-semibold">
                R${Number(product.base_price).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
