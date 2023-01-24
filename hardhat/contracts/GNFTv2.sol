// SPDX-License-Identifier: MIT LICENSE

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";

// import "hardhat/console.sol";

pragma solidity ^0.8.0;

error GNFT__NotEnoughFunds(uint256 neededFunds);
error GNFT__TransactionNotSent();
// error GNFT__MintingIsPaused();
error GNFT__NftToMintLowerThanOne();

contract GNFTv2 is
    Initializable,
    ERC721Upgradeable,
    ERC721URIStorageUpgradeable,
    PausableUpgradeable,
    OwnableUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;
    using SafeMathUpgradeable for uint256;

    CountersUpgradeable.Counter private _tokenIdCounter;

    uint256 public _tokenId;
    uint256 public fee;

    function mint(
        address _to,
        string memory _baseUri,
        string[] memory _fileNames
    ) public payable whenNotPaused {
        if (_fileNames.length < 1) {
            revert GNFT__NftToMintLowerThanOne();
        }
        if (msg.sender != owner()) {
            uint256 totalFee = SafeMathUpgradeable.mul(fee, _fileNames.length);

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

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        if (!sent) {
            revert GNFT__TransactionNotSent();
        }
    }

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721Upgradeable, ERC721URIStorageUpgradeable) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    )
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
