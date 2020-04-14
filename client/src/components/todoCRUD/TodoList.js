import React, { useEffect } from 'react'
import List from '../List'
import {xhrSendRequest} from '../../modules/xhr'
import TodoAdd from './TodoAdd'
export default function TodoList(props){


  const [data,setData] = React.useState([])



  async function getData(){
    (async () =>fetch('http://localhost:8080/todos/').then(x=>x.json()).then(x=>setData([...x])))()
  }

  useEffect(()=>{
    getData();
  },[])

  const deleteEntry = (id) => {
    xhrSendRequest('DELETE','http://localhost:8080/todos/delete/'+id,{},getData)
  }

  const save = (data) =>{
    xhrSendRequest('POST','http://localhost:8080/todos/add',data,getData)
  }

  return(
  <>
  <List data={data} delete={deleteEntry} add={<TodoAdd save={(data)=>save(data)}/>}/>
  </>)

}