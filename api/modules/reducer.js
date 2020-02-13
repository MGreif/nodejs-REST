const illegalUserFields = ["password"]


const userReducer = (user) => {
    Object.entries(user).filter(entries=>!illegalUserFields.includes(entries[0])).reduce((acc,curr)=>acc[curr[0]]=curr[1],{})
    const userObj = {...user}
    illegalUserFields.forEach(field=>{
        delete userObj[field]
    })
    return userObj
}

module.exports= {userReducer}