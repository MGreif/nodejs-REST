import React, { useEffect } from 'react'
import List from '../List'
import {xhrSendRequest} from '../../modules/xhr'
import TodoAdd from './TodoAdd'
import TodoEdit from './TodoEdit'
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
    xhrSendRequest('POST','http://localhost:8080/todos/add',data,getData);
  }

  const update = (data) => {
    const content = {...data}
    const {id} = {...content}
    delete content.id
    xhrSendRequest('POST','http://localhost:8080/todos/update/'+id,content,getData);
  }

  return(
  <>
  <List multiselect data={data} delete={deleteEntry} edit={todo=><TodoEdit content={todo} update={(data)=>update(data)}/>} add={<TodoAdd save={(data)=>save(data)}/>}/>
  </>)

}