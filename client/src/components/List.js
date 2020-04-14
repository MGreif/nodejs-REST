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
import DialogComponent from './Dialog'
import {StateInput} from './stateInput'
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


export default class List extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      search:null,
    }
  }
  classes = () => useStyles();

  render(){

    if(this.props.data.length === 0) return <div>No Data Found      {this.props.add}    </div>

    return (
      <>
      <StateInput handleChange={this.handleChange} label="Search"/>
      <TableContainer component={Paper}>
        <Table className={this.classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {Object.keys(this.props.data[0]).map(elem=><StyledTableCell>{elem}</StyledTableCell>)}
              {this.props.delete?<StyledTableCell align="center"></StyledTableCell>:null}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map(elem => (
              <StyledTableRow key={elem._id}>
              {Object.values(elem).map(e => <StyledTableCell>{e.toString()}</StyledTableCell>)}
              {this.props.delete?<StyledTableCell align="center">
                  <DialogComponent opener={<DeleteIcon fontSize="small" />} 
                  dialogHeader="Löschen"
                  dialogText="Wirklich löschen?" 
                  options={[
                    {name:"Abbrechen"},
                    {name:"Löschen",action:()=>{this.props.delete(elem._id)}},
                    ]}/>
          </StyledTableCell>:null}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {this.props.add}
    </>
    );
  }
}