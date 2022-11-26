// SPDX-License-Identifier: MIT LICENSE

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

pragma solidity ^0.8.0;

error AINFTs__MaxTokenSupplyReached(uint256 currentSupply, uint256 maxSupply);
error AINFTs__NotEnoughFunds();
error AINFTs__TransactionNotSent();
error AINFTs__MintingIsPaused();
error AINFTs__NftToMintLowerThanOne();
error AINFTs__MintingMoreThanAllowed(uint256 maxMintAmount);

contract AINFTs is ERC721Enumerable, Ownable {
    struct TokenInfo {
        IERC20 paytoken;
        uint256 costvalue;
    }

    TokenInfo[] public AllowedCrypto;

    using Strings for uint256;
    string public baseURI;
    string public baseExtension = ".json";
    uint256 public maxSupply = 1000;
    uint256 public maxMintAmount = 5;
    bool public paused = false;

    constructor() ERC721("AINFT NFT Collection", "AINFT") {}

    function addCurrency(IERC20 _paytoken, uint256 _costvalue)
        public
        onlyOwner
    {
        AllowedCrypto.push(
            TokenInfo({paytoken: _paytoken, costvalue: _costvalue})
        );
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "ipfs://EE5MmqVp5MmqVp7ZRMBBizicVh9ficVh9fjUofWicVh9f/";
    }

    function mint(
        address _to,
        uint256 _mintAmount,
        uint256 _pid
    ) public payable {
        TokenInfo storage tokens = AllowedCrypto[_pid];
        IERC20 paytoken;
        paytoken = tokens.paytoken;
        uint256 cost;
        cost = tokens.costvalue;
        uint256 supply = totalSupply();
        if (paused) {
            revert AINFTs__MintingIsPaused();
        }
        if (_mintAmount < 1) {
            revert AINFTs__NftToMintLowerThanOne();
        }
        if (_mintAmount > maxMintAmount) {
            revert AINFTs__MintingMoreThanAllowed(maxMintAmount);
        }
        if (supply + _mintAmount >= maxSupply) {
            revert AINFTs__MaxTokenSupplyReached(supply, maxSupply);
        }

        if (msg.sender != owner()) {
            require(
                msg.value == cost * _mintAmount,
                "Not enough balance to complete transaction."
            );
        }

        for (uint256 i = 1; i <= _mintAmount; i++) {
            paytoken.transferFrom(msg.sender, address(this), cost);
            _safeMint(_to, supply + i);
        }
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    // only owner

    function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
        maxMintAmount = _newmaxMintAmount;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function withdraw(uint256 _pid) public payable onlyOwner {
        TokenInfo storage tokens = AllowedCrypto[_pid];
        IERC20 paytoken;
        paytoken = tokens.paytoken;
        paytoken.transfer(msg.sender, paytoken.balanceOf(address(this)));
    }
}
