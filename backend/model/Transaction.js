// models/Transaction.js

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  txHash: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
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
  status: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
