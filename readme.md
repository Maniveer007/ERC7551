# ERC7551



### problem statement 

Current interoperability limitations hinder the full potential of ERC-6551's Token Bound Accounts (TBAs) by restricting their creation and operation to single blockchains

ERC-6551's Token Bound Accounts (TBAs) are currently limited to single blockchains. This is because the owner() function in the ERC-6551 contract checks if the token (used to bind the account) resides on the same blockchain as the TBA itself. If not, it returns address zero

The provided code snippet showcases this limitation:
```
function owner() public view returns (address) {
  (uint256 chainId, address tokenContract, uint256 tokenId) = this.token();
  if (chainId != block.chainid) return address(0);  // Restricts owner to same chain

  return IERC721(tokenContract).ownerOf(tokenId);
}
```

This limitation hinders the full potential of TBAs by preventing them from functioning across different blockchains. This restricts their usability in scenarios where applications or assets might  multiple chains

## Solution 

Solution we resolve this problem by introducing a interoperability Relayer for creating crosschain TokenBounded account which creates Tokenbounded account on all chains with same address 

### Solution Overview

To address this issue, we propose the development of an interoperability relayer that enables Token Bound Accounts (TBAs) to function seamlessly across different blockchains. This relayer leverages the CREATE2 opcode to deploy TBAs at the same address on multiple chains, ensuring consistency of account ownership and functionality.




### Archeticture of ERC7551 
![alt text](https://i.ibb.co/dgXDr6H/relayer-2.png)

### key features of our Relayer

 **Threshold relayer**:

- every node of relayer holds threshold key(or shared key)
- every node of relayer verify the transaction and sends the request to executior nodes 
- executior node executes transaction if it recives the minimum no of requests from verifier nodes 
- executior node extract the key from the threshold key    


![alt text](https://i.ibb.co/PQkxWr2/Internal-working-of-relayer.png)
![alt text](https://i.ibb.co/gDrs1Py/Source-NFT.png)


## usage of CREATE2

- Deploying TokenBounded Account on all chains at same address was crutial for the ERC7551 Solution
- we used CREATE2 to deploy all our registry contracts at same address 




## Detailed working of ERC7551 

- when a user clicks on create account the the relayer emits an event 
- verifiernodes keep tracking the relayer when ever relayer emits the event then the verifier sends the details of transaction to be executed and the threshold key of relayer 
- executior node will decrypt key form the threshold key and executes account creation transaction 
- verifiers will keep track of all the NFTs on source destination when ever the NFT is transfered to new owner the the relayer will change the ownership of Account to new owner 

