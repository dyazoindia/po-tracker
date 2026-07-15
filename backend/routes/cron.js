import express from 'express'
import PO from '../models/PO.js'
import { sendSlackAlert } from '../utils/slackAlert.js'

const router = express.Router()
const PORTALS = ['amazon', 'flipkart', 'blinkit', 'zepto']

// Tag overdue POs + alert on newly-overdue and due-soon ones
router.post('/check-overdue', async (req, res) => {
  try {
    const now = new Date()
    const soon = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000) // 2 days from now

    const pending = await PO.find({ status: { $in: ['not_started', 'partial'] } })

    let newlyOverdue = 0
    let dueSoon = 0

    for (const po of pending) {
      if (po.appointmentDate < now) {
        po.status = 'overdue'
        await po.save()
        newlyOverdue++
        await sendSlackAlert(`🔴 PO *${po.poId}* (${po.portal}) is now OVERDUE. Qty pending: ${po.qtyPending}`)
      } else if (po.appointmentDate <= soon) {
        dueSoon++
        await sendSlackAlert(`🟡 PO *${po.poId}* (${po.portal}) is due within 2 days. Qty pending: ${po.qtyPending}`)
      }
    }

    res.json({ checked: pending.length, newlyOverdue, dueSoon })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Daily summary digest
router.post('/daily-digest', async (req, res) => {
  try {
    let lines = ['*📊 Dyazo PO Daily Digest*']
    for (const portal of PORTALS) {
      const pos = await PO.find({ portal })
      const pending = pos.filter((p) => p.status !== 'fulfilled').length
      const overdue = pos.filter((p) => p.status === 'overdue').length
      lines.push(`*${portal.toUpperCase()}*: ${pending} pending, ${overdue} overdue`)
    }
    const message = lines.join('\n')
    await sendSlackAlert(message)
    res.json({ message: 'Digest sent' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
