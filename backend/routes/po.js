import express from 'express'
import PO from '../models/PO.js'

const router = express.Router()
const PORTALS = ['amazon', 'flipkart', 'blinkit', 'zepto']

// Create new PO
router.post('/', async (req, res) => {
  try {
    const { poId, portal, sku, productName, qtyOrdered, appointmentDate, appointmentSlot, assignedTo } = req.body
    if (!poId || !portal || !sku || !qtyOrdered || !appointmentDate) {
      return res.status(400).json({ error: 'poId, portal, sku, qtyOrdered, appointmentDate are required' })
    }
    const po = new PO({ poId, portal, sku, productName, qtyOrdered, appointmentDate, appointmentSlot, assignedTo })
    await po.save()
    res.status(201).json(po)
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: `PO ID ${req.body.poId} already exists` })
    res.status(500).json({ error: err.message })
  }
})

// List all POs (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { portal, status, overdue } = req.query
    const query = {}
    if (portal) query.portal = portal
    if (status) query.status = status
    if (overdue === 'true') query.status = 'overdue'
    const pos = await PO.find(query).sort({ appointmentDate: 1 })
    res.json(pos)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Dashboard summary across all portals
router.get('/summary', async (req, res) => {
  try {
    const result = {}
    for (const portal of PORTALS) {
      const pos = await PO.find({ portal })
      result[portal] = {
        totalPOs: pos.length,
        qtyOrdered: pos.reduce((sum, p) => sum + p.qtyOrdered, 0),
        qtySent: pos.reduce((sum, p) => sum + p.qtySent, 0),
        qtyPending: pos.reduce((sum, p) => sum + p.qtyPending, 0),
        overdueCount: pos.filter((p) => p.status === 'overdue').length,
      }
    }
    const overallOverdue = await PO.find({ status: 'overdue' })
      .sort({ appointmentDate: 1 })
      .limit(50)
      .select('poId portal sku appointmentDate qtyPending')

    result.overallOverdue = overallOverdue
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Lightweight TV/warehouse-screen view
router.get('/tv-view', async (req, res) => {
  try {
    const counts = {}
    for (const portal of PORTALS) {
      const pos = await PO.find({ portal })
      counts[portal] = {
        qtyPending: pos.reduce((sum, p) => sum + p.qtyPending, 0),
        overdueCount: pos.filter((p) => p.status === 'overdue').length,
      }
    }
    const overdueList = await PO.find({ status: 'overdue' })
      .sort({ appointmentDate: 1 })
      .limit(20)
      .select('poId portal sku appointmentDate qtyPending')

    res.json({ counts, overdueList })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Portal-wise PO list
router.get('/portal/:portalName', async (req, res) => {
  try {
    const { portalName } = req.params
    const { status, sort } = req.query
    const query = { portal: portalName }
    if (status && status !== 'all') query.status = status
    const sortField = sort || 'appointmentDate'
    const pos = await PO.find(query).sort({ [sortField]: 1 })
    res.json(pos)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Single PO detail
router.get('/:poId', async (req, res) => {
  try {
    const po = await PO.findOne({ poId: req.params.poId })
    if (!po) return res.status(404).json({ error: 'PO not found' })
    res.json(po)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update PO (qtySent, remarks, fulfilTick, assignedTo)
router.patch('/:poId', async (req, res) => {
  try {
    const po = await PO.findOne({ poId: req.params.poId })
    if (!po) return res.status(404).json({ error: 'PO not found' })

    const editableFields = ['qtySent', 'remarks', 'assignedTo', 'appointmentDate', 'appointmentSlot']
    const changedBy = req.body.updatedBy || 'unknown'

    for (const field of editableFields) {
      if (req.body[field] !== undefined && req.body[field] !== po[field]) {
        po.history.push({
          field,
          oldValue: po[field],
          newValue: req.body[field],
          changedBy,
        })
        po[field] = req.body[field]
      }
    }

    po.lastUpdatedBy = changedBy
    await po.save() // triggers pre-save recalculation of status/qtyPending
    res.json(po)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Soft delete (admin only - enforce role check in real auth middleware)
router.delete('/:poId', async (req, res) => {
  try {
    const po = await PO.findOneAndDelete({ poId: req.params.poId })
    if (!po) return res.status(404).json({ error: 'PO not found' })
    res.json({ message: 'Deleted', poId: req.params.poId })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
