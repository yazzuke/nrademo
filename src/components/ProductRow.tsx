import type { LeftProduct } from '../types'

interface Props {
  product: LeftProduct
  variant?: 'default' | 'two-top' | 'description' | 'dark-spot'
  tanzaniaText?: string
}

export function ProductRow({ product, variant = 'default', tanzaniaText }: Props) {
  const titleContent = (
    <>
      {product.name.toUpperCase()}
      {product.tags !== null && (
        <> <img src="/left-assets/vegan.svg" alt="vegan" style={{ width: 20, verticalAlign: 'middle' }} /></>
      )}
    </>
  )

  if (variant === 'dark-spot') {
    return (
      <div className="left-page info-content-container dark-spot">
        <div className="top-content-dark-spot">
          <div className="info-title"><h4 className="info-title-dark-spot">{titleContent}</h4></div>
          <div className="info-size"><p className="info-size-dark-spot">{product.size}</p></div>
          <div className="info-calories"><p className="second-type-size calories-dark-spot">{product.calories} {product.units}</p></div>
          <div className="info-price"><p className="third-type-size price-dark-spot">{product.price.toFixed(2)}</p></div>
        </div>
        <div className="description-dark-spot">
          {tanzaniaText && (
            <div className="container-tanzania-letter-dark-spot">
              <p className="tanzania-letter-dark-spot">{tanzaniaText}</p>
            </div>
          )}
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
          <div className="info-calories"><p className="second-type-size">{product.calories} {product.units}</p></div>
          <div className="info-price"><p className="third-type-size">{product.price.toFixed(2)}</p></div>
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
        <div className="info-title two-spaces"><h4 className="a">{titleContent}</h4></div>
        <div className="info-size"><p className="a">{product.size}</p></div>
        <div className="info-calories"><p className="second-type-size">{product.calories} {product.units}</p></div>
        <div className="info-price"><p className="third-type-size">{product.price.toFixed(2)}</p></div>
      </div>
    )
  }

  return (
    <div className="info-content-container">
      <div className="info-title"><h4 className="a">{titleContent}</h4></div>
      <div className="info-size"><p className="a">{product.size}</p></div>
      <div className="info-calories"><p className="second-type-size">{product.calories} {product.units}</p></div>
      <div className="info-price"><p className="third-type-size">{product.price.toFixed(2)}</p></div>
    </div>
  )
}
