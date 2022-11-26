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
error AINFT__NoTokensAdded();

contract AINFTs is ERC721Enumerable, Ownable {
    struct TokenInfo {
        IERC20 paytoken;
        uint256 costvalue;
        string name;
    }

    TokenInfo[] public AllowedCrypto;

    using Strings for uint256;
    string public baseURI;
    string public baseExtension = ".json";
    uint256 public maxSupply = 1000;
    uint256 public maxMintAmount = 5;
    bool public paused = false;
    uint256 public currenciesAdded = 0;
    uint256 public fee;

    constructor() ERC721("AI Generated NFT Collection", "AINFT") {}

    function addCurrency(
        IERC20 _paytoken,
        uint256 _costvalue,
        string memory _name
    ) public onlyOwner {
        AllowedCrypto.push(
            TokenInfo({paytoken: _paytoken, costvalue: _costvalue, name: _name})
        );
        currenciesAdded += 1;
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
                msg.value >= fee * _mintAmount,
                "Not enough balance to complete transaction."
            );
        }

        for (uint256 i = 1; i <= _mintAmount; i++) {
            paytoken.transferFrom(msg.sender, address(this), cost);
            _safeMint(_to, supply + i);
        }
    }

    function walletOfOwner(
        address _owner
    ) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
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

    function getApprovedTokenInfo()
        public
        view
        returns (IERC20[] memory, uint256[] memory, string[] memory)
    {
        IERC20[] memory paytoken = new IERC20[](currenciesAdded);
        uint256[] memory costvalue = new uint256[](currenciesAdded);
        string[] memory name = new string[](currenciesAdded);

        if (currenciesAdded < 0) {
            revert AINFT__NoTokensAdded();
        }

        for (uint i = 0; i < currenciesAdded; i++) {
            TokenInfo storage tokens = AllowedCrypto[i];
            paytoken[i] = tokens.paytoken;
            costvalue[i] = tokens.costvalue;
            name[i] = tokens.name;
        }

        return (paytoken, costvalue, name);
    }

    // only owner
    function setFee(uint256 _fee) public onlyOwner {
        fee = _fee;
    }

    function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
        maxMintAmount = _newmaxMintAmount;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(
        string memory _newBaseExtension
    ) public onlyOwner {
        baseExtension = _newBaseExtension;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function withdrawToken(uint256 _pid) public payable onlyOwner {
        TokenInfo storage tokens = AllowedCrypto[_pid];
        IERC20 paytoken;
        paytoken = tokens.paytoken;
        paytoken.transfer(msg.sender, paytoken.balanceOf(address(this)));
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
