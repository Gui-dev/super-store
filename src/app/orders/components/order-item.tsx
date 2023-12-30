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

interface IOrderItem {
  order: Prisma.OrderGetPayload<{
    include: {
      order_product: true
    }
  }>
}

export const OrderItem = ({ order }: IOrderItem) => {
  const formatted_date = format(order.created_at, 'dd/MM/yyyy', {
    locale: ptBR,
  })

  return (
    <Card className="mt-8 w-full p-5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              <p>Pedidos com {order.order_product.length} produto(s)</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1 text-center">
                  <p className="text-xs font-bold text-gray-300">Status</p>
                  <span className="font-bold text-primary">PAGO</span>
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
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}
