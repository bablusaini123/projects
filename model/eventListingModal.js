
const mongoose = require('mongoose');

const eventListingSchema = new mongoose.Schema({
  title: String,
  bannerImage:String,
  country: String,
  location: String,
  startDate: Date,
  endDate: Date,
  eventType: String,
  category: [String],
  website: String,
  entryType:String,
  price:{
    basicPrice:String,
    standradPrice:String,
    premiumPrice:String,
    vipPrice:String,
  },
  description: String,
  speakers: [],
  partners: [],
  sponsors: [],
  slug:String,
  authorName:String,
  authorEmail:String,
  authorWhatsapp:String,
  authorTwitter:String,
  altText: { type: String, default: '' },  // ye update karna hai
}, { timestamps: true });

module.exports = mongoose.model('eventListing', eventListingSchema);
