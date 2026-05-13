import { useLeftData } from '../hooks/useLeftData'
import { ProductRow } from '../components/ProductRow'
import '../left.css'

export function LeftPage() {
  const { data, error } = useLeftData()

  if (error) return <p style={{ color: 'red', padding: '1rem' }}>Error: {error}</p>
  if (!data) return null

  const p = data.products
  const t = data.texts

  return (
    <div className="left-page container-body">

      {/* TOP SECTION */}
      <div className="container-top-content">
        <div className="title-section">
          <h1 className="a">{t[0]}</h1>
        </div>
        <div className="separator-line top-line" />
        <div className="content-top-container">
          {/* Left column: items 0-5 */}
          <div className="left-content-column">
            <ProductRow product={p[0]} />
            <ProductRow product={p[1]} />
            <ProductRow product={p[2]} />
            <ProductRow product={p[3]} />
            <ProductRow product={p[4]} />
            <ProductRow product={p[5]} variant="description" />
          </div>
          {/* Right column: items 6-11 */}
          <div className="right-content-column">
            <ProductRow product={p[6]} />
            <ProductRow product={p[7]} />
            <ProductRow product={p[8]} variant="two-top" />
            <ProductRow product={p[9]} />
            <ProductRow product={p[10]} />
            <ProductRow product={p[11]} variant="dark-spot" tanzaniaText={t[1]} />
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="container-middle-content">
        <div className="title-section"><h1 className="a">{t[2]}</h1></div>
        <div className="separator-line bottom-line" />
        <div className="content-middle-container">
          <div className="left-content-column">
            <div className="info-content-container description">
              <div className="info-content-container-top">
                <div className="info-title"><h4 className="a">{p[12]?.name.toUpperCase()}</h4></div>
                <div className="info-size"><p className="a">{p[12]?.size}</p></div>
                {(p[12]?.calories ?? 0) > 0 && <div className="info-calories"><p className="second-type-size">{p[12]?.calories} {p[12]?.units}</p></div>}
                <div className="info-price"><p className="third-type-size">{(p[12]?.price ?? 0).toFixed(2)}</p></div>
              </div>
              <div className="info-description middle">
                <p className="description-content">{p[12]?.description}</p>
              </div>
            </div>
            <div className="info-content-container description">
              <div className="info-content-container-top">
                <div className="info-title"><h4 className="a">{p[13]?.name.toUpperCase()}</h4></div>
                <div className="info-size"><p className="a">{p[13]?.size}</p></div>
                {(p[13]?.calories ?? 0) > 0 && <div className="info-calories"><p className="second-type-size">{p[13]?.calories} {p[13]?.units}</p></div>}
                <div className="info-price"><p className="third-type-size">{(p[13]?.price ?? 0).toFixed(2)}</p></div>
              </div>
              <div className="info-description middle">
                <p className="description-content">{p[13]?.description}</p>
              </div>
            </div>
          </div>
          <div className="right-content-column">
            <div className="info-content-container description">
              <div className="info-content-container-top">
                <div className="info-title"><h4 className="a">{p[14]?.name.toUpperCase()}</h4></div>
                <div className="info-size"><p className="a">{p[14]?.size}</p></div>
                {(p[14]?.calories ?? 0) > 0 && <div className="info-calories"><p className="second-type-size">{p[14]?.calories} {p[14]?.units}</p></div>}
                <div className="info-price"><p className="third-type-size">{(p[14]?.price ?? 0).toFixed(2)}</p></div>
              </div>
              <div className="info-description middle">
                <p className="description-content">{p[14]?.description}</p>
              </div>
            </div>
            <div className="info-content-container description">
              <div className="info-content-container-top">
                <div className="info-title"><h4 className="a">{p[15]?.name.toUpperCase()}</h4></div>
                <div className="info-size"><p className="a">{p[15]?.size}</p></div>
                {(p[15]?.calories ?? 0) > 0 && <div className="info-calories"><p className="second-type-size">{p[15]?.calories} {p[15]?.units}</p></div>}
                <div className="info-price"><p className="third-type-size">{(p[15]?.price ?? 0).toFixed(2)}</p></div>
              </div>
              <div className="info-description middle">
                <p className="description-content">{p[15]?.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="section2-title"><h3 className="a">{t[3]}</h3></div>
        <div className="separator-line bottom2-line" />
        <div className="content-container">
          <div className="content-left-column">
            <div className="content-info-container">
              <div className="seasonal-title-row">
                <h4 className="info-title-letter">{t[4]}</h4>
                {t[10] && <p className="third-type-size seasonal-price">{t[10]}</p>}
              </div>
              <div className="info-description-container"><p className="info-description-letter">{t[5]}</p></div>
            </div>
          </div>
          <div className="content-right-column">
            <div className="content-info-container">
              <div className="seasonal-title-row">
                <h4 className="info-title-letter">{t[6]}</h4>
                {t[11] && <p className="third-type-size seasonal-price">{t[11]}</p>}
              </div>
              <div className="info-description-container"><p className="info-description-letter">{t[7]}</p></div>
            </div>
          </div>
        </div>
        <div className="separator-line" />
      </div>

      {/* COLD BAR SECTION */}
      <div className="content-container-below">
        <div className="section2-title-below"><h2 className="a">{t[8]}</h2></div>
        <div className="section-separator-below" />
        <div className="content-container-below2">
          {[16, 17, 18].map((i, col) => (
            <div key={i} className={`content-column${col + 1}-below`}>
              <div className={`image-icon ${['one', 'two', 'three'][col]}`} />
              <div className="content-title">
                <h4 className="cold-bar-letter-tittle">{p[i]?.name.toUpperCase()}</h4>
              </div>
              <div className="content-description">
                <p className="cold-bar-letter-description">{p[i]?.description}</p>
              </div>
              <div className="content-info-container-below">
                <div className="column--size"><p className="a">{p[i]?.size}</p></div>
                {(p[i]?.calories ?? 0) > 0 && <div className="column--calories"><p className="second-type-size">{p[i]?.calories} {p[i]?.units}</p></div>}
                <div className="column--price"><p className="third-type-size">{(p[i]?.price ?? 0).toFixed(2)}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="advancement">
        <p className="advancement-below">{t[9]}</p>
      </div>
    </div>
  )
}
