import type { LeftProduct } from '../types'

interface Props {
  product: LeftProduct
  variant?: 'default' | 'two-top' | 'description' | 'dark-spot'
  tanzaniaText?: string
}

export function ProductRow({ product, variant = 'default', tanzaniaText }: Props) {
  const outOfStock = product.inStock === false

  const titleContent = (
    <span style={outOfStock ? { textDecoration: 'line-through', opacity: 0.5 } : undefined}>
      {product.name.toUpperCase()}
      {product.tags !== null && (
        <> <img src="/left-assets/vegan.svg" alt="vegan" style={{ width: 20, verticalAlign: 'middle' }} /></>
      )}
    </span>
  )

  const soldoutBadge = outOfStock
    ? <img src="/assets/soldout.png" alt="Sold Out" style={{ height: 60, flexShrink: 0, alignSelf: 'center' }} />
    : null

  if (variant === 'dark-spot') {
    return (
      <div className="left-page info-content-container dark-spot">
        <div className="top-content-dark-spot">
          <div className="info-title"><p className="tanzania-letter-dark-spot">{tanzaniaText}</p></div>
          <div className="info-size"><p className="info-size-dark-spot">{product.size}</p></div>
          {product.calories > 0 && <div className="info-calories"><p className="second-type-size calories-dark-spot">{product.calories} {product.units}</p></div>}
          <div className="info-price"><p className="third-type-size price-dark-spot">{'$' + (product.price ?? 0).toFixed(2)}</p></div>
        </div>
        <div className="description-dark-spot">
          <div className="container-description-content-dark-spot">
            <p className="description-content-dark-spot">{product.description}</p>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'description') {
    return (
      <div className="info-content-container description">
        <div className="info-content-container-top">
          <div className="info-title"><h4 className="a">{titleContent}</h4></div>
          <div className="info-size"><p className="a">{product.size}</p></div>
          {product.calories > 0 && <div className="info-calories"><p className="second-type-size">{product.calories} {product.units}</p></div>}
          <div className="info-price"><p className="third-type-size">{'$' + (product.price ?? 0).toFixed(2)}</p></div>
        </div>
        <div className="info-description">
          <p className="description-content">{product.description}</p>
        </div>
      </div>
    )
  }

  if (variant === 'two-top') {
    return (
      <div className="info-content-container two-top">
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
          <div className="info-title two-spaces" style={{ flex: 'none' }}><h4 className="a">{titleContent}</h4></div>
          {soldoutBadge}
        </div>
        <div className="info-size"><p className="a">{product.size}</p></div>
        {product.calories > 0 && <div className="info-calories"><p className="second-type-size">{product.calories} {product.units}</p></div>}
        <div className="info-price"><p className="third-type-size">{'$' + (product.price ?? 0).toFixed(2)}</p></div>
      </div>
    )
  }

  return (
    <div className="info-content-container">
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
        <div className="info-title" style={{ flex: 'none' }}><h4 className="a">{titleContent}</h4></div>
        {soldoutBadge}
      </div>
      <div className="info-size"><p className="a">{product.size}</p></div>
      {product.calories > 0 && <div className="info-calories"><p className="second-type-size">{product.calories} {product.units}</p></div>}
      <div className="info-price"><p className="third-type-size">{'$' + (product.price ?? 0).toFixed(2)}</p></div>
    </div>
  )
}
