import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogComponent from '../Dialog'
import UserEdit from './UserEdit'
import UserAdd from './UserAdd'
import {StateInput} from '../stateInput'
import List from '../List'
import {xhrSendRequest} from '../../modules/xhr'

export default function UserList(props) {

  const [ data, setData ] = React.useState([])


  const getUsers = async() => {
    fetch('http://localhost:8080/users/').then(res=>res.json()).then(res=>setData([...res]))
  }

  useEffect(()=>{
  (async()=>getUsers())()
  },[])

  function deleteUser(id){
    xhrSendRequest("delete",'http://localhost:8080/users/delete/'+id,{},getUsers)
  }

  function updateUser(data){
    const content = {...data}
    const {_id} = content
    delete content._id
    xhrSendRequest("POST",'http://localhost:8080/users/update/'+_id,{content},getUsers)
  }

  return <List multiselect delete={deleteUser} add={<UserAdd getData={getUsers}/>} data={data} edit={(user)=><UserEdit user={user} update={updateUser} />}/>
}