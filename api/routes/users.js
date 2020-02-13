var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var { findByQuery } = require('../modules/mongodb')
var {userReducer} = require('../modules/reducer')
/* GET users listing. */
router.post('/login', function (req, res, next) {
  try {
    const { username, password } = req.body

    findByQuery("users", { username }, (result) => {
      const user = result[0]
      bcrypt.compare(password, user.password, (err, match) => {
        if (match) {
          res.end(JSON.stringify({ granted: true, user:userReducer(user) }))
        } else {
          res.end(JSON.stringify({ granted: false, message: "incorrect username or password" }))
        }
      })
    })
  } catch (ex) {
    console.log(`couldnt get [/login] ${ex.message}`)
    res.end(JSON.stringify({ granted: false, error: ex.message }))
  }
});

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});




module.exports = router;
