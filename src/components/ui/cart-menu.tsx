import { ShoppingCartIcon } from 'lucide-react'

import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './sheet'
import { Button } from './button'
import { Cart } from './cart'
import { Badge } from './badge'

export const CartMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <ShoppingCartIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[350px]">
        <SheetHeader>
          <Badge
            className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem]"
            variant="outline"
          >
            <ShoppingCartIcon size={16} />
            <h1 className="text-base uppercase">Carrinho</h1>
          </Badge>
        </SheetHeader>
        <Cart />
      </SheetContent>
    </Sheet>
  )
}
