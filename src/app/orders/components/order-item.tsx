import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { Prisma } from '@prisma/client'
import { OrderProductItem } from './order-product-item'
import { Separator } from '@/components/ui/separator'
import { useMemo } from 'react'
import { computeProductTotalPrice } from '@/helpers/product'
import { getOrderStatus } from '../helpers/status'

interface IOrderItem {
  order: Prisma.OrderGetPayload<{
    include: {
      order_product: {
        include: {
          product: true
        }
      }
    }
  }>
}

export const OrderItem = ({ order }: IOrderItem) => {
  const formatted_order_date = format(
    order.created_at,
    "dd/MM/yyyy 'às' HH:mm",
    {
      locale: ptBR,
    },
  )
  const formatted_date = format(order.created_at, 'dd/MM/yyyy', {
    locale: ptBR,
  })
  const subtotal = useMemo(() => {
    return order.order_product.reduce((acc, order_product) => {
      return (
        acc + Number(order_product.product.base_price) * order_product.quantity
      )
    }, 0)
  }, [order.order_product])
  const total = useMemo(() => {
    return order.order_product.reduce((acc, order_product) => {
      const { total_price } = computeProductTotalPrice({
        product: order_product.product,
      })
      return acc + total_price * order_product.quantity
    }, 0)
  }, [order.order_product])
  const total_discount = subtotal - total
  const payment_status = getOrderStatus(order.status)

  return (
    <Card className="w-full p-5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              <p className="font-bold uppercase">
                Pedidos com {order.order_product.length} produto(s)
              </p>
              <p className="text-xs opacity-60">
                Feito em {formatted_order_date}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1 text-center">
                  <p className="text-xs font-bold text-gray-300">Status</p>
                  <span className="font-bold text-primary">
                    {payment_status}
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <p className="text-xs font-bold text-gray-300">Data</p>
                  <span className="font-bold opacity-60">{formatted_date}</span>
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <p className="text-xs font-bold text-gray-300">Pagamento</p>
                  <span className="font-bold opacity-60">CARTÃO</span>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {order.order_product.map((order_product) => {
                  return (
                    <OrderProductItem
                      key={order_product.id}
                      order_product={order_product}
                    />
                  )
                })}
              </div>

              <div className="flex flex-col gap-1">
                <Separator />
                <div className="flex w-full justify-between py-2">
                  <p className="text-xs">Subtotal</p>
                  <p className="text-xs">R$ {subtotal.toFixed(2)}</p>
                </div>
                <Separator />
                <div className="flex w-full justify-between py-2">
                  <p className="text-xs">Entrega</p>
                  <p className="text-xs uppercase">Grátis</p>
                </div>
                <Separator />
                <div className="flex w-full justify-between py-2">
                  <p className="text-xs">Descontos</p>
                  <p className="text-xs">R$ -{total_discount.toFixed(2)}</p>
                </div>
                <Separator />
                <div className="flex w-full justify-between py-2">
                  <p className="text-base font-bold">Total</p>
                  <p className="text-base font-bold text-primary">
                    R$ {total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}
