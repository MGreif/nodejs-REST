const mongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const connectionURL = 'mongodb://127.0.0.1:27017/'


const connectMongo = (coll, cb) => {
  mongoClient.connect(connectionURL, (err, db) => {
    console.log("connected to ", connectionURL)
    const restdb = db.db("restdb")
    const collection = restdb.collection(coll)
    if (err) {
      db.close()
      console.log("closing connection")
      throw err
    }
    cb(collection)
    db.close()
  })
}





async function findMongoData(){
  return new Promise((res,rej)=>{
    mongoClient.connect(connectionURL,(err,db)=>{
      resolve(db.db('restdb').collection('users').find({}).toArray())
    })
  })
}





const findByQuery = (coll, query, cb) => {
  connectMongo(coll,connection=>{
    connection.find(query).toArray((err, result) => {
      cb(result)
    })
  })
}

const removeById = (coll, id, cb) => {
  try{
    connectMongo(coll,mongo=>{
      mongo.deleteMany({_id:new ObjectId(id)}).then(res=>cb(res))
    })
  }catch(ex){
    console.log(ex.message)
  }
}

const addByObject = (coll,object,cb)=>{
  connectMongo(coll,mongo=>{
    mongo.insertOne( object ).then(res=>{cb(res)})
  })
}

const updateByObject = (coll,id,object,cb)=>{
  try{
    connectMongo(coll,mongo=>{
      mongo.updateMany({_id:new ObjectId(id)},{$set:object}).then(res=>cb(res))
    })
  }catch(ex){
    console.log(ex.message)
  }
}

module.exports = { findByQuery,removeById,addByObject,updateByObject }