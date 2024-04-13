const express = require("express");
const router = express.Router();
const transactionController = require("../Controller/TransactionController");


router.get("/", transactionController.getAllTransactions);

router.get("/:id", transactionController.getTransactionById);

// router.get("/thresholdkey/:index", transactionController.getsharedkey);

router.post("/", transactionController.createTransaction);

router.put("/:id", transactionController.updateTransaction);

router.delete("/:id", transactionController.deleteTransaction);

//for account
router.get("/account", transactionController.getAllAddress);
router.post("/account", transactionController.createAccount);




module.exports = router;
