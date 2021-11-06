import React, { Component } from "react";
import SimpleStorage from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";


import "./App.css";
import Nav from "./pages/nav";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      storageValue: 0, 
      web3: null, 
      accounts: null,
      accounts_addr: "", 
      accounts_balance: "",
      contract: null, 
      NFTCount: 0,
      NFTs: [],
      Auctions: [],
      NFTNumOfAccount: 0,
      nameIsUsed: false,
      currentTime: null,
    };
  }

  
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      const accounts_addr = accounts[0];
      const accounts_balance = await web3.eth.getBalance(accounts[0]);
      
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.setState({contract: instance});
      
      const currentTime = await this.state.contract.methods.getTime().call();
      const NFTCount = await this.state.contract.methods.totalNFT().call();
      this.setState({NFTCount});

      for (let i = 1; i <= NFTCount; i++) {
          const nft = await this.state.contract.methods.countOfNFT(i).call();
          this.setState({NFTs: [...this.state.NFTs, nft],});
          
          const auction = await this.state.contract.methods.AuctionsOfNFT(i).call();
          this.setState({Auctions: [...this.state.Auctions, auction],})
      }
      

      const NFTNumOfAccount = await this.state.contract.methods.getTotal(accounts_addr).call();
      this.setState({NFTNumOfAccount:NFTNumOfAccount});
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, accounts_addr, accounts_balance,currentTime});
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
/*
  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };
*/
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      
      <div>
        <Nav
            accounts={this.state.accounts}
            contract={this.state.contract}
            NFTCount={this.state.NFTCount}
            NFTs={this.state.NFTs}
            Auctions={this.state.Auctions}
            NFTNumOfAccount={this.state.NFTNumOfAccount}
            nameIsUsed={this.state.nameIsUsed}
            currentTime={this.state.currentTime}
            accounts_addr={this.state.accounts_addr}
            accounts_balance={this.state.accounts_balance}/>
                  
      </div>
      
    );
  }
}

export default App;
