const { Server } =require( "socket.io");
const express =require( "express");
const cors =require( "cors");
const { createServer } =require( "http");
const getProvider =require( "./utils/getProvider");

const registryABI = require("./utils/registryABI");
const port = 5000;
const app = express();
const server = new createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());

const TOTAL_NODES=5;
const MIN_NO_NODES_REQUIRED=2;

let map = new Map();

io.on("connection", (socket) => {
  console.log(socket.id);
 
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

    console.log("adadadadadaad");

    // console.log(sourceid);
    // console.log(destinationid);
    // console.log(owneradderss);
    // console.log(tokenaddress);
    let uint8Array = new Uint8Array(thresholdKey);
    // console.log(uint8Array);
    // console.log(NodeIndex);
    
    let mapkey = {
      sourceid,
      destinationid,
      owneradderss,
      tokenaddress,
      tokenid
    };

    

    const mapvalue = {
      thresholdKey: uint8Array,
      NodeIndex: NodeIndex,
    };
    
    mapkey=JSON.stringify(mapkey);
    console.log("new ");



    
    console.log("recived data");

    // console.log(map.has(mapkey));
    // console.log(mapkey);

    if (map.has(mapkey)) {
      console.log("updating");
      // map.get(mapkey).push(mapvalue);
      map.get(mapkey).push(mapvalue) // Retrieve the existing array directly
      // console.log("type of",typeof(existingArray));
      // map.set(mapkey, [...existingArray, mapvalue]);
    } else {
      console.log('new data');
      map.set(mapkey, [mapvalue]);
    }
 

    // Iterate over key-value pairs in the map and log them
map.forEach((value, key) => {
  console.log(`Key: ${key}, Value: ${JSON.stringify(value)}, Array Size: ${value.length}`);
});


    

    // if (map.has(mapkey)) {
    //   console.log("updating");
    //   const existingArray = Array(map.get(mapkey));
    //   map.set(mapkey, [...existingArray,mapvalue]);
    // } else {
    //   map.set(mapkey, [mapvalue]);
    // }

    // const Array=map.get(mapkey);
    // // map.set(mapkey, [...Array,mapvalue]);
    // // console.log(Array.length);
    // // console.log(Array);
    // if(Array.length>MIN_NO_NODES_REQUIRED){
    //     const privatekey=await combineShares(map.get(mapkey)) //# threshol keys not object

    //     const provider=getProvider(mapkey.destinationid);
    //     const Account =new ethers.wallet(privatekey,provider);

    //     const contract=new ethers.Contract("registryaccountaddress",registryABI,Account);

    //     const NFTowner=await getOwnerofNFT(sourceid,mapkey.tokenaddress,mapkey.tokenid)

    //     await contract.createAccountOnlyRelayer(mapkey.sourceid,mapkey.tokenaddress,mapkey.tokenid, NFTowner,5102);
    //     console.log("account is created");
    // }

    // for (const [key, value] of map) {
    //   console.log("map data", key, value);
    // }
    
  });


});



async function combineShares(shares) {
    // Reconstruct the private key using Shamir's Secret Sharing
    const privateKeyHex = await shamir.combine(shares);

    // Return the reconstructed private key
    return privateKeyHex;
}

server.listen(port, () => console.log(`server is running ${port}`));
