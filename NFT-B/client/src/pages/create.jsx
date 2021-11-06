import React from 'react';
import 'antd/dist/antd.css';
import { Input} from 'antd';

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tokenID:"",
        }
    }
    onSubmit= async(event) => {
        event.preventDefault();
        console.log(this.props.contract);
        this.props.contract.methods.mintNFT(this.state.tokenID, 0).send({from: this.props.accounts_addr, gas: '300300'});
        console.log(this.props.NFTs);
    }

    render() {
        return (
            <div>
                <div>
                    <h2 className="display-5" style={{textAlign:"center"}}>Create an NFT for Free !</h2>
                </div>
                <div className="p-4 mt-1 border">
                    <form onSubmit={this.onSubmit}>
                        <Input placeholder="Please enter the NFT's ID which can not be DUPLICATE!" 
                        onChange={(e) =>
                            this.setState({tokenID: e.target.value })
                          }/>
                        <br/>
                        <br/>
                        <button type="submit" style={{marginLeft:"600px"}}>Submit and Create </button>
                    </form>
                </div>
            </div>
        )
    };
}

export default Create;