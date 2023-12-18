import Link from 'next/link'

import { Card } from './card'
import { HeaderMenu } from './header-menu'
import { CartMenu } from './cart-menu'

export const Header = () => {
  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <HeaderMenu />

      <Link href="/">
        <h1 className="text-lg font-semibold">
          <span className="text-primary">Super</span> Store
        </h1>
      </Link>

      <CartMenu />
    </Card>
  )
}
