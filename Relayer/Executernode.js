const { Server } =require( "socket.io");
const express =require( "express");
const cors =require( "cors");
const { createServer } =require( "http");
const getProvider =require( "./utils/getProvider");
const shamir = require('shamir-secret-sharing');
const ethers = require('ethers')
const registryABI = require("./utils/registryABI");
const getOwnerofNFT = require("./utils/getOwnerofNFT");


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
const MIN_NO_NODES_REQUIRED=3;

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

    console.log("adydtrutkutuyyukkuytyytfjkhfkjyfkyutjfyutifr jyutfiyukgfukiyfvrukytigfyufvg ut6fuytgv tyftyg vtufvyv uhvyfgvg nyugv");

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
    // console.log("new ");



    
    // console.log("recived data");

    // console.log(map.has(mapkey));
    // console.log(mapkey);

    if (map.has(mapkey)) {
      console.log("updating");
      map.get(mapkey).push(mapvalue) // Retrieve the existing array directly
     
    } else {
      console.log('new data');
      map.set(mapkey, [mapvalue]);
    }
 

//     // Iterate over key-value pairs in the map and log them
// map.forEach((value, key) => {
//   console.log(`Key: ${key}, Value: ${JSON.stringify(value)}, Array Size: ${value.length}`);
// });

function removeDuplicatesandgetthresholdkey(arr) {
  const removeddublicates= arr.filter((item,
      index) => arr.indexOf(item) === index);
  return removeddublicates.map(val=>{
    return val.thresholdKey;
  })
}

  if(map.get(mapkey).length>MIN_NO_NODES_REQUIRED){

    const uint8arrprivatekey=await combineShares(removeDuplicatesandgetthresholdkey(map.get(mapkey)))

    console.log(uint8ArrayToHex(uint8arrprivatekey));

    const privatekey=uint8ArrayToHex(uint8arrprivatekey);
    
    const provider=getProvider(destinationid);

    const wallet=new ethers.Wallet(privatekey,provider);

    const NFTowner=await getOwnerofNFT(sourceid,tokenaddress,tokenid)
    
    console.log(NFTowner);

    const contract=new ethers.Contract("0xEE722dE235b9480edB59f0ec9557D2971582E7fF",registryABI,wallet);

    const tx=await contract.createAccountOnlyRelayer(sourceid,tokenaddress,tokenid,NFTowner,223);
    await tx.wait();

    console.log("executed sucessfully");



  }

    
  });


});



async function combineShares(shares) {
    // Reconstruct the private key using Shamir's Secret Sharing
    const privateKeyHex = await shamir.combine(shares);

    // Return the reconstructed private key
    return privateKeyHex;
}
function uint8ArrayToHex(uint8Array) {
  return uint8Array.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}

server.listen(port, () => console.log(`server is running ${port}`));
