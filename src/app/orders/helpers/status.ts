import { OrderStatus } from '@prisma/client'

export const getOrderStatus = (orer_status: OrderStatus) => {
  return {
    [OrderStatus.PAYMENT_CONFIRMED]: 'PAGO',
    [OrderStatus.WAITING_FOR_PAYMENT]: 'PENDENTE',
  }[orer_status]
}
