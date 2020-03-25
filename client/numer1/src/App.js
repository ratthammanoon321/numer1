import React, { Component } from 'react'
import Home from './Home';
import Bisection from './rootofequation/Bisection'
import { Route,Switch } from "react-router-dom";
import fp from './rootofequation/fp'
import secant from'./rootofequation/secant';
// import tt from'./rootofequation/tt';
import newton from'./rootofequation/newton';
import one from'./rootofequation/one';
export default class App extends Component {
  render() {
    return (
      <div className="App">
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/Home" component={Home}/>
          <Route exact path="/Bisection" component={Bisection}/>
          <Route exact path="/fp" component={fp}/>
          <Route exact path="/secant" component={secant}/>
          {/* <Route exact path="/tt" component={tt}/> */}
          <Route exact path="/newton" component={newton}/>
          <Route exact path="/one" component={one}/>
        </Switch>
      </React.Fragment>
    </div>
    )
  }
}
