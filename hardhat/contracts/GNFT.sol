// SPDX-License-Identifier: MIT LICENSE

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

pragma solidity ^0.8.0;

error AINFTs__NotEnoughFunds();
error AINFTs__TransactionNotSent();
error AINFTs__MintingIsPaused();
error AINFTs__NftToMintLowerThanOne();

contract GNFT is ERC721URIStorage, Ownable {
    using Strings for uint256;
    using SafeMath for uint256;

    bool public paused = false;
    uint256 public fee;
    uint256 public supply;

    mapping(uint256 => string) public tokenIds;
    mapping(uint256 => string) public tokenNames;

    constructor() ERC721("GenerateNFT.com Collection", "GNFT") {}

    function mint(
        address _to,
        string memory _baseUri,
        string[] memory _fileNames,
        string[] memory _fileIds
    ) public payable {
        if (paused) {
            revert AINFTs__MintingIsPaused();
        }
        if (_fileNames.length < 1) {
            revert AINFTs__NftToMintLowerThanOne();
        }
        if (msg.sender != owner()) {
            require(
                msg.value >= fee * _fileNames.length,
                "Not enough balance to complete transaction."
            );
        }
        for (uint256 i = 0; i <= _fileNames.length; i++) {
            increment();
            tokenIds[supply] = _fileIds[i];
            tokenNames[supply] = _fileNames[i];

            _setTokenURI(supply, _baseUri);
            _safeMint(_to, supply + i);
        }
    }

    function _setTokenURI(
        uint256 tokenId,
        string memory _baseUri
    ) internal view override {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        bytes(_baseUri).length > 0
            ? string(abi.encodePacked(_baseUri, tokenNames[tokenId], ".json"))
            : "";
    }

    function increment() internal {
        supply = supply.add(1);
    }

    // function transferFrom(address _from, address _to, uint256 _tokenId) public {
    //     require(ownerOf(_tokenId) == _from, "You do not own this token.");
    //     _transferFrom(_from, _to, _tokenId);
    // }

    // only owner
    function setFee(uint256 _fee) public onlyOwner {
        fee = _fee;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        if (!sent) {
            revert AINFTs__TransactionNotSent();
        }
    }
}
