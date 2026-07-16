import Topbar from '../components/Layout/Topbar.jsx'
import SummaryCards from '../components/Dashboard/SummaryCards.jsx'
import OverallOverdueTable from '../components/Dashboard/OverallOverdueTable.jsx'
import usePOSummary from '../hooks/usePOSummary.js'

export default function POTrackingDashboard() {
  const { summary, loading, error, reload } = usePOSummary()

  return (
    <>
      <Topbar title="Admin Dashboard" />
      <div className="page-content">
        {loading && <p>Loading summary...</p>}
        {error && <p style={{ color: 'red' }}>Failed to load summary: {error.message}</p>}

        {summary && (
          <>
            <SummaryCards summary={summary} />
            <OverallOverdueTable overdueList={summary.overallOverdue} />
          </>
        )}

        <button className="btn" style={{ marginTop: 16 }} onClick={reload}>Refresh</button>
      </div>
    </>
  )
}
