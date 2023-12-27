import { PercentIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { ProductItem } from '@/components/ui/product-item'
import { computeProductTotalPrice } from '@/helpers/product'
import { prisma } from '@/lib/prisma'

const Deals = async () => {
  const deals = await prisma.product.findMany({
    where: {
      discount_percent: {
        gt: 0,
      },
    },
  })

  return (
    <div className="mt-8 flex flex-col gap-4 px-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem]"
        variant="outline"
      >
        <PercentIcon size={16} />
        <h1 className="text-base uppercase">Ofertas</h1>
      </Badge>
      <div className="grid grid-cols-2 gap-8">
        {deals.map((deal) => {
          const final_deal = computeProductTotalPrice({ product: deal })
          return <ProductItem key={final_deal.id} product={final_deal} />
        })}
      </div>
    </div>
  )
}

export default Deals
