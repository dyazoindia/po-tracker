import mongoose from 'mongoose'

const historySchema = new mongoose.Schema({
  field: String,
  oldValue: mongoose.Schema.Types.Mixed,
  newValue: mongoose.Schema.Types.Mixed,
  changedBy: String,
  changedAt: { type: Date, default: Date.now },
}, { _id: false })

const poSchema = new mongoose.Schema({
  poId: { type: String, required: true, unique: true },
  portal: { type: String, required: true, enum: ['amazon', 'flipkart', 'blinkit', 'zepto'] },
  qtyOrdered: { type: Number, required: true },
  qtySent: { type: Number, default: 0 },
  qtyPending: { type: Number, default: function () { return this.qtyOrdered } },
  appointmentStatus: { type: String, enum: ['scheduled', 'not_scheduled'], default: 'not_scheduled' },
  appointmentDate: { type: Date, required: true },
  status: { type: String, enum: ['not_started', 'partial', 'fulfilled', 'overdue'], default: 'not_started' },
  fulfilTick: { type: Boolean, default: false },
  assignedTo: String,
  remarks: String,
  lastUpdatedBy: String,
  history: [historySchema],
}, { timestamps: true })

poSchema.index({ portal: 1, status: 1 })
poSchema.index({ appointmentDate: 1 })

// Recalculate derived fields before saving
poSchema.pre('save', function (next) {
  this.qtyPending = this.qtyOrdered - this.qtySent

  if (this.qtyPending <= 0) {
    this.status = 'fulfilled'
    this.fulfilTick = true
  } else if (this.qtySent > 0) {
    this.status = 'partial'
  } else if (new Date() > this.appointmentDate) {
    this.status = 'overdue'
  } else {
    this.status = 'not_started'
  }

  next()
})

export default mongoose.model('PO', poSchema)
