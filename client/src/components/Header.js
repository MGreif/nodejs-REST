import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


export const Header = (props) => {
  const classes = makeStyles({
    header:{
      height:"100px",
      position:"relative",
      backgroundColor:"black",
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between"
    },
    title:{
      color:"white",
      fontSize:"3em",
      fontWeight:550,
      textAlign:"center",
      paddingTop:"10px"
    },
    user:{
      color:"white",
      fontSize:"2em",
      fontWeight:400,
      textAlign:"left",
      paddingTop:"25px",
    },
    version:{
      color:"white",
      fontSize:"2em",
      fontWeight:400,
      textAlign:"right",
      paddingTop:"25px"
    },
    container:{
      flex:1
    },
  })()

  return(
    <div className={classes.header}>
      <div className={classes.container}>
      <Typography className={classes.user} >logged in as <b>{props.user || ""}</b></Typography>
      </div>
      <div className={classes.container}>
      <Typography className={classes.title} >{props.title || ""}</Typography>
      </div>
      <div className={classes.container}>
      <Typography className={classes.version} >{props.version || ""}</Typography>
      </div>
    </div>
  )
}