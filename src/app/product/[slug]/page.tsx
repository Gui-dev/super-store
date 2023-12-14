import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

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
    <div className="flex">
      <h1>{slug}</h1>
    </div>
  )
}

export default ProductDetails
