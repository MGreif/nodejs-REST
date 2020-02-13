import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Typography from '@material-ui/core/Typography';
import { MemoCard } from './components/MemoCard'
import { Header } from './components/Header'
import { Navigation } from './components/Navigation'
import { LoginDialog } from './components/Login'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Body from './components/Body'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.state = {
      tabValue:0,
      loggedIn: false
    }
  }

  refresh() {
    this.forceUpdate()
  }

  onLogin = (userData) => {
    this.setState({ ...this.state, loggedIn: true, user: { ...userData } })
  }

  handleTabChange = (event, newValue) => {
    this.setState({tabValue:newValue});
  };



  render() {
    if (!this.state.loggedIn) return <LoginDialog onLogin={this.onLogin} />
    return (
      <Fragment>
        <Header title="HomePage" user={this.state.user.username} />
        <AppBar position="static">
          <Tabs value={this.state.tabValue} onChange={this.handleTabChange} aria-label="simple tabs example">
            <Tab label="Item One"  />
            <Tab label="Item Two"  />
            <Tab label="Item Three" />
            <Tab label="Users" />
          </Tabs>
        </AppBar>
      <Body value={this.state.tabValue}/>
      </Fragment>
    );
  }
}

export default App;
