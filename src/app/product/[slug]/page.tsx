import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import ProductImages from './components/product-images'
import { ProductInfo } from './components/product-info'
import { computeProductTotalPrice } from '@/helpers/product'
import { ProductList } from '@/components/ui/product-list'

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
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  })

  if (!product) {
    redirect('/not-found')
  }

  const product_final = computeProductTotalPrice({ product })
  const recommended_products = product.category.products

  return (
    <article className="flex flex-col">
      <ProductImages image_urls={product.image_urls} product_name={product.name} />
      <div className="px-8 py-4">
        <ProductInfo product={product_final} />
      </div>
      <div className="flex flex-col gap-4 pb-8">
        <h2 className="px-8">Produtos recomendados</h2>
        <ProductList products={recommended_products} />
      </div>
    </article>
  )
}

export default ProductDetails
