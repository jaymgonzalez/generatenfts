// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error AINFTs__MaxTokenIdsReached();
error AINFTs__NotEnoughFunds();
error AINFTs__TransactionNotSent();

contract AINFTs is ERC721URIStorage, Ownable {
    uint256 public _tokenIds;
    uint256 public maxTokenIds = 100;
    uint256 public _price = 1 ether;
    address public tokenAddress;
    IERC20 token;

    constructor(address _tokenAddress) ERC721("AINFTs", "AINFT") {
        tokenAddress = _tokenAddress;
    }

    function mintNFT(address to, string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        token = IERC20(tokenAddress);
        // require(token.balanceOf(msg.sender) > 1, "Not enough tokens");
        // if (_tokenIds > maxTokenIds) {
        //     revert AINFTs__MaxTokenIdsReached();
        // }
        // if (msg.value < _price) {
        //     revert AINFTs__NotEnoughFunds();
        // }

        // console.log("Token address is: %s", tokenAddress);

        // console.log(
        //     "Token address balance is: %s",
        //     IERC20(tokenAddress).balanceOf(sender)
        // );

        // require(_price >= IERC20(tokenAddress).balanceOf(sender));
        _tokenIds += 1;

        token.transferFrom(msg.sender, address(this), _price);
        _safeMint(to, _tokenIds);
        _setTokenURI(_tokenIds, tokenURI);

        return _tokenIds;
    }

    function withdraw() public onlyOwner {
        token = IERC20(tokenAddress);
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    receive() external payable {}

    fallback() external payable {}
}
