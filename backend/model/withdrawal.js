const mongoose = require("mongoose");

const withdrawalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentDetails: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Withdrawal", withdrawalSchema);
