import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { PackageCheck } from 'lucide-react'

import { authOptions } from '@/lib/auth-options'
import { Badge } from '@/components/ui/badge'
import { prisma } from '@/lib/prisma'
import { OrderItem } from './components/order-item'

const Orders = async () => {
  const data = await getServerSession(authOptions)
  const user = data?.user

  if (!user) {
    return redirect('/not-found')
  }

  const orders = await prisma.order.findMany({
    where: {
      user_id: (user as any).id,
    },
    include: {
      order_product: {
        include: {
          product: true,
        },
      },
    },
  })

  if (orders.length === 0) {
    return (
      <div className="mt-8 flex flex-col px-8">
        <Badge
          className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem]"
          variant="outline"
        >
          <PackageCheck size={16} />
          <h1 className="text-base uppercase">Meus Pedidos</h1>
        </Badge>

        <p className="mt-4 text-center text-lg">
          Você não tem nenhum pedido no momento
        </p>
      </div>
    )
  }

  return (
    <div className="mt-5 flex flex-col px-8 pb-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem]"
        variant="outline"
      >
        <PackageCheck size={16} />
        <h1 className="text-base uppercase">Meus Pedidos</h1>
      </Badge>

      <div className="mt-5 flex flex-col gap-5">
        {orders.map((order) => {
          return <OrderItem key={order.id} order={order} />
        })}
      </div>
    </div>
  )
}

export default Orders
