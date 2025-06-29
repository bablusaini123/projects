const mongoose = require('mongoose');

const paymentHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // 📦 Full course object snapshot (safe and audit-friendly)
  course: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    rating: { type: String, required: true },
    commisionPercent: { type: String, required: true }
  },

  // 💳 Payment information
  amountPaid: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'upi', 'card', 'wallet', 'netbanking'],
    default: 'razorpay'
  },
  paymentStatus: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    default: 'success'
  },
  transactionId: {
    type: String,
    required: true,
    unique: true
  },

  // 👥 Commission info
  level1Referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  level2Referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  commissionToLevel1: {
    type: String,
    default: 0
  },
  commissionToLevel2: {
    type: String,
    default: 0
  },

  // 🕒 Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PaymentHistory', paymentHistorySchema);
