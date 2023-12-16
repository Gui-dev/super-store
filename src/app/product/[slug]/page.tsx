import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import ProductImages from './components/product-images'
import { ProductInfo } from './components/product-info'
import { computeProductTotalPrice } from '@/helpers/product'

interface IProductDetails {
  params: {
    slug: string
  }
}

const ProductDetails = async ({ params: { slug } }: IProductDetails) => {
  const product = await prisma.product.findFirst({
    where: {
      slug,
    },
  })

  if (!product) {
    redirect('/not-found')
  }

  const product_final = computeProductTotalPrice({ product })

  return (
    <article className="flex flex-col">
      <ProductImages
        image_urls={product.image_urls}
        product_name={product.name}
      />
      <div className="p-8">
        <ProductInfo product={product_final} />
      </div>
    </article>
  )
}

export default ProductDetails
