import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export const Navigation = (props) => {
  const classes = makeStyles({
    Navigation: {
      height: "100px",
      position: "relative",
      backgroundColor: "#E8E8E8",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start"
    },
    item: {
      '&:first-child': {
        marginLeft: "50px"
      },
      height: "100px",
      margin: "0 2px",
      '&:hover': {
        backgroundColor: "#D0D0D0",
        transitionDuration: "0.2s"
      }
    },
    itemText: {
      position: "relative",
      fontSize: "1.5em",
      textAlign: "center",
      top: "30px",
      fontWeight: 200,
      color: "#A0A0A0",
      margin: "10px 40px"
    },
    link: {
      textDecoration: "none"
    },
  })()

  return (
    <Router>
      <div className={classes.Navigation}>
        <Link onClick={props.onClick} className={classes.link} to="/test"><div className={classes.item} ><span className={classes.itemText}>asasd</span></div></Link>
        <Link onClick={props.onClick} className={classes.link} to="/test2"><div className={classes.item} ><span className={classes.itemText}>asasd</span></div></Link>
        <div className={classes.item} ><span className={classes.itemText}>ddddd</span></div>
      </div>
      <div className="App">
        <Switch>
          <Route path="/test">
            <div>TEST ROUTE</div>
          </Route>
          <Route path="/test2">
            <div>TEST2 ROUTE</div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}