import { Categories } from './components/categories'
import { prisma } from '@/lib/prisma'
import { ProductList } from './components/product-list'
import { PromoBanner } from './components/promo-banner'

export default async function Home() {
  const deals = await prisma.product.findMany({
    where: {
      discount_percent: {
        gt: 0,
      },
    },
  })

  const keyboards = await prisma.product.findMany({
    where: {
      category: {
        slug: 'keyboards',
      },
    },
  })

  return (
    <main>
      <PromoBanner
        src="/banner-home-01.png"
        alt="Até 50% de Descontos só esse mês"
      />

      <section className="mt-8 px-5">
        <Categories />
      </section>

      <section className="py-8">
        <h1 className="mb-4 px-5 text-base font-bold uppercase">Ofertas</h1>
        <ProductList products={deals} />
      </section>

      <PromoBanner
        src="/banner-home-02.png"
        alt="Até 55% de Descontos em mouses"
      />

      <section className="py-8">
        <h1 className="mb-4 px-5 text-base font-bold uppercase">Teclados</h1>
        <ProductList products={keyboards} />
      </section>

      <PromoBanner
        src="/banner-home-03.png"
        alt="Até 20% de Descontos em Fones"
      />
    </main>
  )
}
