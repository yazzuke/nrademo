interface Props {
  imageUrl?: string | null
  title: string
  price?: number
  inStock?: boolean
}

export function SquareCard({ imageUrl, title, price, inStock }: Props) {
  const outOfStock = inStock === false

  return (
    <div className="square-card">
      <div
        className="square-image-1"
        style={imageUrl
          ? { backgroundImage: `url('${imageUrl}')` }
          : { backgroundColor: '#e8e2d9' }
        }
      />
      <div className="square-title">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
          <h4 className="GT-Walsheim-Pro" style={outOfStock ? { textDecoration: 'line-through', opacity: 0.5 } : undefined}>
            {title}
          </h4>
          {price != null && price > 0 && (
            <span style={{ fontFamily: '"GT-Walsheim-Pro"', fontWeight: 700, fontSize: '24px' }}>
              ${price.toFixed(2)}
            </span>
          )}
          {outOfStock && (
            <img src="/assets/soldout.png" alt="Sold Out" style={{ height: 36, flexShrink: 0 }} />
          )}
        </div>
      </div>
    </div>
  )
}
