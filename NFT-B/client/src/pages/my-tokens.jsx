import React ,{ useState, useEffect } from "react";
import { Card, Col, message, Row } from 'antd';
import 'antd/dist/antd.css';

const Mytokens = ({
  NFTs,
  accounts_addr,
  contract
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

    return (
      <div className="site-card-wrapper">
        {NFTs.map((NFT) => {
          if(accounts_addr === NFT.currentOwner)
                return (
                  
                      <Card title={NFT.tokencount} bordered={false}>
                            tokenID: {NFT.tokenID}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            currentOwner: {NFT.currentOwner}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            previousOwner: {NFT.previousOwner}
                            &nbsp;&nbsp;
                            get-price: {NFT.price}
                            &nbsp;&nbsp;
                           
                            <button
                                className="btn btn-outline-success"
                                onClick={ () => {
                                    let minBid = prompt("Please enter the minBid");
                                    let duration = prompt("Please enter the duration");
                                    contract.methods.beginAuction(NFT.tokencount, minBid, duration).send({ from: accounts_addr, gas: '3000000'}).on("confirmation", () => {
                                    window.location.reload();
                                });
                                }}
                            >
                                Sale
                            </button>
                            &nbsp;&nbsp;
                            <button
                          className="btn btn-outline-success"
                          onClick={ () => {
                            contract.methods.endAuction(NFT.tokencount).send({ from: accounts_addr, gas: '3000000'}).on("confirmation", () => {
                              window.location.reload();
                            });
                          }}
                          >
                            End
                          </button>
                      </Card>
                   
                )
            })}
      
    </div>
  );
}

export default Mytokens;