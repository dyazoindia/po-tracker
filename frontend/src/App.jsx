import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import POTrackingDashboard from './modules/po-tracking/pages/POTrackingDashboard.jsx'
import PortalPage from './modules/po-tracking/pages/PortalPage.jsx'
import TVDashboard from './modules/po-tracking/components/TVView/TVDashboard.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/po-tracking" replace />} />
        <Route path="/po-tracking" element={<POTrackingDashboard />} />
        <Route path="/po-tracking/tv-view" element={<TVDashboard />} />
        <Route path="/po-tracking/:portal" element={<PortalPage />} />
      </Routes>
    </BrowserRouter>
  )
}
