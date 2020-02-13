import React, { Fragment } from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import UserList from './UserList'
import UserAdd from './UserAdd'
import {xhrSendRequest} from '../modules/xhr'


export default class Body extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: []
    }
  }

  TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <Typography
        component="div"
        onClick={props.onClick?props.onClick:()=>{}}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }


  getUsers = () => {
    fetch('http://localhost:8080/users/').then(res=>res.json()).then(res=>this.setState({userList:[...res]}))
  }

  deleteUser(id){
    xhrSendRequest('http://localhost:8080/users/delete/'+id,{},()=>this.getUsers())
    this.getUsers()
  }

  saveUser(content){
    xhrSendRequest('http://localhost:8080/users/add',content)
  }

  updateUser(id,content){
    xhrSendRequest('http://localhost:8080/users/update/'+id,{id,content})
  }

  componentDidMount(){
    this.getUsers()
  }



  render() {
    return <Fragment>
      <this.TabPanel value={this.props.value} index={0}>
        <div>TEST ROUTE</div>
      </this.TabPanel>
      <this.TabPanel value={this.props.value} index={1}>
        <div>TEST ROUTE2</div>
      </this.TabPanel>
      <this.TabPanel value={this.props.value} index={2}>
        Item Three
      </this.TabPanel>
      <this.TabPanel value={this.props.value} onClick={this.getUsers} index={3}>
        <UserList users={this.state.userList} getUsers={this.getUsers} updateUser={(id,content)=>this.updateUser(id,content)} deleteUser={id=>this.deleteUser(id)}/>
        <UserAdd saveUser={content=>this.saveUser(content)} getUsers={this.getUsers}/>
      </this.TabPanel>
    </Fragment>
  }
}