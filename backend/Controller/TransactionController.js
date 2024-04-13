// controllers/transactionController.js

const Transaction = require("../model/Transaction");
require("dotenv").config();

// GET all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET a single transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//get shared key

// const shamir = require('shamir-secret-sharing');

// function hexToUint8Array(hexString) {
//     return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
// }
// const createthresholdkey=async()=>{
//    const TOTAL_NODES=5;
//    const MIN_NODES=3;
   
   
//    const privateKeyBytes = hexToUint8Array(process.env.RELAYER_KEY);
//    // Split the private key into shares using Shamir's Secret Sharing
//    const shares =await shamir.split(privateKeyBytes, TOTAL_NODES, MIN_NODES);

//     return shares;
// }

// let thresholdkey;
//  createthresholdkey().then(val=>{
//   thresholdkey=val;
//  })
// // let inActiveNodes=[0,1,2,3,4];

// const getsharedkey=async(req,res)=>{
//   // console.log(inActiveNodes.includes(Number(req.params.index)));

//   try {
    
//     // if(inActiveNodes.includes(Number(req.params.index))){
//     // inActiveNodes=inActiveNodes.remove(Number(req.params.index));
//         res.status(201).json(thresholdkey[Number(req.params.index)]);
//     // }
//     // else{
//     // res.status(201).json({ error: "unable to enter if cond" });
//     // }
//   } catch (error) {
//     res.status(400).json({ error: "Invalid index" });
//   }
// }




// POST a new transaction
const createTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
};

// PUT (update) a transaction by ID
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
};

// DELETE a transaction by ID
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  // getsharedkey
};
