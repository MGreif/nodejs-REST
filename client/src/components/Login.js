import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Card } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const LoginDialog = (props) => {

  const [username,setUsername] = React.useState(null)
  const [password,setPassword] = React.useState(null)

  const classes = makeStyles({
    dialog:{
      position:"absolute",
      width: "50vw",
      height:"50vh",
      top:"25vh",
      left:"25vw",
      padding: "10px",
      borderRadius:"1em"
    },
    background:{
      position:"absolute",
      height:"100vh",
      width:"100vw",
      backgroundColor:"gray"
    },
    innerContent:{
      position:"relative",
      margin:"0 10vw",
      height:"40vh",
      textAlign:"center",
      display:"flex",
      flexDirection:"column"
    },
    textField:{
      '&:first-child':{marginTop:"11vh"},
      margin:"2vh 0"
    },
    button:{
      margin:"2vh 10vh",
      height:"6vh"
    },
  })()


  const login = () => {
    if(username && password){
      props.onLogin({username,password})
    }
    console.error("username or password invalid")
  }

  return (
  <div className={classes.background}>
    <Card className={classes.dialog}>
    <div className={classes.innerContent}>
      <TextField className={classes.textField} id="outlined-basic" label="Username" variant="outlined" />
      <TextField className={classes.textField} id="outlined-basic" label="Password" variant="outlined" />
      <Button onClick={login} className={classes.button} variant="contained" color="primary">
        Primary
      </Button>
    </div>

    </Card>
  </div>)

}