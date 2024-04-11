//SPDX-License-Identifier:MiT

pragma solidity ^0.8.0;

import "./ERC7551Account.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IRelayer{
    function createCrosschainAccount(uint DestinationchainID,address Tokenaddress,uint tokenID ) external;
}

contract Registry {

    IRelayer onrelayer;
    address offrelayer;


    constructor(){
        onrelayer=IRelayer(0x913bABf454A57f72f7Adc03117379aE3d1194bCE);
        offrelayer=0x9DCF58834F0e75Ffd72623cCf5447D01dd85Ba81;
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

    function createAccount(uint _sourcechainID,address _tokenaddress,uint _tokenID, uint256 _salt)  public payable {
        address addr;

        address _owner=IERC721(_tokenaddress).ownerOf(_tokenID);
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


    function createAccountOnlyRelayer(uint _sourcechainID,address _tokenaddress,uint _tokenID,address _owner, uint256 _salt) onlyoffRelayer public {
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

    function isAccountCreated(uint _sourcechainID,address _tokenaddress,uint _tokenID,address _owner, uint256 _salt)public view returns(bool){
        address accountaddress= account( _sourcechainID, _tokenaddress, _tokenID, _owner,  _salt);
        if(accountaddress.code.length!=0){
            return true;
        }
        return false;
    }

    function CreateCrossChainAccount(
        uint DestinationchainID,
        address Tokenaddress,
        uint tokenID
        )external{
        onrelayer.createCrosschainAccount( DestinationchainID, Tokenaddress, tokenID);
    }

    modifier onlyoffRelayer(){
        require(msg.sender==address(onrelayer));
        _;
    }


}















