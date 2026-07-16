import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/po-tracking', label: '📊 Dashboard', end: true },
  { to: '/po-tracking/amazon', label: '🟠 Amazon' },
  { to: '/po-tracking/flipkart', label: '🔵 Flipkart' },
  { to: '/po-tracking/blinkit', label: '🟡 Blinkit' },
  { to: '/po-tracking/zepto', label: '🟣 Zepto' },
  { to: '/po-tracking/tv-view', label: '📺 TV / Warehouse View' },
]

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h1>Dyazo PO Tracker</h1>
        <p>Purchase Order Tracking</p>
      </div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
