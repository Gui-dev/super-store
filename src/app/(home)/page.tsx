import Image from 'next/image'

import { Categories } from './components/categories'

export default function Home() {
  return (
    <main className="p-5">
      <Image
        src="/banner-home-01.png"
        height={0}
        width={0}
        className="h-auto w-full"
        sizes="100vw"
        alt="Até 50% de Descontos só esse mês"
      />
      <div className="mt-8">
        <Categories />
      </div>
    </main>
  )
}
