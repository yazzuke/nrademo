import { SquareCard } from './SquareCard'
import type { Product } from '../types'

interface Props {
  products: Product[]
}

export function MiddleCards({ products }: Props) {
  return (
    <div className="middle-content">
      {products.map((product, i) => (
        <SquareCard
          key={i}
          imageIndex={i + 2}
          title={product.name.toUpperCase()}
          variant="middle"
        />
      ))}
    </div>
  )
}
