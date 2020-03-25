import React,{Component} from "react";
import { Layout, Menu, Breadcrumb,Button,Table } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
//import home1 from './home1.css';
import {Link} from "react-router-dom"
import { Input ,Cascader} from 'antd';
import {parse} from "mathjs";
import axios from 'axios';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class secant extends Component{

    state = {
        collapsed: false,
      };
    
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };

      constructor(props)
      {
          super(props);
          this.state={
              proptions:[],
              Eq:null,
              Xinitial:null,
              Xinitialminus1:null,
              result:null,
              dataTable:[],
              fix:null
          }
      }
      myFunction =() => {
        alert("go!");
      }
      componentDidMount()
      {
          
           axios.get('http://localhost:8080/secant.php')
          // axios.get('http://localhost/numer/server/secant.php')

          .then(res=>{
              console.log(res.data);
              let item =[];
              let optionsArr = [];
              res.data.map(dataMap=>{
                  let optionsObj = {};
                  if(dataMap.t_type === "secant")
                  {
                      item = item.concat(dataMap.n_name);
                      optionsObj.value = dataMap.n_name;
                      optionsObj.label = dataMap.n_name;
                      optionsArr.push(optionsObj);
                      console.log(optionsObj);
                  }
              })
              this.setState({
                  options:optionsArr
              })
          })
      }
  
      Equet = (EqForSloveFuntion,xvalueforSlove) => {
     
        const NodeEqua = parse(EqForSloveFuntion); 
        const Equa = NodeEqua.compile();     
        let scope = {
            x:xvalueforSlove
        }
        return Equa.eval(scope);
         
    }
    
    err = (xmold, xmnew) => {
        var er = ((Math.abs((xmnew - xmold) / xmnew)) * 100) ;
        return er;
    }
    
    getValue = () => {
        const {Eq,Xinitial,Xinitialminus1,fix} = this.state;
        var xi_inmain = parseFloat(Xinitial);
        var xi_minus1_inmain = parseFloat(Xinitialminus1);
        var xi_plus1;
        var fpx_inmainValue;
        let tableArrData = [];
        var errorValue = 1;
        var fixerrorValue =parseFloat(fix);
        var i=0;
        while(errorValue>=fixerrorValue)
        {
          xi_plus1=xi_inmain-((this.Equet(Eq,xi_inmain)*(xi_minus1_inmain-xi_inmain))/(this.Equet(Eq,xi_minus1_inmain)-this.Equet(Eq,xi_inmain)));
          errorValue=this.err(xi_plus1,xi_inmain);
  
  
            let tableObjData = {};
            tableObjData.index = i;
            tableObjData.xi_plus1 = xi_plus1;
            tableObjData.errorValue = errorValue;
            tableArrData.push(tableObjData);
            // var row = table.insertRow(i);
    
            // var cel0 = row.insertCell(0);
            // var cel1 = row.insertCell(1);
            // var cel2 = row.insertCell(2);
            
            
    
            // cel0.innerHTML = i;
            // cel1.innerHTML = xi_plus1;
            // cel2.innerHTML = errorValue;
            
            
    
            console.log("Secant XiVALUE = ", xi_plus1);
            console.log("This is errorvalue = ", errorValue);
            console.log("This is fixvalueerror = ", fixerrorValue);
            xi_inmain=xi_plus1;
            i++;
        }
        this.setState({
          dataTable:tableArrData,
          result:xi_plus1
        })
    }
  
  
    showResult=()=>{
      const columns = [
        {
          title: 'No',
          dataIndex: 'index',
          key: 'index',
        },
        {
          title: 'X',
          dataIndex: 'xi_plus1',
          key: 'xi_plus1',
        },
        {
          title: 'Error',
          dataIndex: 'errorValue',
          key: 'errorValue',
        },
      ];
      if(this.state.result!==null)
      {
        return <div>
         <center> <h5>    This is Result of secant : {this.state.result}</h5></center><br/>
          <Table dataSource={this.state.dataTable} columns={columns} rowKey="Index" style={{marginLeft:"5%" , marginRight:"5%" , background:"lightblue" }} size="middle"/>
        </div>
  
      }
    }
  
      onChange = (value) => {
        console.log(value[0]);
        this.setState({
          Eq:value[0]
        })
      }
      
      // Just show the latest item.
      displayRender = (label) => {
        return label[label.length - 1];
      }
      Equationsecant = () =>{
        const formData = new FormData();
        formData.append("n_name",this.state.Eq);
        formData.append("t_type","secant");
        formData.append("_dif","");
        const config = {
          headers: {
              "content-type": "multipart/form-data"
              }
          };
          axios.post('http://localhost:8080/add.php',formData,config)
        .then(res=>{
          console.log(res);
        })
        .catch(err=>{
           throw err 
        })
        this.myFunction()
      }
      render() {
        return (
          <div >
            <div class="box1">
            <h1 style={{marginLeft:600,marginTop:100,height:50}}>NUMERICAL</h1>
           
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
              <Header className="site-layout-background" style={{ padding: 0 }}/>
              <Content style={{ margin: '0 16px' }}>
              
                <div className="box" style={{ padding: 24, minHeight: 500 }}>
                 
                  <div >
                    <center><h3>SECANT</h3></center> 
                  </div>
                               
                            <div>                   
                         <center>   <Cascader
              options={this.state.options}
              expandTrigger="hover"
              displayRender={this.displayRender}
              onChange={this.onChange}
            /> </center>
            </div>

            <br></br>
            <div>
            <center><Input placeholder="Input Equations" style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({Eq:e.target.value})}/>
            <Button onClick={this.Equationsecant}>ADDDATA</Button></center>
            </div>
           
                           <div> <Input placeholder="x" style={{width:300 ,  margin:20,marginLeft:400}} onChange={e=>this.setState({Xinitial:e.target.value})}/></div>
                            <Input placeholder="l" style={{width:300 ,margin:20,marginLeft:400}} onChange={e=>this.setState({Xinitialminus1:e.target.value})}/>
                            <Input placeholder="error" style={{width:300 ,margin:20,marginLeft:400}} onChange={e=>this.setState({fix:e.target.value})}/>
                            <p>
           <center> <Button onClick={this.getValue}>Submit</Button> </center>
                         </p>
          <br/>
          {this.showResult()}
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>ratthammanoon daengumpol</Footer>
            </Layout>
          </Layout>
          </div>
        );
      }
}
export default secant;

