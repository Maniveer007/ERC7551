
const mongoose = require("mongoose");

const nodeSchema = new mongoose.Schema({
  socketId: {
    type: String,
    required: true,
  },
  nodeIndex:{
    type: Number,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Node = mongoose.model("Node", nodeSchema);

module.exports = Node;
