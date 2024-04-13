const io = require("socket.io-client");
require("dotenv").config();
const socket = io("http://localhost:5000/");
const prompt = require("prompt-sync")({ sigint: true });
const { getsharedkey } = require("./utils/getsharedkey");
const relayerABI = require("./utils/relayerABI");
const ethers = require("ethers");


const runVerifyNode = async () => {

    
    const TOTAL_NODES=5;
    const MIN_NO_NODES_REQUIRED=3;
    
    // Getting getails of Each verifier node
    let NodeIndex = prompt("Enter the index of Node: ");
    NodeIndex = Number(NodeIndex);
    
    const thresholdKey=await getsharedkey(NodeIndex, TOTAL_NODES, MIN_NO_NODES_REQUIRED)
    
    
    // Initialize contract address and ABI
    const RelayercontractAddress = "0xF1AD184b28574Ee5acC065251ef36726192a8836";

    // const MumbaiproviderURL = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_API_KEY}`;
    // const Mumbaiprovider = new ethers.JsonRpcProvider(MumbaiproviderURL);

    const BasesepoliaproviderURL = `https://base-sepolia.g.alchemy.com/v2/${process.env.BASE_API_KEY}`;
    const Basesepoliaprovider = new ethers.JsonRpcProvider(BasesepoliaproviderURL);
    
    const opSepoliaproviderURL=`https://opt-sepolia.g.alchemy.com/v2/${process.env.OPSEPOLIA_API_KEY}`
    const opSepoliaprovider = new ethers.JsonRpcProvider(opSepoliaproviderURL);
    
    const SepoliaproviderURL=`https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_API_KEY}`
    const Sepoliaprovider = new ethers.JsonRpcProvider(SepoliaproviderURL);

    
    // const mumbaiRelayerContract = new ethers.Contract(RelayercontractAddress, relayerABI, Mumbaiprovider);
    const baseSepoliaRelayerContract = new ethers.Contract(RelayercontractAddress, relayerABI, Basesepoliaprovider);
    const opSepoliaRelayerContract = new ethers.Contract(RelayercontractAddress, relayerABI, opSepoliaprovider);
    const sepoliaRelayerContract = new ethers.Contract(RelayercontractAddress, relayerABI, Sepoliaprovider);
    
    
    // Define event handler
    
//     mumbaiRelayerContract.on(
//         "CreateAccount",(sourceid, destinationid, owneradderss, tokenaddress, tokenid) => {
//             console.log(`createAccount event Trigered from sourcechain:${sourceid}`);
    
//             const data = {
//                 sourceid: Number(sourceid),
//                 destinationid: Number(destinationid),
//                 owneradderss,
//                 tokenaddress,
//                 tokenid:Number(tokenid),
//                 thresholdKey,
//                 NodeIndex,
//             };
            
//             socket.emit("CreateAccount",data);
// });

    baseSepoliaRelayerContract.on(
        "CreateAccount",(sourceid, destinationid, owneradderss, tokenaddress, tokenid) => {
            console.log(`createAccount event Trigered from sourcechain:${sourceid}`);
    
            const data = {
                sourceid: Number(sourceid),
                destinationid: Number(destinationid),
                owneradderss,
                tokenaddress,
                tokenid:Number(tokenid),
                thresholdKey,
                NodeIndex,
            };
            
            socket.emit("CreateAccount",data);
});

opSepoliaRelayerContract.on(
        "CreateAccount",(sourceid, destinationid, owneradderss, tokenaddress, tokenid) => {
            console.log(`createAccount event Trigered from sourcechain:${sourceid}`);
    
            const data = {
                sourceid: Number(sourceid),
                destinationid: Number(destinationid),
                owneradderss,
                tokenaddress,
                tokenid:Number(tokenid),
                thresholdKey,
                NodeIndex,
            };
            
            socket.emit("CreateAccount",data);
});

sepoliaRelayerContract.on(
        "CreateAccount",(sourceid, destinationid, owneradderss, tokenaddress, tokenid) => {
            // console.log("kjhdfsgyhzsdgi");
            console.log(`createAccount event Trigered from sourcechain:${sourceid}`);
    
            const data = {
                sourceid: Number(sourceid),
                destinationid: Number(destinationid),
                owneradderss,
                tokenaddress,
                tokenid:Number(tokenid),
                thresholdKey,
                NodeIndex,
            };
            
            socket.emit("CreateAccount",data);
});


};

socket.on("connect", () => {
    console.log("Socket connected");
});


runVerifyNode();




