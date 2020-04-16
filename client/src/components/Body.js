import React, { Fragment } from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import UserList from './userCRUD/UserList'
import UserAdd from './userCRUD/UserAdd'
import {xhrSendRequest} from '../modules/xhr'
import TodoList from './todoCRUD/TodoList'

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




  render() {
    return <Fragment>
      <this.TabPanel value={this.props.value} index={0}>
        <div>TEST ROUTE</div>
      </this.TabPanel>
      <this.TabPanel value={this.props.value} index={1}>
        <div>TEST ROUTE2</div>
      </this.TabPanel>
      <this.TabPanel value={this.props.value} index={2}>
        <TodoList/>
      </this.TabPanel>
      <this.TabPanel value={this.props.value} index={3}>
        <UserList users={this.state.userList} getUsers={this.getUsers} updateUser={(id,content)=>this.updateUser(id,content)} deleteUser={id=>this.deleteUser(id)}/>
      </this.TabPanel>
    </Fragment>
  }
}