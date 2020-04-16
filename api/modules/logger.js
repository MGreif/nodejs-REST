const logger = require('morgan')
const chalk = require('chalk')


logger.token('id',(req)=>{
  if(req._id) return req._id
  return '-'
})

logger.token('ip',(req)=>{
  if(req.ip) return req.ip
  return '-'
})

logger.token('xhr',(req)=>{
  return req.xhr?chalk.green(req.xhr):chalk.red(req.xhr)
})


logger.token('stat',(req,res)=>{
  switch(res.statusCode){
    case 200:
      return chalk.greenBright(res.statusCode)
    case 304:
      return chalk.blueBright(res.statusCode)
    case 404:
      return chalk.redBright(res.statusCode)
    default:
     return chalk.red(res.statusCode)
}
})

const morgan = logger(":method :stat :url (:response-time ms)")

module.exports = morgan