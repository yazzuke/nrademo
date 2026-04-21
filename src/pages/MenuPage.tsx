import { useTemplateData } from '../hooks/useTemplateData'
import { TopSection } from '../components/TopSection'
import { MiddleCards } from '../components/MiddleCards'
import { BottomCards } from '../components/BottomCards'
import '../styles.css'

export function MenuPage() {
  const { data, error } = useTemplateData()

  if (error) return <p style={{ color: 'red', padding: '1rem' }}>Error: {error}</p>
  if (!data) return null

  const [hero, ...rest] = data.products
  const middleProducts = rest.slice(0, 3)
  const bottomProducts = rest.slice(3, 6)

  return (
    <div className="body-content">
      <TopSection name={hero.name} />
      <MiddleCards products={middleProducts} />
      <div className="second-middle-content">
        <h1 className="second-middle-content-title">{data.texts}</h1>
      </div>
      <BottomCards products={bottomProducts} />
    </div>
  )
}
