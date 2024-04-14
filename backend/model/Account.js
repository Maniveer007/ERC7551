// models/Transaction.js

const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
//   method: {
//     type: String,
//     required: true,
//   },
  source: {
    // name: {
    //   type: String,
    //   required: true,
    // },
    // address: {
      type: String,
      required: true,
    // },
  },
  destination: {
    // name: {
    //   type: String,
    //   required: true,
    // },
    // address: {
      type: String,
      required: true,
    // },
  },
  tokenAddress:{
    type: String,
    required: true,
  },
  tokenId:{
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
