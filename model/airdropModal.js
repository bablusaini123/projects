const mongoose = require('mongoose');

const AirdropSchema = new mongoose.Schema({
  tokenName: { type: String, required: true },
  tokenImage: { type: String, required: true },           // URL or file path
  bannerImage: { type: String, required: true },          // URL or file path
  tokenSymbol: { type: String },
  country: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  winningDate: { type: Date },
  cryptocurrencyType: { type: String },
  tokenQuantity: { type: Number },
  airdropQuantity: { type: Number },
  noOfWinners: { type: Number },
  projectWebsite: { type: String },
  email: { type: String },
  partnershipWithUs: { type: String },
  projectDescription: { type: String },
  taskDetails: { type: String },
  projectBasedOn: { type: String },
  taskList: { type: String },
  facebook: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  reddit: { type: String },
  mediumUrl: { type: String },
  telegram: { type: String },
  authorName: { type: String },
  authorEmail: { type: String },
  authorWhatsapp: { type: String },
  authorTwitter: { type: String },
  slug: { type: String },
  tokenImageAlt: { type: String, default: '' },    // alt text for token image
  bannerImageAlt: { type: String, default: '' },   // alt text for banner image
}, { timestamps: true });

module.exports = mongoose.model('Airdrop', AirdropSchema);
