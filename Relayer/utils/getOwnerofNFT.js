
const getProvider = require('./getProvider')
const ethers=require('ethers')

const getOwnerofNFT = async (sourcechainid,tokenaddress,tokenid) => {

    const abi=[{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}]
    const provider=getProvider(sourcechainid);

    const contract=new ethers.Contract(tokenaddress,abi,provider);

    const owneraddress=await contract.ownerOf(tokenid)
    return owneraddress;
 
}

module.exports= getOwnerofNFT