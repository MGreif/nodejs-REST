import React, { Fragment } from 'react';
import './App.css';
import { Header } from './components/Header'
import { LoginDialog } from './components/Login'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Body from './components/Body'


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
            <Tab label="Todos" />
            <Tab label="Users" />
          </Tabs>
        </AppBar>
      <Body value={this.state.tabValue}/>
      </Fragment>
    );
  }
}

export default App;
