const mongoClient = require('mongodb').MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017/'

const findByQuery = (coll,query,cb)=>{
  mongoClient.connect(connectionURL,(err,db)=>{
    console.log("connected to ", connectionURL)
    const restdb = db.db("restdb")
    const collection = restdb.collection(coll)
    collection.find(query).toArray((err,result)=>{
      cb(result)
    })
    db.close()
  })
}


module.exports =  {findByQuery}