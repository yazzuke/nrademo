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
          imageUrl={`/assets/img-${i + 2}.png`}
          title={product.name.toUpperCase()}
          price={product.price}
          inStock={product.inStock}
        />
      ))}
    </div>
  )
}
