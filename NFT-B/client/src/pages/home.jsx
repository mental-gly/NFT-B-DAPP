import React from 'react';

const Home  = ({ accounts_addr, accounts_balance }) =>  {
        return (
        <div>
          <div className="jumbotron">

              <br/>
            <h2 className="lead" style={{textAlign:'center'}}>
              Welcome to <i style={{color:'orange'}}>NFT BIDDER DAPP！ :) </i>
              
            </h2>
            <h2 style={{textAlign:'center'}}>
            This is an NFT Bidder DAPP where you can create your own unique NFTs and bid NFTs in the global market.
            </h2>
            <br/>
            
            <br/>
              <h1 style={{textAlign:'center'}}>
                Please log in the Metamask and connect it to this website. 
                </h1>
              <h1 style={{textAlign:'center'}}>
                Below is your accout infomation.
                </h1>
            <h1 className="lead" style={{color:'orange',textAlign:'center'}}>Account Address : </h1>
            <h4 style={{ textAlign: 'center' }}>{accounts_addr}</h4>
  
            <h1 className="lead" style={{color:'orange',textAlign:'center'}}>Account Balance : </h1>
            <h4 style={{ textAlign: 'center' }}>{accounts_balance} Wei</h4>
  
          </div>
        </div>
      );
    };


export default Home;