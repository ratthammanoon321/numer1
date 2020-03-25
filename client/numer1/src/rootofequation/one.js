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


class one extends Component{

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
              Eq:null,
              xinitial:null,
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
          
          axios.get('http://localhost:8080/one.php')
          // axios.get('http://localhost/numer/server/one.php')

          .then(res=>{
              console.log(res.data);
              let item =[];
              let optionsArr = [];
              res.data.map(dataMap=>{
                  let optionsObj = {};
                  if(dataMap.t_type==="one")
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
    
    err = (xiw1, xi) => {
        var er = ((Math.abs((xiw1 - xi) / xiw1))*100)/100;
        return er;
    }
    
    getValue = () => {
    
        const {Eq,xinitial,fix} = this.state;
        var xiinmain = parseFloat(xinitial);  
        let tableArrData = [];
        console.log(Eq,xiinmain);
        var i=0;
        var xiw1inmain;
        var fixerrorValue = parseFloat(fix);
        var errorValue=1;
        
        while(errorValue >= fixerrorValue)
        {
          xiw1inmain = this.Equet(Eq,xiinmain);
          errorValue= this.err(xiw1inmain,xiinmain);
  
          let tableObjData = {};
          tableObjData.index = i;
          tableObjData.xiinmain = xiinmain;
          tableObjData.xiw1inmain = xiw1inmain;
          tableObjData.errorValue = errorValue;
          tableArrData.push(tableObjData);
          console.log("XMVALUE = ", xiw1inmain);
          console.log("I value =", i);
          console.log("This is errorvalue = ", errorValue);
          console.log("This is fixvalueerror = ", fixerrorValue); 
          xiinmain=xiw1inmain;       
          i++;
        }
        this.setState({
          dataTable:tableArrData,
          result:xiw1inmain
        })
    }
  
    EquationOnePoint = () =>{
      const formData = new FormData();
      formData.append("n_name",this.state.Eq);
      formData.append("t_type","OnePoint");
      formData.append("_dif","");
      const config = {
        headers: {
            "content-type": "multipart/form-data"
            }
        };
      // axios.post('http://localhost:8080/add_equation.php',formData,config)
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
          title: 'Xinitial',
          dataIndex: 'xiinmain',
          key: 'xiinmain',
        },
        {
          title: 'XValue',
          dataIndex: 'xiw1inmain',
          key: 'xiw1inmain',
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
          <center><h5>This is Result of One-Point Iteration : {this.state.result}</h5></center><br/>
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
  
      onChangeSwitch = (checked) => {
        console.log(checked)
        this.setState({
          SwitchOpen:checked
        })
      }
    
      showInput = () =>{
        if(this.state.SwitchOpen){
          return <div>
          <center><Input placeholder="Input Equations" style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({Eq:e.target.value})}/></center>
          <Button onClick={this.EquationBisection} style={{marginBottom:"0.5%", backgroundColor:"lightblue"}}>Add Equation</Button>
        </div>
        }
        else{
          return <center><Cascader
          options={this.state.options}
          expandTrigger="hover"
          displayRender={this.displayRender}
          onChange={this.onChange}
          style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}}
          /></center>
        }
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
                    <center><h3>ONEPOINT</h3></center> 
                  </div>
                  <di>
              {this.showInput()}
            </di> 
                            {/* <div>                   
                         <center>   <Cascader
              options={this.state.options}
              expandTrigger="hover"
              displayRender={this.displayRender}
              onChange={this.onChange}
            /> </center>
            </div> */}
            <br></br>
            <div>
            <center><Input placeholder="Input Equations" style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({Eq:e.target.value})}/>
            <Button onClick={this.EquationOnePoint}>ADDDATA</Button></center>
            </div>
            {/* <Input placeholder="Input Equations" style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({Eq:e.target.value})}/> */}
                           <div> <Input placeholder="x" style={{width:300 ,  margin:20,marginLeft:400}} onChange={e=>this.setState({xinitial:e.target.value})}/></div>
                           <div> <Input placeholder="error" style={{width:300 ,  margin:20,marginLeft:400}} onChange={e=>this.setState({fix:e.target.value})}/></div>
                           
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
export default one;

