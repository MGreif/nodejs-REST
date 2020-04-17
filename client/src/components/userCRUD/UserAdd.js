import React,{Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import {xhrSendRequest} from '../../modules/xhr'

export default function AddUser(props){

  const [open, setOpen] = React.useState(false);
  const [userData,setUserData] = React.useState({
    username:null,
    age:null,
    namef:null,
    namel:null,
    password:null
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function saveUser(data){
  }

  const save = () =>{
    if(Object.values(userData).every(x=>x !== null)){
      xhrSendRequest("POST",'http://localhost:8080/users/add',userData,props.getData)
    }
    handleClose()
  }
  return(
    <Fragment>
       <IconButton size="medium" onClick={handleClickOpen}>
        <AddCircleOutlineIcon/>
      </IconButton>

      {open?
      <Fragment>
             <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="namef"
            label="First Name"
            type="text"
            onChange={(e)=>{setUserData({...userData, [e.target.id]:e.target.value})}}
          />
          <TextField
            autoFocus
            id="namel"
            label="Last Name"
            type="text"
            onChange={(e)=>{setUserData({...userData, [e.target.id]:e.target.value})}}

          />
            <TextField
              autoFocus
              id="age"
              label="Age"
              type="number"
              onChange={(e)=>{setUserData({...userData, [e.target.id]:e.target.value})}}
            />
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            onChange={(e)=>{setUserData({...userData, [e.target.id]:e.target.value})}}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            onChange={(e)=>{setUserData({...userData, [e.target.id]:e.target.value})}}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Abbrechen
          </Button>
          <Button onClick={save} color="primary">
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
      </Fragment>
      :null}

    </Fragment>
  )


}