import { redirect } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { ProductItem } from '@/components/ui/product-item'
import { prisma } from '@/lib/prisma'
import { computeProductTotalPrice } from '@/helpers/product'
import { CATEGORY_ICON } from '@/constants/category-icon'

interface ICategory {
  params: {
    slug: string
  }
}

const Category = async ({ params: { slug } }: ICategory) => {
  const category = await prisma.category.findFirst({
    where: {
      slug,
    },
    include: {
      products: true,
    },
  })

  if (!category) {
    return redirect('/not-found')
  }

  return (
    <section className="mt-8 flex flex-col gap-8 px-8 pb-8">
      <Badge className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem]" variant="outline">
        {CATEGORY_ICON[slug as keyof typeof CATEGORY_ICON]}
        <h1 className="text-base uppercase">{category.name}</h1>
      </Badge>

      <div className="grid w-full grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {category.products.map((item) => {
          const product = computeProductTotalPrice({ product: item })
          return <ProductItem key={item.id} product={product} />
        })}
      </div>
    </section>
  )
}

export default Category
