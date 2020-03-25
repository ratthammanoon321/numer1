import React,{Component} from "react";
import { Layout, Menu, Breadcrumb,Button,Table,Switch} from 'antd';
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


class newton extends Component{

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
            diffs:[],
            Eq:null,
            EqDiff:null,
            Xinitial:null,
            result:null,
            dataTable:[],
            checked:false,
            eqtotal:[],
            fix:null
        }
    }
    myFunction =() => {
      alert("go!");
    }
    componentDidMount()
    {
        
         axios.get('http://localhost:8080/newton.php')
        // axios.get('http://localhost/numer/server/newton.php')
        .then(res=>{
            console.log(res.data);
            this.setState({
              eqtotal:res.data
            })
            let item =[];
            let optionsArr = [];
            let optionsDiffArr = [];
            res.data.map(dataMap=>{
              let optionsObj = {};
              let optionsDiff = {};
                if(dataMap.t_type=="newton")
                {
                    item = item.concat(dataMap.n_name);
                    optionsObj.value = dataMap.n_name;
                    optionsObj.label = dataMap.n_name;
                    optionsDiff.value = dataMap._dif;
                    optionsDiff.label = dataMap._dif;
                    optionsArr.push(optionsObj);
                    optionsDiffArr.push(optionsDiff);
                    console.log(optionsObj);
                    console.log(optionsDiff);
                }
            })
            this.setState({
                options:optionsArr,
                diffs:optionsDiffArr
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
      var er = ((Math.abs((xmnew - xmold) / xmnew)) * 100) / 100;
      return er;
  }
  getValue = () => {
      // var Eq = document.getElementById("InputEquation").value;
      // var EqDiff = document.getElementById("InputEquationDiff").value;
      const {Eq,EqDiff,Xinitial,fix} = this.state;
      console.log(Xinitial);
      var xi_inmain  = parseFloat(Xinitial); 
      let tableArrData = [];
      // var table = document.getElementById("InformationTable").getElementsByTagName('tbody')[0];
      var xiplus1_inmain;
      var fxi;
      var fxpi;
      var fixerrorValue = parseFloat(fix);
      var errorValue = 1;
      var i=0;
  while(errorValue>=fixerrorValue)
  {
      fxi=this.Equet(Eq,xi_inmain);
      fxpi=this.Equet(EqDiff,xi_inmain);
      xiplus1_inmain=xi_inmain-(fxi/fxpi);
      errorValue = this.err(xiplus1_inmain,xi_inmain);
      let tableObjData = {};
      tableObjData.index = i;
      tableObjData.xi_inmain = xi_inmain;
      tableObjData.errorValue = errorValue;
      tableArrData.push(tableObjData);
      console.log(xi_inmain,fxi,fxpi);
      console.log("XMVALUE = ", xiplus1_inmain);
      console.log("This is errorvalue = ", errorValue);
      console.log("This is fixvalueerror = ", fixerrorValue);
      xi_inmain=xiplus1_inmain;
      i++;
      }
      this.setState({
        dataTable:tableArrData,
        result:xiplus1_inmain
      })
  }   
  EquationNewton = () =>{
    const formData = new FormData();
    formData.append("n_name",this.state.Eq);
    formData.append("t_type","Newton");
    formData.append("_dif",this.state.EqDiff);
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
        title: 'X',
        dataIndex: 'xi_inmain',
        key: 'xi_inmain',
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
        <center><h5>This is Result of NewtonRaphson is : {this.state.result}</h5></center><br/>
        <Table dataSource={this.state.dataTable} columns={columns} rowKey="Index" style={{marginLeft:"5%" , marginRight:"5%" , background:"lightblue" }} size="middle"/>
      </div>
    }
  }
    onChange = (value) => {// Function
      console.log(value[0]);
      let diff;
      if(value[0]!==undefined){
        this.state.eqtotal.map(eqt=>{
          if(eqt.n_name===value[0]){
            diff=eqt._dif
          }
        })
        this.setState({
          Eq:value[0],
          checked:true,
          EqDiff:diff
  
        })
      }else{
        this.setState({
          Eq:value[0],
          checked:false
  
        })
      }
      
    }
    displayRender = (label) => {
      return label[label.length - 1];
    }
    onChange2 = (value) => {//Funtion Diff
      console.log(value[0]);
      this.setState({
        EqDiff:value[0]
      })
    }
    displayRender2 = (label) => {
      return label[label.length - 1];
    }
    onChangeSwitch1 = (checked) => {
      console.log(checked)
      this.setState({
        SwitchOpen:checked
      })
    }
    onChangeSwitch = (checked) => {
      console.log(checked)
      this.setState({
        SwitchOpen:checked
      })
    }
    showInput = () =>{
        return <center><p><Cascader
        options={this.state.options}
        expandTrigger="hover"
        displayRender={this.displayRender}
        onChange={this.onChange}
        style={{width:"13em" , marginLeft:"20%" , marginRight:"5%" , marginBottom:"0.5%"}}
        /></p></center>
      
    }
    showInput2 = () =>{
       if (this.state.checked){
       
        
          return <center>
            <Input placeholder="Input Equations" style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}} defaultValue={this.state.EqDiff} onChange={e=>this.setState({EqDiff:e.target.value})}/>
          </center>
          // return <center><p><Cascader
          // options={this.state.diffs}
          // expandTrigger="hover"
          // displayRender={this.displayRender2}
          // onChange={this.onChange2}
          // defaultValue={['2x']}
          // style={{width:"13aem" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}}
          // /></p></center>
        
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
                    <center><h3>NEWTON</h3></center> 
                  </div>
                  {this.showInput()}
{/*                                
                            <div>                   
                         <center>   <Cascader
              options={this.state.options}
              
              expandTrigger="hover"
              displayRender={this.displayRender}
              onChange={this.onChange}
            /> </center>

            </div> */}
            {/* <div>                   
                         <center>   <Cascader
              options={this.state.options}
              
              expandTrigger="hover"
              displayRender={this.displayRender2}
              onChange={this.onChange2}
              
            /> </center>
            
            </div> */}
             {this.showInput2()}
            <br></br>
            <div>
            <center><Input placeholder="Input Equations" style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({Eq:e.target.value})}/></center> 
            <center><Input placeholder="Input diff" style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({EqDiff:e.target.value})}/></center>
           <center><Button onClick={this.EquationNewton}>ADDDATA</Button></center>
           </div>
                           <div> <Input placeholder="x" style={{width:300 ,  margin:20,marginLeft:400}} onChange={e=>this.setState({Xinitial:e.target.value})}/>
                           <Input placeholder="error" style={{width:300 ,  margin:20,marginLeft:400}} onChange={e=>this.setState({fix:e.target.value})}/>
                           </div>
                           
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
export default newton;

