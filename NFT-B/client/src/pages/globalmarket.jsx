import React ,{ useState, useEffect } from "react";
import { Card, Col, Row } from 'antd';
import 'antd/dist/antd.css';

const Globalmarket = ({
  NFTs,
  Auctions,
  contract,
  accounts_addr
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (NFTs.length !== 0) {
          if (NFTs[0].metaData !== undefined) {
              setLoading(loading);
          }
          else {
              setLoading(false);
          }
      }
  }, [NFTs]);
  console.log(NFTs);
    return (
      <div className="site-card-wrapper">
        {NFTs.map((NFT) => {
          console.log(Auctions[parseInt(NFT.tokencount)-1]);
          if(NFT.onSale && !Auctions[parseInt(NFT.tokencount)-1].isClaimed)
                return (
                      <Card title={NFT.tokencount} bordered={false}>
                            tokenID: {NFT.tokenID}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            currentOwner: {NFT.currentOwner}
                            &nbsp;&nbsp;
                            minBid: {Auctions[parseInt(NFT.tokencount)-1].minBid}
                            &nbsp;&nbsp;
                            maxBid: {Auctions[parseInt(NFT.tokencount)-1].maxBid}
                            &nbsp;&nbsp;
                            endTime:{Auctions[parseInt(NFT.tokencount)-1].endTime}
                            &nbsp;&nbsp;
                            <button
                                className="btn btn-outline-success"
                                onClick={ () => {
                                    let price = prompt("Please enter your price");
                                    price = parseInt(price);
                              
                                    contract.methods.Bid(NFT.tokencount,parseInt(price)).send({ from: accounts_addr, gas: '3000000'}).on("confirmation", () => {
                                    window.location.reload();
                                });
                                }}
                            >
                                Bid
                            </button>
                            &nbsp;&nbsp;
                            <button
                                className="btn btn-outline-success"
                                onClick={ () => {
                                    contract.methods.claimNFT(NFT.tokencount).send({ from: accounts_addr, gas: '30000000'}).on("confirmation", () => {
                                    window.location.reload();
                                });
                                }}
                            >
                                Claim
                            </button>
                      </Card>
                   
                )
            })}
      
    </div>
  );
}

export default Globalmarket;