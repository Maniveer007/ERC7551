const express = require("express");
const router = express.Router();
const transactionController = require("../Controller/TransactionController");

//for account
router.get("/", transactionController.getAllAddress);
router.post("/", transactionController.createAccount);


module.exports = router;
