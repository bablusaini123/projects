const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  phoneNo: {
    type: String,
  },
  password: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active'
  },
  profileLevel: {
    type: Number,
    default: 1
  },
  referCode: {
    type: String,
    trim: true,
    default: null
  },
   joinCode: {
    type: String,
    default: null
  },
  accountActivationKey:{
    type:Boolean
  },
  userWallet:{
    type:Number,
     default: 0
  },
  bonusesReceived: {
  type: [Number], // Example: [1, 3]
  default: []
},
totalPurchaseAmount: {
  type: Number,
  default: 0
},
userCommisionPersent: {
  type: Number,
  default: 0
},
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
