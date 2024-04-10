//SPDX-License-Identifier:MiT

pragma solidity ^0.8.0;

import "./ERC7551Account.sol";

interface IRelayer{
    function createCrosschainAccount(uint DestinationchainID,address Tokenaddress,uint tokenID ) external;
}

contract Registry {

    IRelayer relayer;


    constructor(address _relayer){
        relayer=IRelayer(_relayer);
    }


    event Deployed(address addr, uint256 salt);
    event Account_created(address accountaddress,uint sourcechainID,address tokenaddress,uint tokenID,address owner);


    function getBytecode(uint _sourcechainID,address _tokenaddress,uint _tokenID,address _owner)
        internal 
        pure
        returns (bytes memory)
    {
        bytes memory bytecode = type(ERC7551Account).creationCode;

        return abi.encodePacked(bytecode, abi.encode( _sourcechainID, _tokenaddress, _tokenID, _owner));
    
    }

    function account(uint _sourcechainID,address _tokenaddress,uint _tokenID,address _owner, uint256 _salt)
        public
        view
        returns (address)
    {
        bytes memory bytecode=getBytecode(_sourcechainID, _tokenaddress, _tokenID, _owner);

        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff), address(this), _salt, keccak256(bytecode)
            )
        );

        // NOTE: cast last 20 bytes of hash to address
        return address(uint160(uint256(hash)));
    }

    function createAccount(uint _sourcechainID,address _tokenaddress,uint _tokenID,address _owner, uint256 _salt)  public payable {
        address addr;

        bytes memory bytecode =getBytecode( _sourcechainID, _tokenaddress, _tokenID, _owner);
         
        address deployedaddress =account(_sourcechainID, _tokenaddress, _tokenID, _owner,_salt);

        assembly {
            addr :=
                create2(
                    callvalue(), // wei sent with current call
                    // Actual code starts after skipping the first 32 bytes
                    add(bytecode, 0x20),
                    mload(bytecode), // Load the size of code contained in the first 32 bytes
                    _salt // Salt from function arguments
                )

            if iszero(extcodesize(addr)) { revert(0, 0) }
        }

        emit Account_created(deployedaddress,_sourcechainID, _tokenaddress, _tokenID, _owner);
        emit Deployed(addr, _salt);
    }

    function CreateCrossChainAccount(
        uint DestinationchainID,
        address Tokenaddress,
        uint tokenID
        )external{
        relayer.createCrosschainAccount( DestinationchainID, Tokenaddress, tokenID);
    }


}
