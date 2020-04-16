var express = require('express');
var router = express.Router();
var { findByQuery, removeById, addByObject, updateByObject } = require('../modules/mongodb')
var { userReducer } = require('../modules/reducer')
/* GET todos listing. */


router.delete('/delete/:id', async (req, res) => {
  try{
    const result = await removeById('todos', req.params.id)
    res.end(JSON.stringify({ success: true, amount: result.deletedCount }))
  }catch(ex){
    console.log(`couldnt post [todos/delete/:id] ${ex.message}`)
  }
})

router.post('/update/:id', async (req, res) => {
  try {
    const body = req.body
    const content = Object.entries(body).reduce((acc,curr)=>{
      acc[curr[0].toString()] = curr[1].toString()
      return acc
    },{})
    console.log('todos',req.params.id,content)
    const result = await updateByObject('todos',req.params.id,content)
    res.end(JSON.stringify({ success: true, amount: result.modifiedCount  }))
  } catch (ex) {
    console.log(`couldnt post [todos/updated/:id] ${ex.message}`)
  }
})


router.post('/add', async (req, res) => {
  try {
    const body = { ...req.body }

    const result = await addByObject('todos', { ...body })
    res.end(JSON.stringify({_id:result.insertedId}))
  } catch (ex) {
    console.log(`couldnt post [todos/add] ${ex.message}`)
  }
})

router.get('/', async (req, res, next) => {
  try{
    const todos = await findByQuery('todos', {})
    res.send(JSON.stringify(todos.map(x => userReducer(x))))
  }catch(ex){
    console.log(`couldnt get [todos/] ${ex.message}`)
  }
});




module.exports = router;
