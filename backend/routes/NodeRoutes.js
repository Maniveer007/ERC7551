const express = require("express");
const router = express.Router();
const nodeController = require("../Controller/ConnectedNode");

//for account
router.get("/", nodeController.getAllNode);
router.post("/", nodeController.createNode);
router.delete("/:socketId", nodeController.deleteNode);

module.exports = router;
