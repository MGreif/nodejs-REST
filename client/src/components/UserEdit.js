import React,{Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

export default function EditUser(props){

  const [open, setOpen] = React.useState(false);
  const [userData,setUserData] = React.useState({
    namef:props.user.namef,
    namel:props.user.namel,
    age:props.user.age,
    username:props.user.username,
    password:props.user.password
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.getUsers()
  };

  const updateUser = () =>{
    if(Object.values(userData).every(x=>x !== null)){
      props.updateUser(props.user._id,userData)
    }
    handleClose()
  }
  return(
    <Fragment>
       <IconButton size="medium" onClick={handleClickOpen}>
        <EditIcon/>
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
          <Button onClick={updateUser} color="primary">
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
      </Fragment>
      :null}

    </Fragment>
  )


}