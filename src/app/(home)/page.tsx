import { Categories } from './components/categories'
import { prisma } from '@/lib/prisma'
import { ProductList } from '@/components/ui/product-list'
import { PromoBanner } from './components/promo-banner'

export default async function Home() {
  const deals_promise = prisma.product.findMany({
    where: {
      discount_percent: {
        gt: 0,
      },
    },
  })

  const keyboards_promise = prisma.product.findMany({
    where: {
      category: {
        slug: 'keyboards',
      },
    },
  })

  const headphones_promise = prisma.product.findMany({
    where: {
      category: {
        slug: 'headphones',
      },
    },
  })

  const [deals, keyboards, headphones] = await Promise.all([deals_promise, keyboards_promise, headphones_promise])

  return (
    <main>
      <PromoBanner src="/banner-home-01.png" alt="Até 50% de Descontos só esse mês" />

      <section className="mt-8 px-5">
        <Categories />
      </section>

      <section className="py-8">
        <h1 className="mb-4 px-5 text-base font-bold uppercase">Ofertas</h1>
        <ProductList products={deals} />
      </section>

      <PromoBanner src="/banner-home-02.png" alt="Até 55% de Descontos em mouses" />

      <section className="py-8">
        <h1 className="mb-4 px-5 text-base font-bold uppercase">Teclados</h1>
        <ProductList products={keyboards} />
      </section>

      <PromoBanner src="/banner-home-03.png" alt="Até 20% de Descontos em Fones" />

      <section className="py-8">
        <h1 className="mb-4 px-5 text-base font-bold uppercase">Fones</h1>
        <ProductList products={headphones} />
      </section>
    </main>
  )
}
