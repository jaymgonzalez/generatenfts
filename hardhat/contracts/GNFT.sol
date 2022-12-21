// SPDX-License-Identifier: MIT LICENSE

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

pragma solidity ^0.8.0;

error AINFTs__NotEnoughFunds();
error AINFTs__TransactionNotSent();
error AINFTs__MintingIsPaused();
error AINFTs__NftToMintLowerThanOne();

contract GNFT is ERC721URIStorage, Ownable {
    using Strings for uint256;
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 public _tokenId = 1;
    bool public paused = false;
    uint256 public fee = 10;
    string private baseURI;

    mapping(uint256 => string) public tokenIds;
    mapping(uint256 => string) public tokenNames;

    constructor() ERC721("GenerateNFT.com Collection", "GNFT") {}

    // function _baseURI() internal view virtual override returns (string memory) {
    //     return "ipfs://" + _baseURI;
    // }

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
        console.log("filename lenght %s", _fileNames.length);
        // console.log("supply %s", supply);

        for (uint256 i = 1; i <= _fileNames.length; i++) {
            // console.log("Minting NFT, tokenID %s", supply);
            // tokenIds[supply] = _fileIds[i];
            // console.log("tokenIds %s", tokenIds[supply]);
            // tokenNames[_tokenId] = _fileNames[i];
            // console.log("tokenNames %s", tokenNames[_tokenId]);
            console.log("tokenID %s", _tokenId);
            _tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            console.log("tokenID %s", _tokenId);

            // string memory stringTokenId = string(_tokenId);

            string memory uri = string(
                abi.encodePacked(
                    "ipfs://",
                    _baseUri,
                    "/",
                    _tokenId.toString(),
                    ".json"
                )
            );

            _safeMint(_to, _tokenId);
            _setTokenURI(_tokenId, uri);
        }
        // console.log("Minting NFT, tokenID %s", supply);
    }

    // function tokenURI(
    //     uint256 tokenId
    // ) public view virtual override returns (string memory) {
    //     require(
    //         _exists(tokenId),
    //         "ERC721Metadata: URI query for nonexistent token"
    //     );

    //     return
    //         bytes(baseURI).length > 0
    //             ? string(abi.encodePacked(baseURI, tokenId.toString()))
    //             : "";
    // }

    // function _setTokenURI(
    //     uint256 tokenId,
    //     string memory _baseUri
    // ) internal view override {
    //     require(
    //         _exists(tokenId),
    //         "ERC721Metadata: URI query for nonexistent token"
    //     );

    //     bytes(_baseUri).length > 0
    //         ? string(abi.encodePacked(_baseUri, tokenNames[tokenId], ".json"))
    //         : "";
    // }

    // function tokenURI(
    //     uint256 tokenId
    // ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    //     return super.tokenURI(tokenId);
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

    // getters
    function getFee() public view returns (uint256) {
        return fee;
    }

    // function getTokenUri(uint256 tokenId) public view returns (string memory) {
    //     return tokenURI(tokenId);
    // }
}
