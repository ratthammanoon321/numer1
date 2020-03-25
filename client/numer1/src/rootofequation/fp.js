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


class fp extends Component{

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
              options:[],
              Eq :null,
              xlValue:null,
              xrValue :null,
              result :null,
              fix:null

          }
        }

        myFunction =() => {
          alert("go!");
        }
        componentDidMount()
    {
        
        axios.get('http://localhost:8080/fp.php')
        // axios.get('http://localhost/numer/server/fp.php')
        .then(res=>{
            console.log(res.data);
            let optionsArr = [];
            
            res.data.map(dataMap=>{
                let optionsObj = {};
                if(dataMap.t_type === "falsep")
                {
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
        .catch(err=>{
          throw err;
        })
    }
            


    Equet = (EqForSloveFuntion,xvalueforSlove)=>{
      const NodeEqua = parse(EqForSloveFuntion); 
      const Equa = NodeEqua.compile();
      let scope = {
        x:xvalueforSlove
      }
      return Equa.eval(scope);      
    }
  
  err = (xmold, xmnew)=>{
      var er = ((Math.abs((xmnew - xmold) / xmnew)) * 100) / 100;
      return er;
  }
    getValue = ()=>{
  
      const {Eq,xlValue,xrValue,fix} = this.state;    
      var xl = parseFloat(xlValue);
      var xr = parseFloat(xrValue);
      let tableArrData = [];
      console.log(Eq,xl,xr);
      var fxl = this.Equet(Eq,xl);
      var fxr = this.Equet(Eq,xr);
      var xm = xr - ((fxr * (xl - xr)) / (fxl - fxr))
      console.log(this.state);
      var xmArr = new Array();
      var fxmArr = new Array();
      var xmoldinmain = xm;
      xmArr[0] = xm;
      
      var fxm;
      var i = 0;
      var fixvalueerror = parseFloat(fix);
      var errorvalue = 1;
      while (errorvalue >= fixvalueerror) {
          
          if (i != 0) {
            fxl = this.Equet(Eq,xl);
            fxr = this.Equet(Eq,xr);
            xm = xr - ((fxr * (xl - xr)) / (fxl - fxr))
          }
          fxm = this.Equet(Eq,xm);
          if ((fxm * fxl) > 0) {
            xl=xm    
          }
          else {
              xr=xm
          }
          if (i != 0) {
              errorvalue = this.err(xmoldinmain, xm);
              xmoldinmain = xm;
              console.log("If Work");
          }
          let tableObjData = {};
          tableObjData.index = i;
          tableObjData.xl = xl;
          tableObjData.xr = xr;
          tableObjData.xm = xm;
          tableObjData.errorvalue = errorvalue;
          tableArrData.push(tableObjData);
          console.log("XMVALUE = ", xm);
          console.log("I value =", i);
          console.log("This is errorvalue = ", errorvalue);
          console.log("This is fixvalueerror = ", fixvalueerror);
          xmArr[i] = xm;
          fxmArr[i] = fxm;
          i++;
        }
        this.setState({
          dataTable:tableArrData,
          result:xm
        })
        // this.equationfp()
      }
      equationfp = () =>{
        const formData = new FormData();
        formData.append("n_name",this.state.Eq);
        formData.append("t_type","falsep");
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
      showResult=()=>{
        const columns = [
          {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
          },
          {
            title: 'XL',
            dataIndex: 'xl',
            key: 'xl',
          },
          {
            title: 'XR',
            dataIndex: 'xr',
            key: 'xr',
          },
          {
            title: 'XM',
            dataIndex: 'xm',
            key: 'xm',
          },
          {
            title: 'Error',
            dataIndex: 'errorvalue',
            key: 'errorvalue',
          },
        ];
        if(this.state.result!==null)
        {
          return <div>
           <center> <h5>This is Result of False-Position : {this.state.result}</h5></center><br/>
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
    displayRender = (label) => {
      return label[label.length - 1];
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
                   <center><h3>FALSE POSITION</h3></center> 
                 </div>
                           
                 <center>  <Cascader
              options={this.state.options}
              expandTrigger="hover"
              displayRender={this.displayRender}
              onChange={this.onChange}
            /> </center>
            <br></br>
            <div>
            <center><Input placeholder="Input Equations" style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({Eq:e.target.value})}/>
            <Button onClick={this.equationfp}>ADDDATA</Button></center>
            </div>
                          <div>  <Input placeholder="          -----XL-----" style={{width:200 , margin:20, marginLeft:400}} onChange={e=>this.setState({xlValue:e.target.value})}/></div>
                            <Input placeholder="            -----XR-----" style={{width:200 , margin:20, marginLeft:400}} onChange={e=>this.setState({xrValue:e.target.value})}/>
                            <Input placeholder="            -----error-----" style={{width:200 , margin:20, marginLeft:400}} onChange={e=>this.setState({fix:e.target.value})}/>
                            <p>
            <center><Button onClick={this.getValue}>Submit</Button></center>
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
export default fp;

