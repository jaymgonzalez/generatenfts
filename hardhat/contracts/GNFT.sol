// SPDX-License-Identifier: MIT LICENSE

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

pragma solidity ^0.8.0;

error AINFTs__NotEnoughFunds();
error AINFTs__TransactionNotSent();
error AINFTs__MintingIsPaused();
error AINFTs__NftToMintLowerThanOne();

contract AINFTs is ERC721Enumerable, Ownable {
    using Strings for uint256;
    string public baseURI;
    string public baseExtension = ".json";
    bool public paused = false;
    uint256 public fee;
    mapping(uint256 => string) public tokenIds;

    constructor() ERC721("GenerateNFT.com Collection", "GNFT") {}

    function mint(
        address _to,
        string memory _baseUri,
        string[] memory _fileNames,
        string[] memory _fileIds
    ) public payable {
        uint256 supply = totalSupply();
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
        for (uint256 i = 1; i <= _fileNames.length; i++) {
            tokenIds[supply + i] = _fileIds[i];
            _safeMint(_to, supply + i);
        }
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
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
