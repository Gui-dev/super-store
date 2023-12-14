import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import ProductImages from './components/product-images'

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

  return (
    <article className="flex flex-col">
      <ProductImages
        image_urls={product.image_urls}
        product_name={product.name}
      />
      <div className="px-8">
        <h1>{product.name}</h1>
      </div>
    </article>
  )
}

export default ProductDetails
