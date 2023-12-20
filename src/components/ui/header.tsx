'use client'

import Link from 'next/link'

import { Card } from './card'
import { HeaderMenu } from './header-menu'
import { CartMenu } from './cart-menu'
import { useCart } from '@/hooks/use-cart'
import { Badge } from './badge'

export const Header = () => {
  const { products } = useCart()

  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <HeaderMenu />

      <Link href="/">
        <h1 className="text-lg font-semibold">
          <span className="text-primary">Super</span> Store
        </h1>
      </Link>

      <div className="relative">
        {products.length > 0 && (
          <Badge className="absolute -right-5 -top-5">
            <span className="text-xs">{products.length}</span>
          </Badge>
        )}
        <CartMenu />
      </div>
    </Card>
  )
}
