import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './modules/po-tracking/components/Layout/Sidebar.jsx'
import POTrackingDashboard from './modules/po-tracking/pages/POTrackingDashboard.jsx'
import PortalPage from './modules/po-tracking/pages/PortalPage.jsx'
import UploadData from './modules/po-tracking/pages/UploadData.jsx'
import TVDashboard from './modules/po-tracking/components/TVView/TVDashboard.jsx'

function Shell({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">{children}</div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/po-tracking" replace />} />
        <Route
          path="/po-tracking"
          element={
            <Shell>
              <POTrackingDashboard />
            </Shell>
          }
        />
        <Route path="/po-tracking/tv-view" element={<TVDashboard />} />
        <Route
          path="/po-tracking/upload"
          element={
            <Shell>
              <UploadData />
            </Shell>
          }
        />
        <Route
          path="/po-tracking/:portal"
          element={
            <Shell>
              <PortalPage />
            </Shell>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
