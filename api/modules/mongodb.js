const mongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const connectionURL = 'mongodb://127.0.0.1:27017/'


async function findByQuery(coll, query){
  try{
    return new Promise((res,rej)=>{
      mongoClient.connect(connectionURL, { useUnifiedTopology: true }, (err,db)=>{
        res(db.db('restdb').collection(coll).find(query).toArray())
      })
    })
  }catch(ex){
    console.log(`[mongodb] findByQuery -> ( ${ex.message} )`)
  }
}


const removeById = async (coll, id) => {
  try{
    return new Promise((res,rej)=>{
      mongoClient.connect(connectionURL, { useUnifiedTopology: true }, (err,db)=>{
        res(db.db('restdb').collection(coll).deleteMany({_id:new ObjectId(id)}))
      })
    })
  }catch(ex){
    console.log(`[mongodb] removeById -> ( ${ex.message} )`)
  }
}

const addByObject = async (coll,object,cb)=>{
  try{
    return new Promise((res,rej)=>{
      mongoClient.connect(connectionURL, { useUnifiedTopology: true }, (err,db)=>{
        res(db.db('restdb').collection(coll).insertOne(object))
      })
    })
  }catch(ex){
    console.log(`[mongodb] addByObject -> ( ${ex.message} )`)
  }
}

const updateByObject = async (coll,id,object,cb)=>{
  try{
    return new Promise((res,rej)=>{
      mongoClient.connect(connectionURL, { useUnifiedTopology: true }, (err,db)=>{
        res(db.db('restdb').collection(coll).updateMany({_id:new ObjectId(id)},{$set:object}))
      })
    })
  }catch(ex){
    console.log(`[mongodb] updateByObject -> ( ${ex.message} )`)
  }
}

module.exports = { findByQuery,removeById,addByObject,updateByObject }