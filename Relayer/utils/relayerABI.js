const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "sourcechainID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "destinationchainID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenaddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenID",
        type: "uint256",
      },
    ],
    name: "CreateAccount",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "DestinationchainID",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "Tokenaddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenID",
        type: "uint256",
      },
    ],
    name: "createCrosschainAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

module.exports = abi;
