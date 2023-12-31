import { ProductItem } from '@/components/ui/product-item'
import { computeProductTotalPrice } from '@/helpers/product'
import { Product } from '@prisma/client'

interface IProductList {
  products: Product[]
}

export const ProductList = ({ products }: IProductList) => {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-8 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => {
        const product_final = computeProductTotalPrice({ product })
        return (
          <div key={product.id} className="w-[170px] max-w-[170px]">
            <ProductItem product={product_final} />
          </div>
        )
      })}
    </div>
  )
}
