
const Node = require("../model/Node");

require("dotenv").config();

// GET all transactions
const getAllNode = async (req, res) => {
  try {
    const node = await Node.find();
    res.json(node);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};



// GET a single transaction by ID
// const getTransactionById = async (req, res) => {
//   try {
//     const transaction = await Transaction.findById(req.params.id);
//     if (!transaction) {
//       return res.status(404).json({ error: "Transaction not found" });
//     }
//     res.json(transaction);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

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
const createNode = async (req, res) => {
  try {
    const newNode = new Node(req.body);
    await newNode.save();
    res.status(201).json(newNode);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
};

// DELETE a transaction by ID
const deleteNode = async (req, res) => {
  try {
    const socketId = req.params.socketId;
    const node = await Node.deleteMany({ socketId });
    
    if (!node) {
    console.log("Node not found");
      return res.status(404).json({ error: "Node not found" });
    }
    res.json({ message: "Node deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
    getAllNode,
    createNode,
    deleteNode
};
