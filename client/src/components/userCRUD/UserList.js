import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogComponent from '../Dialog'
import UserEdit from './UserEdit'
import {StateInput} from '../stateInput'
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);




const useStyles = makeStyles({
  table: {
    //minWidth: 700,
  },
});

export default class UserList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      search:null
    }
  }

  deleteUser = (id)=>{
    this.props.deleteUser(id)
  }
  
  classes = () => useStyles();

  handleChange = (e) => {
    this.setState({search:e.target.value})
    
  }

  render(){
    return (
      <>
      <StateInput handleChange={this.handleChange} label="Search"/>
      <TableContainer component={Paper}>
        <Table className={this.classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell align="right">First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Age</StyledTableCell>
              <StyledTableCell align="right">ID</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.users?this.props.users.filter(x=>this.state.search!=null
            ?
            x.username.match(new RegExp("^"+this.state.search,"ig")):x).map(user => (
              <StyledTableRow key={user._id}>
                <StyledTableCell component="th" scope="row">{user.username}</StyledTableCell>
                <StyledTableCell align="right">{user.namef}</StyledTableCell>
                <StyledTableCell align="right">{user.namel}</StyledTableCell>
                <StyledTableCell align="right">{user.age}</StyledTableCell>
                <StyledTableCell align="right">{user._id}</StyledTableCell>
                <StyledTableCell>
                  <DialogComponent opener={<DeleteIcon fontSize="small" />} 
                  dialogText="Wirklich löschen?" 
                  options={[
                    {name:"Abbrechen"},
                    {name:"Löschen",action:()=>{this.deleteUser(user._id)}},
                    ]}/>
                  <UserEdit user={user} updateUser={(id,content)=>this.props.updateUser(id,content)} getUsers={this.props.getUsers}/>
          </StyledTableCell>
              </StyledTableRow>
            )):null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    );
  }
}