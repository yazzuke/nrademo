import { useMenuData } from '../hooks/useMenuData'
import { SquareCard } from '../components/SquareCard'
import '../styles.css'

export function MenuPage() {
  const { data, error } = useMenuData()

  if (error && !data) return <p style={{ color: 'red', padding: '1rem' }}>Error: {error}</p>
  if (!data) return null

  return (
    <div className="body-content">
      <div className="menu-header">
        <img src="/assets/toast-seal.png" alt="Toast" className="menu-toast-seal" />
        <h1 className="second-middle-content-title">{data.texts}</h1>
      </div>
      <div className="cards-wrapper">
        {data.products.slice(0, 9).map((product, i) => (
          <SquareCard
            key={product.guid ?? i}
            imageUrl={`/assets/img-${((i + 1) % 7) + 1}.png`}
            title={product.name.toUpperCase()}
            price={product.price}
            inStock={product.inStock}
          />
        ))}
      </div>
    </div>
  )
}
