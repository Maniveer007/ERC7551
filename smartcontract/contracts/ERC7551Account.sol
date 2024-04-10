// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

import {IERC7551Account}  from "./interfaces/IERC7551Account.sol";



contract ERC7551Account is IERC7551Account { 


    uint256 public nonce;

     

    address Owner;
    address Relayer;

    event TransactionExecuted(uint chainid,address from ,address to,uint256 value,bytes data);

    constructor(uint _sourcechainID,address _tokenaddress,uint _tokenID,address _owner){
        Relayer=msg.sender;
        Token=TokenDetails(_sourcechainID,_tokenaddress,_tokenID);
        Owner= _owner;
    }

    TokenDetails Token;

    receive() external payable {}

    function executeCall(
        address to,
        uint256 value,
        bytes calldata data
    ) external payable returns (bytes memory result) {
        if(block.chainid==Token.sourcechainID){
            require(IERC721(Token.tokenaddress).ownerOf(Token.tokenID)==msg.sender);
        }
        else{
            require(Owner==msg.sender);
        }

        require(msg.sender == Owner, "Not token owner");

        ++nonce;

        emit TransactionExecuted(block.chainid,msg.sender,to, value, data);

        bool success;
        (success, result) = to.call{value: value}(data);

        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    
    function changeOwner(address newowner)public onlyRelayer {
        // Trigers only when the ownership is transfered of NFT on source blockchain
        Owner=newowner;
    }

    function owner() public view returns (address){
        if(block.chainid==Token.sourcechainID){
            return IERC721(Token.tokenaddress).ownerOf(Token.tokenID);
        }
        return Owner;
    }

    function token() public view returns(TokenDetails memory){
        return Token;
    }
    

    

    function isValidSignature(bytes32 hash, bytes memory signature)
        external
        view
        returns (bytes4 magicValue)
    {
        bool isValid = SignatureChecker.isValidSignatureNow(Owner, hash, signature);

        if (isValid) {
            return IERC1271.isValidSignature.selector;
        }

        return "";
    }

    modifier onlyRelayer() {
        require(msg.sender==Relayer);
        _;
    }
}
