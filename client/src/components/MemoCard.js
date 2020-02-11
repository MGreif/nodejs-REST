import React from 'react'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


export const MemoCard = (props) => {

  const useStyles = ({maxHeight = 1000,width = 200,resize="none"}) => makeStyles({
    root: {
      height: 50 + "%"
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    paper: {
      margin:" 0 0 15px 0",
      width: `${width}px`,
      display: "flex",
      flexDirection: "row",
      overflow: "visible !important",
    },
    divFlex: {
      display: "flex",
      flexDirection: "column",
      margin: "5px 10px",
      flex: 1,
      padding: "0 0 0 5px"
    },
    scroll:{
      maxHeight:`${maxHeight}px`,
      overflowY:"auto",
      resize:`${resize}`
    },
    typo:{
      fontSize:0.9 + "em"
    },
    card:{
      height:"100px"
    },
  })()

  const classes = useStyles({maxHeight:props.maxHeight,width:props.width,resize:props.resize})


  return(
    <Card className={classes.paper} >
    <div className={classes.divFlex}>
      <Typography color="textPrimary">{props.title}</Typography>
      <div className={classes.scroll}>
      <Typography className={classes.typo} color="textSecondary" gutterBottom>
        {props.description || 'Es wurde kein Freitext angegeben'}
        </Typography>
      </div>
    </div>
  </Card>
  )

}