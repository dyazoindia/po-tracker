import { useState, useRef } from 'react'
import Topbar from '../components/Layout/Topbar.jsx'
import { bulkUploadPOs } from '../api/poApi.js'

export default function UploadData() {
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  const handleFile = (f) => {
    if (!f) return
    setFile(f)
    setResult(null)
    setError(null)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files?.[0])
  }

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setError(null)
    setResult(null)
    try {
      const res = await bulkUploadPOs(file)
      setResult(res)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <Topbar title="Upload Data" />
      <div className="page-content">
        <div className="info-banner">
          Upload an Excel (.xlsx) file with PO data. Required columns: <b>PO ID, Portal, Qty, Appointment Date</b>.
          Optional: <b>Appointment Status</b> (Scheduled / Not Scheduled), Assigned To.
          Portal must be one of: amazon, flipkart, blinkit, zepto.
          If a PO ID already exists, it will be updated instead of duplicated.
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragOver ? '#4f46e5' : '#d1d5db'}`,
            background: dragOver ? '#eef2ff' : '#fff',
            borderRadius: 12,
            padding: 48,
            textAlign: 'center',
            cursor: 'pointer',
            marginBottom: 20,
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.xls"
            style={{ display: 'none' }}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div style={{ fontSize: 32, marginBottom: 8 }}>📤</div>
          {file ? (
            <p style={{ fontWeight: 600 }}>{file.name}</p>
          ) : (
            <>
              <p style={{ fontWeight: 600, margin: 0 }}>Click to browse or drag & drop your Excel file here</p>
              <p style={{ color: '#9ca3af', fontSize: 13, marginTop: 6 }}>.xlsx or .xls only</p>
            </>
          )}
        </div>

        <button
          className="btn btn-primary"
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload & Process'}
        </button>

        {error && (
          <div className="table-card" style={{ marginTop: 20, padding: 16, color: '#991b1b' }}>
            Upload failed: {error}
          </div>
        )}

        {result && (
          <div className="table-card" style={{ marginTop: 20, padding: 18 }}>
            <h3 style={{ marginTop: 0 }}>Upload Summary</h3>
            <div style={{ display: 'flex', gap: 24, marginBottom: 12 }}>
              <div><b style={{ color: '#16a34a' }}>{result.created}</b> created</div>
              <div><b style={{ color: '#2563eb' }}>{result.updated}</b> updated</div>
              <div><b style={{ color: '#dc2626' }}>{result.skipped}</b> skipped</div>
            </div>
            {result.errors?.length > 0 && (
              <>
                <p style={{ fontWeight: 600, marginBottom: 6 }}>Issues:</p>
                <ul style={{ color: '#991b1b', fontSize: 13, maxHeight: 200, overflowY: 'auto' }}>
                  {result.errors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}
