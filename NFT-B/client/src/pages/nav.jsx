import React from "react";
import 'antd/dist/antd.css';
import { Layout, Menu} from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import Create from "./create";
import Mytokens from "./my-tokens";
import Globalmarket from "./globalmarket";
import Home from "./home";



const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      collapsed: false,
      selected: "1"
    };
  }
  

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleClick(key){
    switch(key)
    {
      case "/pages/home":return 
    }
    console.log('Click happened');
  }

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={'1'} mode="inline" onSelect ={(item)=>{
            this.setState({
              selected: item.key,
            })
          }}>
          <Menu.Item  key="0" icon={<TeamOutlined />}>
          N a v i g a t i o n
            </Menu.Item>
            <p style={{textAlign:"center"}}> ------ </p>
            <Menu.Item key="1"  icon={<FileOutlined />}>
                Home
            </Menu.Item>
            <Menu.Item key="2" icon={<PieChartOutlined />}>
                Global Market
            </Menu.Item>
            <SubMenu key="1" icon={<UserOutlined />} title="My Tokens">
              <Menu.Item key="4">
                Create New
              </Menu.Item>
              <Menu.Item key="5">
                Repository
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0,color: "white"}} >
            · N F T - B I D D E R - D A P P ·
            </Header>
          <Content>
              {(this.state.selected=='1') && <Home
              accounts_addr={this.props.accounts_addr}
              accounts_balance={this.props.accounts_balance}/>}

              {(this.state.selected=='2') && <Globalmarket
              accounts_addr={this.props.accounts_addr}
              accounts_balance={this.props.accounts_balance}
              contract={this.props.contract}
              NFTCount={this.props.NFTCount}
              NFTs={this.props.NFTs}
              Auctions={this.props.Auctions}/>}

              {(this.state.selected=='4') && <Create
              accounts_addr={this.props.accounts_addr}
            accounts_balance={this.props.accounts_balance}
            contract={this.props.contract}
            NFTs={this.props.NFTs}/>}

              {(this.state.selected=='5') && <Mytokens
              accounts_addr={this.props.accounts_addr}
              accounts_balance={this.props.accounts_balance}
              contract={this.props.contract}
              NFTCount={this.props.NFTCount}
              NFTs={this.props.NFTs}
              Auctions={this.props.Auctions}/>}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Created by GLY @2021.11</Footer>
        </Layout>
      </Layout>

    );
  }
}

export default Nav;