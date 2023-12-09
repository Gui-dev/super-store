import { Product } from '@prisma/client'

type computeProductTotalPriceProps = {
  product: Product
}

export type ProductWithTotalPrice = Product & {
  total_price: number
}

export const computeProductTotalPrice = ({
  product,
}: computeProductTotalPriceProps): ProductWithTotalPrice => {
  if (product.discount_percent === 0) {
    return {
      ...product,
      total_price: Number(product.base_price),
    }
  }
  const total_discount =
    Number(product.base_price) * (product.discount_percent / 100)
  const total_price = Number(product.base_price) - total_discount

  return {
    ...product,
    total_price,
  }
}
