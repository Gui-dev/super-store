import {
  HomeIcon,
  ListOrderedIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from 'lucide-react'

import { Button } from './button'
import { Card } from './card'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './sheet'
import { AuthButton } from './auth-button'
import { UserAvatar } from './user-avatar'
import Link from 'next/link'

export const Header = () => {
  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <h1 className="text-left text-sm font-semibold">Menu</h1>
          </SheetHeader>

          <UserAvatar />

          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/"
              className="flex w-full items-center justify-start gap-2"
            >
              <HomeIcon size={16} />
              Home
            </Link>
            <Link
              href="/offers"
              className="flex w-full items-center justify-start gap-2"
            >
              <PercentIcon size={16} />
              Ofertas
            </Link>
            <Link
              href="/catalog"
              className="flex w-full items-center justify-start gap-2"
            >
              <ListOrderedIcon size={16} />
              Catálogo
            </Link>
            <AuthButton />
          </div>
        </SheetContent>
      </Sheet>

      <h1 className="text-lg font-semibold">
        <span className="text-primary">Super</span> Store
      </h1>
      <Button size="icon" variant="outline">
        <ShoppingCartIcon />
      </Button>
    </Card>
  )
}
