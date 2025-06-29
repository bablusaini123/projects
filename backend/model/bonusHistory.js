const mongoose = require("mongoose");

const BonusHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bonusAmount: {
    type: Number,
    required: true,
  },
  bonusType: {
    type: String,
    required: true,
  },
 
},{timestamps:true});

module.exports = mongoose.model("BonusHistory", BonusHistorySchema);