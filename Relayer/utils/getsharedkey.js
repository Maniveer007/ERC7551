require('dotenv').config();
const shamir = require('shamir-secret-sharing');

function hexToUint8Array(hexString) {
    return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}

const getsharedkey=async(INDEX,TOTAL_NODES, MIN_NODES)=>{
    const privateKeyBytes = hexToUint8Array(process.env.RELAYER_KEY);
    // Split the private key into shares using Shamir's Secret Sharing
    const shares =await shamir.split(privateKeyBytes, TOTAL_NODES, MIN_NODES);

    return shares[INDEX];
}

module.exports={getsharedkey}