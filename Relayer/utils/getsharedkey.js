require('dotenv').config();
const shamir = require('shamir-secret-sharing');

function hexToUint8Array(hexString) {
    return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}

const getsharedkey=async(INDEX,TOTAL_NODES, MIN_NODES)=>{
    // const privateKeyBytes = hexToUint8Array(process.env.RELAYER_KEY);
    // Split the private key into shares using Shamir's Secret Sharing
    // const shares =await shamir.split(privateKeyBytes, TOTAL_NODES, MIN_NODES);

    const shares=[[
        228,  62, 182,  76, 213, 242,  73,  97,
        144, 157, 210, 207, 206, 231, 181, 111,
        133,   1,  25,  56,   5, 217, 123, 157,
         11, 101,  27, 235, 117,  68, 150, 115,
        129
      ],
      [
        150, 177,  67,  41, 251, 139, 203,
        164, 215,  55, 118, 110, 169,  82,
        197, 242, 119,  79, 242, 254,  22,
        188,  52, 231, 194, 108, 129,  93,
        213,  22, 142, 212, 115
      ],[
        187,  87,  57,  78, 148,  43, 206, 106,
        101, 180, 246, 165, 225, 248,  64, 131,
        214, 213, 135, 139,  70, 177, 127, 255,
        251, 232, 104, 250, 245, 100,  20,  28,
          3
      ],[
        113,  28,  33, 255, 114, 209, 204,  34,
        197, 168,  98,  92,  34,  13, 121, 211,
        199, 252, 112, 235, 223, 161, 228,   4,
        157,  60, 139, 238, 238,  79, 146, 129,
         48
      ],[
        239,  86,  88, 18, 236, 176,  85, 209,
        122, 228, 152, 21,  29,  38,  82, 241,
        182, 193,  40, 45,   2, 219, 228,  22,
        122, 149, 247, 80,  25, 179, 231,  52,
        190
      ]
    ]

    return shares[INDEX];
}

module.exports={getsharedkey}