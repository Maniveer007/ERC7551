import { ethers } from 'ethers';
// import React from 'react'
// import env from"dotenv";
// env.config();
import abi from '../registryABI';

const getAccountDeployedStatus = async(currchainId,sourcechainId,tokenaddress,tokenId,owner) => {
    let url;
    if(currchainId==84532){
        url= `https://base-sepolia.g.alchemy.com/v2/${"_5hocbWgoafqLKtPKfXqKuc9unqZHG1o"}`;
    }else if(currchainId==11155420){
        url=`https://opt-sepolia.g.alchemy.com/v2/${"6jjFsbDDs3n8hb5KCeIXGXHRzaE84fLd"}`
    }else if(currchainId==11155111){
        url=`https://eth-sepolia.g.alchemy.com/v2/${"jqJjknACS9UffcaLTHqfE3kUwIVyOADc"}`
    }
    const provider=new ethers.JsonRpcProvider(url);
    const contract=new ethers.Contract("0xA68736d237e5bD7fF2785B823EbA37ffE8E2DB82",abi,provider);

    
    
  return await contract.isAccountCreated(sourcechainId,tokenaddress,tokenId,owner,0);
}

export default getAccountDeployedStatus