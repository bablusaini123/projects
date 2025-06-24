const mongoose = require('mongoose');

const InfluencerSchema = new mongoose.Schema({
  name: { type: String  },
  profileImage:{type:String},
  facebook: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  reddit: { type: String },
  telegramHandle: { type: String },
  telegramChannel: { type: String },
  linkedIn: { type: String },
  discord: { type: String },
  whatsapp: { type: String },
  youtube: { type: String },
  createdAt: { type: Date},
  slug:{type:String}
});

// 👇 Explicitly setting collection name to 'influencer'
module.exports = mongoose.model('Influencer', InfluencerSchema, 'influencer');
