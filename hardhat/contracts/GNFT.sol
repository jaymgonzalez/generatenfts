// SPDX-License-Identifier: MIT LICENSE

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

pragma solidity ^0.8.0;

error GNFT__NotEnoughFunds(uint256 neededFunds);
error GNFT__TransactionNotSent();
error GNFT__MintingIsPaused();
error GNFT__NftToMintLowerThanOne();

contract GNFT is ERC721URIStorage, Initializable, Ownable {
    using Strings for uint256;
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 public _tokenId;
    bool public paused = false;
    uint256 public fee = 0 ether;

    constructor() ERC721("GenerateNFT.com Collection", "GNFT") {}

    function mint(
        address _to,
        string memory _baseUri,
        string[] memory _fileNames
    ) public payable {
        if (paused) {
            revert GNFT__MintingIsPaused();
        }
        if (_fileNames.length < 1) {
            revert GNFT__NftToMintLowerThanOne();
        }
        if (msg.sender != owner()) {
            uint256 totalFee = SafeMath.mul(fee, _fileNames.length);

            if (totalFee > msg.value) {
                revert GNFT__NotEnoughFunds(totalFee);
            }
        }

        for (uint256 i = 1; i <= _fileNames.length; i++) {
            _tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();

            string memory uri = string(
                abi.encodePacked("ipfs://", _baseUri, "/", _fileNames[i - 1])
            );

            _safeMint(_to, _tokenId);
            _setTokenURI(_tokenId, uri);
        }
    }

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
            revert GNFT__TransactionNotSent();
        }
    }
}
