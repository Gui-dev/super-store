import { Category } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface ICategoryItem {
  category: Category
}

export const CategoryItem = ({ category }: ICategoryItem) => {
  return (
    <Link href={`/category/${category.slug}`} className="flex flex-col">
      <div className="flex h-[150px] w-full items-center justify-center rounded-tl-lg rounded-tr-lg bg-gradient-to-r from-[#1A512E] to-[#63A91F]">
        <Image
          src={category.image_url}
          height={0}
          width={0}
          alt={category.name}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
        />
      </div>
      <div className="w-full rounded-bl-lg rounded-br-lg bg-accent py-3">
        <p className="text-center text-sm font-semibold">{category.name}</p>
      </div>
    </Link>
  )
}
