import Image from 'next/image'

import { Categories } from './components/categories'
import { prisma } from '@/lib/prisma'
import { ProductList } from './components/product-list'

export default async function Home() {
  const deals = await prisma.product.findMany({
    where: {
      discount_percent: {
        gt: 0,
      },
    },
  })

  return (
    <main>
      <Image
        src="/banner-home-01.png"
        height={0}
        width={0}
        className="mt-5 h-auto w-full px-5"
        sizes="100vw"
        alt="Até 50% de Descontos só esse mês"
      />
      <section className="mt-8 px-5">
        <Categories />
      </section>

      <section className="py-8">
        <h1 className="mb-4 px-5 text-base font-bold">Ofertas</h1>
        <ProductList products={deals} />
      </section>
    </main>
  )
}
