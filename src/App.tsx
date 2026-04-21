import { Routes, Route } from 'react-router-dom'
import { MenuPage } from './pages/MenuPage'
import { OrderPage } from './pages/OrderPage'
import { LeftPage } from './pages/LeftPage'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/left" element={<LeftPage />} />
    </Routes>
  )
}
