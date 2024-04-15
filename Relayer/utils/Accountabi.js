const abi=[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_sourcechainID",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_tokenaddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenID",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_relayer",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "chainid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "TransactionExecuted",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "Token",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "sourcechainID",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "tokenaddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenID",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newowner",
				"type": "address"
			}
		],
		"name": "changeOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "executeCall",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "result",
				"type": "bytes"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "signature",
				"type": "bytes"
			}
		],
		"name": "isValidSignature",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "magicValue",
				"type": "bytes4"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nonce",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "sourcechainID",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "tokenaddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenID",
						"type": "uint256"
					}
				],
				"internalType": "struct ERC7551Account.TokenDetails",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]
module.exports=abi;