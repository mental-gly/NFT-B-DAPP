# NFT-B 去中心化拍卖DAPP

- [Bootstrap 4](https://getbootstrap.com/) 
- [React.js](https://reactjs.org/) 
- [web3.js](https://web3js.readthedocs.io/en/v1.3.4/) 
- [Truffle](https://www.trufflesuite.com/truffle) 
- [Ganache](https://www.trufflesuite.com/ganache) 

### How to run

#### Install truffle

```
npm install -g truffle
```

#### Install Ganache and Run

```
npm i ganache
```

#### Open terminal window

```
cd NFT-B
```

#### Compile smart contract

```
truffle compile
```

#### Deploy smart contract to Ganache

```
truffle migrate
```

#### Start DApp

```
cd client && npm run start
```

- Open metamask browser wallet and connect network to Localhost 7545.
- Import accounts from ganache into the metamask browser wallet to make transactions on the DApp.