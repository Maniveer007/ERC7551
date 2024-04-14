const { Server } =require( "socket.io");
const express =require( "express");
const cors =require( "cors");
const { createServer } =require( "http");
const getProvider =require( "./utils/getProvider");
const shamir = require('shamir-secret-sharing');
const ethers = require('ethers')
const registryABI = require("./utils/registryABI");
const getOwnerofNFT = require("./utils/getOwnerofNFT");
const axios = require('axios');


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


  //post data in node
  const postDataNode = async ()=>{
    try {
      const postDataInbackend={
        socketId:socket.id,
        // nodeIndex:NodeIndex
      }
      const res=await axios.post('http://localhost:3000/node/',postDataInbackend);
      console.log('data in postDataNode',res.data);
    } catch (error) {
      console.log('error in postDataNode',error);
    }
  }

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
    
    
    try {
      const accountAddress=await contract.account(sourceid,tokenaddress,tokenid,NFTowner,123);
      const tx=await contract.createAccountOnlyRelayer(sourceid,tokenaddress,tokenid,NFTowner,12);
      console.log('tx value',tx?.hash);

      const postData = async ()=>{
        try {
          const data = {
            txHash:tx?.hash,
            method:"create Account",
            source:sourceid,
            destination:destinationid,
          }
          const res=await axios.post('http://localhost:3000/transactions/',data);
          console.log('data in postdata',res.data);
        } catch (error) {
          console.log('error in postdata',error);
        }
      }


      const postAccountDetail = async ()=>{
        try {
          const data = {
            address:accountAddress,
            source:sourceid,
            destination:destinationid,
            tokenAddress:tokenaddress,
            tokenId:tokenid
          }
          const res=await axios.post('http://localhost:3000/account/',data);
          console.log('data in postAccountDetail',res.data);
        } catch (error) {
          console.log('error in postAccountDetail',error);
        }
      }
      
  
  
      await tx.wait();
      tx&&postData();
      tx&&postAccountDetail();
  
      console.log("executed sucessfully");
  
    } catch (error) {
      console.log('error in getting tx',error);
    }


 
     

    


  }

    
  });





  
  socket.on('disconnect', () => {
    console.log('User disconnected with ID:', socket.id);
    io.emit('user disconnected', socket.id); // Emit user disconnected event with ID

    const delDataNode = async ()=>{
      try {
        const res=await axios.delete(`http://localhost:3000/node/${socket.id}`);
        console.log('del in postDataNode',res.data);
      } catch (error) {
        console.log('error in postDataNode',error);
      }
    }

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
  return uint8Array.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}

server.listen(port, () => console.log(`server is running ${port}`));
