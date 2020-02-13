var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var { findByQuery,removeById,addByObject,updateByObject } = require('../modules/mongodb')
var {userReducer} = require('../modules/reducer')
/* GET users listing. */
router.post('/login', function (req, res, next) {
  try {
    const { username, password } = req.body
    findByQuery("users", { username }, (result) => {
      if(result.length === 0) {
       res.end(JSON.stringify({granted:false, message:'incorrect username or password'})) 
      }else{
      const user = result[0]
      bcrypt.compare(password, user.password, (err, match) => {
        if (match) {
          res.end(JSON.stringify({ granted: true, user:userReducer(user) }))
        } else {
          res.end(JSON.stringify({ granted: false, message: "incorrect username or password" }))
        }
      })
      }
    })
  } catch (ex) {
    console.log(`couldnt get [/login] ${ex.message}`)
    res.end(JSON.stringify({ granted: false, error: ex.message }))
  }
});

router.post('/delete/:id',(req,res)=>{
  removeById('users',req.params.id,(object)=>{res.end(JSON.stringify({success: true, amount:object.deletedCount}))})
})

router.post('/update/:id',(req,res)=>{
  updateByObject('users',req.params.id,req.body.content,(obj)=>res.end(JSON.stringify({success:true,amount:obj.updatedCount})))
})

router.post('/add',(req,res)=>{
  try{

    const body = {...req.body}
    if(!body.password ||!body.username) throw {message:"username or password not given"}
    
    bcrypt.hash(body.password,10,(err,hashed)=>{
      if(err) throw err
      body.password = hashed
    addByObject('users',{...body},()=>{res.end(`successfully added user: ${body.username} with hash: ${hashed}`)})
  })
}catch(ex){
  console.log(ex.message)
}
})

router.get('/', function (req, res, next) {
  findByQuery('users',{},(r)=>{res.send(JSON.stringify(r.map(x=>userReducer(x))))})
});




module.exports = router;
