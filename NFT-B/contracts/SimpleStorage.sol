// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../client/node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

// NFTs smart contract inherits ERC721
contract SimpleStorage is ERC721{
    string public collectionName;
    string public collectionNameSymbol;
   
    uint256 public totalNFT;

    struct NFT {
        uint256 tokencount;
        string tokenID;
        address payable currentOwner;
        address payable previousOwner;
        uint256 price;
        bool onSale;
    }

    struct Auction {
        uint256 minBid;
        uint256 maxBid;
        address payable highestBidder;
        uint startTime;
        uint endTime;
        bool isEnd;
        bool isClaimed;
    }

    mapping(uint256 => NFT) public countOfNFT;
    mapping(uint256 => Auction) public AuctionsOfNFT;
    mapping(string => bool) public tokenNameExists;

    // initialize contract while deployment with contract's collection name and token
    constructor() ERC721("NFT Collection", "NFT") {
        collectionName = name();
        collectionNameSymbol = symbol();
    }

    // mint a new NFT
    function mintNFT(string memory _name, uint256 _price)  public  {
        totalNFT++;
        require(!_exists(totalNFT));
        require(!tokenNameExists[_name]);
    
        _safeMint(msg.sender, totalNFT);
        tokenNameExists[_name] = true;
    
        NFT memory newNFT = NFT(
            totalNFT,
            _name,
            payable(msg.sender),
            payable(address(0)),
            _price,
            false
        );
        countOfNFT[totalNFT] = newNFT;
    }
  
  
    // get total number of tokens of an address
    function getTotal(address _owner) public view returns(uint256) {
        uint256 totalNumberOfTokensOwned = balanceOf(_owner);
        return totalNumberOfTokensOwned;
    }
  
    function beginAuction(uint256 _tokencount, uint256 _minBid, uint lastTime)  public returns (bool success) {
        require(_exists(_tokencount));
        uint _startTime = block.timestamp;
        uint _endTime = block.timestamp + lastTime;
        NFT memory nft = countOfNFT[_tokencount];
        nft.onSale = true;
        Auction memory newAuction = Auction(
            _minBid,
            _minBid,
            payable(msg.sender),
            _startTime,
            _endTime,
            false,
            false
        );

        countOfNFT[_tokencount] = nft;
        AuctionsOfNFT[_tokencount] = newAuction;
        return true;
    }

    function Bid(uint256 _tokencount, uint256 newBid)  public returns (bool success) {
        Auction memory auction = AuctionsOfNFT[_tokencount];
        require(block.timestamp <= auction.endTime);
        require(_exists(_tokencount));
        if (newBid <= auction.maxBid) revert();

        NFT memory nft = countOfNFT[_tokencount];
        nft.price = newBid;
        countOfNFT[_tokencount] = nft;
        
        auction.highestBidder = payable(msg.sender);
        auction.maxBid = newBid;
        AuctionsOfNFT[_tokencount] = auction;
        return true;
    }

    function endAuction(uint256 _tokencount)  public returns (bool success) {
        require(_exists(_tokencount));
        Auction memory auction = AuctionsOfNFT[_tokencount];
        require(block.timestamp >= auction.endTime, "Auction not yet ended.");

        auction.isEnd = true;

        AuctionsOfNFT[_tokencount] = auction;
        return true;
    }

    function claimNFT(uint256 _tokencount) public returns (bool success) {
        Auction memory auction = AuctionsOfNFT[_tokencount];
        require(_exists(_tokencount));
        require(auction.isEnd);
        require(!auction.isClaimed);
        require(msg.sender == auction.highestBidder);
        
        address tokenOwner = ownerOf(_tokencount);
        
        require(tokenOwner != address(0));

        NFT memory nft = countOfNFT[_tokencount];
       
        nft.previousOwner = nft.currentOwner;
        nft.currentOwner = payable(msg.sender);
        nft.price = auction.maxBid;
        nft.onSale = false;
        countOfNFT[_tokencount] = nft;
        return true;
    }

    function getTime() public view returns (uint) {
        return block.timestamp;
    }
}
