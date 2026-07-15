import { NavLink } from 'react-router-dom'

const PORTALS = ['amazon', 'flipkart', 'blinkit', 'zepto']

export default function PortalTabNav() {
  return (
    <div className="tabs">
      <NavLink
        to="/po-tracking"
        end
        className={({ isActive }) => `tab-link ${isActive ? 'active' : ''}`}
      >
        Dashboard
      </NavLink>
      {PORTALS.map((p) => (
        <NavLink
          key={p}
          to={`/po-tracking/${p}`}
          className={({ isActive }) => `tab-link ${isActive ? 'active' : ''}`}
        >
          {p}
        </NavLink>
      ))}
    </div>
  )
}
