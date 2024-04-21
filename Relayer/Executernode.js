const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const getProvider = require("./utils/getProvider");
const shamir = require("shamir-secret-sharing");
const ethers = require("ethers");
const registryABI = require("./utils/registryABI");
const Accountabi = require("./utils/Accountabi");
const getOwnerofNFT = require("./utils/getOwnerofNFT");
const axios = require("axios");

const port = 5000;
const app = express();
const server = new createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());

const TOTAL_NODES = 5;
const MIN_NO_NODES_REQUIRED = 3;

let map = new Map();

function getthresholdkey(arr) {
  return arr.map((val) => {
    return val.thresholdKey;
  });
}

function removeDuplicateUint8Arrays(arrays) {
  const set = new Set();

  return arrays.filter((array) => {
    const stringRepresentation = array.toString();
    if (set.has(stringRepresentation)) {
      return false; // Duplicate found
    }
    set.add(stringRepresentation);
    return true; // Unique array
  });
}

io.on("connection", (socket) => {
  console.log(socket.id);

  //post data in node
  const postDataNode = async () => {
    try {
      const postDataInbackend = {
        socketId: socket.id,
        // nodeIndex:NodeIndex
      };
      const res = await axios.post(
        "http://erc7551.deepak.codes/node/",
        postDataInbackend
      );
      console.log("a verifier node is added");
    } catch (error) {
      console.log("error in postDataNode", error);
    }
  };

  postDataNode();

  socket.on("CreateAccount", async (data) => {
    const {
      sourceid,
      destinationid,
      owneradderss,
      tokenaddress,
      tokenid,
      thresholdKey,
      NodeIndex,
    } = data;

    let uint8Array = new Uint8Array(thresholdKey);

    let mapkey = {
      sourceid,
      destinationid,
      owneradderss,
      tokenaddress,
      tokenid,
    };

    const mapvalue = {
      thresholdKey: uint8Array,
      NodeIndex: NodeIndex,
    };

    mapkey = JSON.stringify(mapkey);

    if (map.has(mapkey)) {
      console.log("updating");
      map.get(mapkey).push(mapvalue); // Retrieve the existing array directly
    } else {
      console.log("new data");
      map.set(mapkey, [mapvalue]);
    }

    shares = removeDuplicateUint8Arrays(getthresholdkey(map.get(mapkey)));
    // console.log(shares);

    if (shares.length >= MIN_NO_NODES_REQUIRED) {
      try {
        const uint8arrprivatekey = await combineShares(shares);

        const privateKey = uint8ArrayToHex(uint8arrprivatekey);

        const provider = getProvider(destinationid);
        const wallet = new ethers.Wallet(privateKey, provider);
        const NFTowner = await getOwnerofNFT(sourceid, tokenaddress, tokenid);

        console.log(NFTowner);

        const contract = new ethers.Contract(
          "0xA68736d237e5bD7fF2785B823EbA37ffE8E2DB82",
          registryABI,
          wallet
        );

        const accountAddress = await contract.account(
          sourceid,
          tokenaddress,
          tokenid,
          NFTowner,
          0
        );
        const tx = await contract.createAccountOnlyRelayer(
          sourceid,
          tokenaddress,
          tokenid,
          NFTowner,
          0
        );
        console.log("tx value", tx?.hash);

        const postData = async () => {
          try {
            const data = {
              txHash: tx?.hash,
              method: "create Account",
              source: sourceid,
              destination: destinationid,
            };
            const res = await axios.post(
              "http://erc7551.deepak.codes/transactions/",
              data
            );
            console.log("added transaction data to backend");
          } catch (error) {
            console.log("error in postdata", error);
          }
        };

        const postAccountDetail = async () => {
          try {
            const data = {
              address: accountAddress,
              source: sourceid,
              destination: destinationid,
              tokenAddress: tokenaddress,
              tokenId: tokenid,
            };
            const res = await axios.post(
              "https://erc7551-38pf.onrender.com/account/",
              data
            );
            console.log("added account details to backend");
          } catch (error) {
            console.log("error in postAccountDetail", error);
          }
        };

        await tx.wait();
        tx && postData();
        tx && postAccountDetail();

        console.log("executed sucessfully");

        socket.emit("accountCreated");
        
      } catch (error) {
        // console.log("error in getting tx", error);
      }
    }
  });

  socket.on("Transfer", async (data) => {
    const {
      accountAddress,
      sourceid,
      destinationid,
      newowner,
      thresholdKey,
      NodeIndex,
    } = data;

    let uint8Array = new Uint8Array(thresholdKey);
    let mapkey = {
      accountAddress,
      sourceid,
      destinationid,
      newowner,
    };
    const mapvalue = {
      thresholdKey: uint8Array,
      NodeIndex,
    };

    mapkey = JSON.stringify(mapkey);

    if (map.has(mapkey)) {
      console.log("updating");
      map.get(mapkey).push(mapvalue); // Retrieve the existing array directly
    } else {
      console.log("new data");
      map.set(mapkey, [mapvalue]);
    }

    shares = removeDuplicateUint8Arrays(getthresholdkey(map.get(mapkey)));
    console.log(shares);

    if (shares.length > MIN_NO_NODES_REQUIRED) {
      try {
        const uint8arrprivatekey = await combineShares(shares);

        const privateKey = uint8ArrayToHex(uint8arrprivatekey);

        const provider = getProvider(destinationid);
        const wallet = new ethers.Wallet(privateKey, provider);

        const contract = new ethers.Contract(
          accountAddress,
          Accountabi,
          wallet
        );
        const tx = await contract.changeOwner(newowner);

        console.log("Transfered loading");
        await tx.wait();
        console.log("Transfered Sucessfully");
      } catch (e) {
        // console.log(e);
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected with ID:", socket.id);
    io.emit("user disconnected", socket.id); // Emit user disconnected event with ID

    const delDataNode = async () => {
      try {
        const res = await axios.delete(
          `http://erc7551.deepak.codes/node/${socket.id}`
        );
        console.log("del in postDataNode", res.data);
      } catch (error) {
        console.log("error in postDataNode", error);
      }
    };

    delDataNode();
  });
});

async function combineShares(shares) {
  // Reconstruct the private key using Shamir's Secret Sharing
  const privateKeyHex = await shamir.combine(shares);

  // Return the reconstructed private key
  return privateKeyHex;
}
function uint8ArrayToHex(uint8Array) {
  return uint8Array.reduce(
    (str, byte) => str + byte.toString(16).padStart(2, "0"),
    ""
  );
}

server.listen(port, () => console.log(`server is running ${port}`));
