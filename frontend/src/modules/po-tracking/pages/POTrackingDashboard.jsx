import PortalTabNav from '../components/PortalTab/PortalTabNav.jsx'
import SummaryCards from '../components/Dashboard/SummaryCards.jsx'
import OverallOverdueTable from '../components/Dashboard/OverallOverdueTable.jsx'
import usePOSummary from '../hooks/usePOSummary.js'

export default function POTrackingDashboard() {
  const { summary, loading, error, reload } = usePOSummary()

  return (
    <div className="container">
      <h1>Dyazo PO Tracker</h1>
      <PortalTabNav />

      {loading && <p>Loading summary...</p>}
      {error && <p style={{ color: 'red' }}>Failed to load summary: {error.message}</p>}

      {summary && (
        <>
          <SummaryCards summary={summary} />
          <OverallOverdueTable overdueList={summary.overallOverdue} />
        </>
      )}

      <button onClick={reload} style={{ marginTop: 16 }}>Refresh</button>
    </div>
  )
}
