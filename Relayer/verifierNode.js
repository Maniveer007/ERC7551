const io = require("socket.io-client");
require("dotenv").config();
const socket = io("http://localhost:5000/");
const prompt = require("prompt-sync")({ sigint: true });
const { getsharedkey } = require("./utils/getsharedkey");
const relayerABI = require("./utils/relayerABI");
const ERCabi = require("./utils/ERC721TransferABI");
const ethers = require("ethers");
const { default: axios } = require("axios");
const getProvider = require("./utils/getProvider");

const runVerifyNode = async () => {
  const TOTAL_NODES = 5;
  const MIN_NO_NODES_REQUIRED = 3;

  // Getting getails of Each verifier node
  // let NodeIndex = prompt("Enter the index of Node: ");
  // NodeIndex = Number(NodeIndex);
  const NodeIndex = process.env.Node_Index;
  const thresholdKey = await getsharedkey(
    NodeIndex,
    TOTAL_NODES,
    MIN_NO_NODES_REQUIRED
  );

  // Initialize contract address and ABI
  const RelayercontractAddress = "0xF1AD184b28574Ee5acC065251ef36726192a8836";

  // const MumbaiproviderURL = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_API_KEY}`;
  // const Mumbaiprovider = new ethers.JsonRpcProvider(MumbaiproviderURL);

  const BasesepoliaproviderURL = `https://base-sepolia.g.alchemy.com/v2/${process.env.BASE_API_KEY}`;
  const Basesepoliaprovider = new ethers.JsonRpcProvider(
    BasesepoliaproviderURL
  );

  const opSepoliaproviderURL = `https://opt-sepolia.g.alchemy.com/v2/${process.env.OPSEPOLIA_API_KEY}`;
  const opSepoliaprovider = new ethers.JsonRpcProvider(opSepoliaproviderURL);

  const SepoliaproviderURL = `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_API_KEY}`;
  const Sepoliaprovider = new ethers.JsonRpcProvider(SepoliaproviderURL);

  console.log(Sepoliaprovider);

  // const mumbaiRelayerContract = new ethers.Contract(RelayercontractAddress, relayerABI, Mumbaiprovider);
  const baseSepoliaRelayerContract = new ethers.Contract(
    RelayercontractAddress,
    relayerABI,
    Basesepoliaprovider
  );
  const opSepoliaRelayerContract = new ethers.Contract(
    RelayercontractAddress,
    relayerABI,
    opSepoliaprovider
  );
  const sepoliaRelayerContract = new ethers.Contract(
    RelayercontractAddress,
    relayerABI,
    Sepoliaprovider
  );

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
    "CreateAccount",
    (sourceid, destinationid, owneradderss, tokenaddress, tokenid) => {
      console.log(`createAccount event Trigered from sourcechain:${sourceid}`);

      const data = {
        sourceid: Number(sourceid),
        destinationid: Number(destinationid),
        owneradderss,
        tokenaddress,
        tokenid: Number(tokenid),
        thresholdKey,
        NodeIndex,
      };

      socket.emit("CreateAccount", data);
    }
  );

  opSepoliaRelayerContract.on(
    "CreateAccount",
    (sourceid, destinationid, owneradderss, tokenaddress, tokenid) => {
      console.log(`createAccount event Trigered from sourcechain:${sourceid}`);

      const data = {
        sourceid: Number(sourceid),
        destinationid: Number(destinationid),
        owneradderss,
        tokenaddress,
        tokenid: Number(tokenid),
        thresholdKey,
        NodeIndex,
      };

      socket.emit("CreateAccount", data);
    }
  );

  sepoliaRelayerContract.on(
    "CreateAccount",
    (sourceid, destinationid, owneradderss, tokenaddress, tokenid) => {
      // console.log("kjhdfsgyhzsdgi");
      console.log(`createAccount event Trigered from sourcechain:${sourceid}`);

      const data = {
        sourceid: Number(sourceid),
        destinationid: Number(destinationid),
        owneradderss,
        tokenaddress,
        tokenid: Number(tokenid),
        thresholdKey,
        NodeIndex,
      };

      socket.emit("CreateAccount", data);
    }
  );

  const accounts = await axios.get("http://localhost:3000/account");
  const Tokens = accounts.data;
  console.log(Tokens);

  Tokens.map((token) => {
    const provider = getProvider(Number(token.source));
    // console.log(token.tokenAddress);
    const contract = new ethers.Contract(token.tokenAddress, ERCabi, provider);

    // console.log("ywsgfyugyushgfiyeh");
    contract.on("Transfer", (from, to, tokenindex) => {
      if (tokenindex == token.tokenId) {
        const data = {
          accountAddress: token.account,
          sourceid: token.source,
          destinationid: token.destination,
          newowner: to,
          thresholdKey,
          NodeIndex,
        };
        console.log(`Transfer of owner of Account :${token.account} detucted`);
        socket.emit("Transfer", data);
      }
    });
  });
};

socket.on("connect", () => {
  console.log("Socket connected");
});

runVerifyNode();
