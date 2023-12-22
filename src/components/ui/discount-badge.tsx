import { ArrowDown } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { Badge, BadgeProps } from './badge'

interface IDiscountBadge extends BadgeProps {
  discount_percent: number
}

const DiscountBadge = ({ discount_percent, className, ...rest }: IDiscountBadge) => {
  return (
    <Badge className={twMerge('flex items-center px-2 py-[2px]', className)} {...rest}>
      <ArrowDown size={14} /> {discount_percent}%
    </Badge>
  )
}

export default DiscountBadge
