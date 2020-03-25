import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, AutoComplete } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import home1 from './home1.css';
import {Link} from "react-router-dom"



const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export default class Home extends Component {
    state = {
        collapsed: false,
      };
    
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };
    render() {
      return (
        <div >
        <div >
            <img src="./pictures/ga.jpg" alt="" style={{  width:1400,height:300 }} ></img>
           
        <center><h1>NUMERICAL</h1></center>
       
        
        
        </div>
        
       
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
           
             <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
             
            <Menu.Item key="2"><Link to="/Home"/>
                <DesktopOutlined />
                <span>Home</span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <UserOutlined />
                    <span>ROOT OF EQUATION</span>
                  </span>
                }
              >
               <Menu.Item key="3"><Link to="/Bisection"/>BISECTION</Menu.Item> 
                  <Menu.Item key="4"><Link to="/fp"/>FALSE POSITION</Menu.Item>
                  <Menu.Item key="5"><Link to="/one"/>one</Menu.Item>
               
                  <Menu.Item key="7"><Link to="/newton"/>NEWTON RAPHSON</Menu.Item>
                  <Menu.Item key="8"><Link to="/secant"/>secant</Menu.Item>
              </SubMenu>

            
             
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
             
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <center><img src="./pictures/?Math.jpg" alt="" style={{  width:1000,height:300 }} ></img></center>

             <center><h1> WELCOME</h1></center>

              </div>
            </Content>
            
            <Footer class = "box1" style={{ textAlign: 'center' }}>
             <h4> นาย รัฐธรรมนูญ แดงอำพล </h4>
             5904062636339
              
              </Footer>
           
          </Layout>
        </Layout>
        </div>
      );
    }
  }