import React,{Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';

export default function TodoEdit(props){

  const [open, setOpen] = React.useState(false);
  const [todoData,setTodoData] = React.useState({
    todo:props.content.todo,
    done:props.content.done,
    id:props.content._id
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const update = () =>{
    if(Object.values(todoData).every(x=>x !== null && x !== "" && !x.toString().match(/^\s+$/ig))){
      props.update(todoData)
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
        <DialogTitle id="form-dialog-title">Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="todo"
            label="Todo"
            placeholder={todoData.todo}
            type="text"
            onChange={(e)=>{setTodoData({...todoData, [e.target.id]:e.target.value})}}
          />
          <Checkbox
            color="primary"
            checked={todoData.done}
            id="done"
            label="Done?"
            onChange={(e)=>{setTodoData({...todoData, [e.target.id]:e.target.checked})}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Abbrechen
          </Button>
          <Button onClick={update} color="primary">
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
      </Fragment>
      :null}

    </Fragment>
  )


}