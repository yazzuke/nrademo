import { useRef } from 'react'
import { useToastOrders } from '../hooks/useToastOrders'
import '../order.css'

const MAX_ROWS = 4

function fmt(n: number) {
  return `$${n.toFixed(2)}`
}

export function OrderPage() {
  const { displayOrder } = useToastOrders()
  const hasShownRef = useRef(false)

  const visible = displayOrder !== null
  if (visible) hasShownRef.current = true

  // Don't apply fade-out on initial load (card starts invisible from CSS)
  const cardClass = !hasShownRef.current ? '' : visible ? 'fade-in' : 'fade-out'

  const emptyRow = { name: '', quantity: '', each: '', total: '' }

  const rows = displayOrder
    ? [
        ...displayOrder.items.slice(0, MAX_ROWS).map(item => ({
          name: item.name,
          quantity: item.quantity % 1 === 0 ? String(item.quantity | 0) : String(item.quantity),
          each: fmt(item.price),
          total: fmt(item.quantity * item.price),
        })),
        ...Array(Math.max(0, MAX_ROWS - displayOrder.items.length)).fill(emptyRow),
      ]
    : Array(MAX_ROWS).fill(emptyRow)

  return (
    <div className="order-page">
      <video
        className={`video-layer${visible ? ' hidden' : ''}`}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/assets/coffe.mp4" type="video/mp4" />
      </video>

      <div className={`body-container ${cardClass}`}>
      <div className="top-container">
        <div className="top-container-background-blur">
          <div className="orden-confirmation-title">
            <h2 className="confirmation-title">YOUR ORDER</h2>
          </div>
          <div className="orden-confirmation-title-below">
            <h1 className="confirmation-title-below">Confirmation</h1>
          </div>
        </div>
      </div>

      <div className="middle-container">
        <div className="table-container">
          <div className="row title-row">
            <div className="col title-1"><h3 className="tittle-rows">Name</h3></div>
            <div className="col title-2"><h3 className="tittle-rows">Qty</h3></div>
            <div className="col title-3"><h3 className="tittle-rows">Each</h3></div>
            <div className="col title-4"><h3 className="tittle-rows">Total</h3></div>
          </div>

          <div className="container-rows">
            {rows.map((item, i) => (
              <div className="row" key={i}>
                <div className="col item-1"><h4 className="text-rows">{item.name}</h4></div>
                <div className="col item-2"><h4 className="text-rows">{item.quantity}</h4></div>
                <div className="col item-3"><h4 className="text-rows">{item.each}</h4></div>
                <div className="col item-4"><h4 className="text-rows">{item.total}</h4></div>
              </div>
            ))}
          </div>

          <div className="div-sep" />

          <div className="row total-row">
            <div className="col total-title">
              <h4 className="text-rows-total-title">TOTAL</h4>
            </div>
            <div className="col total-price">
              <h4 className="text-rows-total-price">
                {displayOrder ? fmt(displayOrder.totalAmount) : ''}
              </h4>
            </div>
          </div>
        </div>

        <div className="drive-forward">
          <img src="/order-assets/drive-forward.png" alt="" className="drive" />
        </div>
      </div>
      </div>
    </div>
  )
}
