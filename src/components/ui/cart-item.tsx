import { ICartProduct } from '@/providers/cart'

interface ICartItem {
  products: ICartProduct[]
}

export const CartItem = ({ products }: ICartItem) => {
  return (
    <div className="flex">
      {products.map((product) => {
        return (
          <div key={product.id} className="flex">
            <h1>{product.name}</h1>
          </div>
        )
      })}
    </div>
  )
}
