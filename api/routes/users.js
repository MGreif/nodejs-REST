var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var { findByQuery, removeById, addByObject, updateByObject } = require('../modules/mongodb')
var { userReducer } = require('../modules/reducer')
/* GET users listing. */
router.post('/login', async function (req, res, next) {
  try {
    const { username, password } = req.body
    const result = await findByQuery("users", { username })
    console.log(result)
    if (result.length === 0) {
      res.end(JSON.stringify({ granted: false, message: 'incorrect username or password' }))
    } else {
      const user = result[0]
      bcrypt.compare(password, user.password, (err, match) => {
        if (match) {
          res.end(JSON.stringify({ granted: true, user: userReducer(user) }))
        } else {
          res.end(JSON.stringify({ granted: false, message: "incorrect username or password" }))
        }
      })
    }
  } catch (ex) {
    console.log(`couldnt get [/login] ${ex.message}`)
    res.end(JSON.stringify({ granted: false, error: ex.message }))
  }
});

router.post('/delete/:id', async (req, res) => {
  const result = await removeById('users', req.params.id)
  res.end(JSON.stringify({ success: true, amount: result.deletedCount }))
})

router.post('/update/:id', async (req, res) => {

  try {
    const body = req.body
    const content = { ...body.content }
    console.log(content)
    if(!content.password){
        const result = await updateByObject('users', req.params.id, content)
      res.end(JSON.stringify({ success: true, amount: result.modifiedCount  }))
    }else{
      bcrypt.hash(content.password, 10, async (err, hashed) => {
        if (err) throw err
        content.password = hashed
        const result = await  updateByObject('users', req.params.id, content )
        res.end(JSON.stringify({ success: true, amount: result.modifiedCount  }))
      })
    }
  } catch (ex) {
    console.log(ex.message)
  }
})


router.post('/add', async (req, res) => {
  try {

    const body = { ...req.body }
    if (!body.password || !body.username) throw { message: "username or password not given" }

    bcrypt.hash(body.password, 10, async (err, hashed) => {
      if (err) throw err
      body.password = hashed
      const result = await addByObject('users', { ...body })
      res.end(`successfully added user: ${body.username} with hash: ${hashed} and _id: ${result.insertedId}`)
    })
  } catch (ex) {
    console.log(ex.message)
  }
})

router.get('/', async (req, res, next) => {
  const users = await findByQuery('users', {})
  res.send(JSON.stringify(users.map(x => userReducer(x))))
});




module.exports = router;
