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
          imageUrl={`/assets/img-${i + 5}.png`}
          title={product.name.toUpperCase()}
          price={product.price}
          inStock={product.inStock}
        />
      ))}
    </div>
  )
}
