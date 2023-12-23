import Link from 'next/link'
import { HomeIcon, ListOrderedIcon, MenuIcon, PercentIcon } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from './sheet'

import { AuthButton } from './auth-button'
import { UserAvatar } from './user-avatar'
import { Button } from './button'

export const HeaderMenu = () => {
  return (
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
          <SheetClose asChild>
            <Link
              href="/"
              className="flex w-full items-center justify-start gap-2"
            >
              <HomeIcon size={16} />
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/offers"
              className="flex w-full items-center justify-start gap-2"
            >
              <PercentIcon size={16} />
              Ofertas
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/catalog"
              className="flex w-full items-center justify-start gap-2"
            >
              <ListOrderedIcon size={16} />
              Catálogo
            </Link>
          </SheetClose>
          <AuthButton />
        </div>
      </SheetContent>
    </Sheet>
  )
}
