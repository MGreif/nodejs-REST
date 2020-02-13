import React,{Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import {MemoCard} from './components/MemoCard'
import {Header} from './components/Header'
import {Navigation} from './components/Navigation'
import {LoginDialog} from './components/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props);
    this.refresh = this.refresh.bind(this);
    this.state = {
      loggedIn:false
    }
  }

  refresh(){
    this.forceUpdate()
  }

  onLogin = (userData) => {
    this.setState({...this.state,loggedIn:true,user:{...userData}})
  }

  render() {

    if(!this.state.loggedIn) return <LoginDialog onLogin={this.onLogin}/>


    return (
      <Fragment>
        <Header title="HomePage"/>
        <Navigation onClick={this.refresh}/>

      </Fragment>
    );
  }
}

export default App;
