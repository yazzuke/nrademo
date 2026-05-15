import { SquareCard } from './SquareCard'
import type { Product } from '../types'

interface Props {
  products: Product[]
}

export function BottomCards({ products }: Props) {
  return (
    <div className="bottom-content">
      {products.map((product, i) => (
        <SquareCard
          key={i}
          imageIndex={i + 5}
          title={product.name.toUpperCase()}
          variant="bottom"
          price={product.price}
          inStock={product.inStock}
        />
      ))}
    </div>
  )
}
