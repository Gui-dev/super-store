import { Badge } from '@/components/ui/badge'
import { ShapesIcon } from 'lucide-react'
import { CategoryItem } from './components/category-item'
import { prisma } from '@/lib/prisma'

const Catalog = async () => {
  const categories = await prisma.category.findMany()

  return (
    <section className="mt-8 flex flex-col gap-8 px-8 pb-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem]"
        variant="outline"
      >
        <ShapesIcon size={16} />
        <h1 className="text-base uppercase">Catalogo</h1>
      </Badge>

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => {
          return <CategoryItem key={category.id} category={category} />
        })}
      </div>
    </section>
  )
}

export default Catalog
