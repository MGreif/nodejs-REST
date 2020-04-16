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
import Checkbox from '@material-ui/core/Checkbox';
import './comp.css'

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
    this.multiselect = {
      isActive:!!props.multiselect,
      validAmount:1,
      isValid:(curr) => (curr > this.multiselect.validAmount) && this.multiselect.isActive
    }
    this.isDeletable = !!props.delete
    this.state = {
      search:null,
      multiselect:[]
    }
  }
  classes = () => useStyles();

  checkMultiselect = (id) =>{
    if(this.state.multiselect.includes(id)){
      const arr = [...this.state.multiselect]
      arr.splice(this.state.multiselect.indexOf(id),1)
      console.log(arr)
      this.setState({multiselect:[...arr]})
    }else{
      this.setState({multiselect:[...this.state.multiselect,id]})
    }
  }

  render(){

    if(this.props.data.length === 0) return <div>No Data Found {this.props.add} </div>

    return (
      <>
      <TableContainer component={Paper}>
        <Table className={this.classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {this.props.multiselect?<StyledTableCell align="center"></StyledTableCell>:null}
              {Object.keys(this.props.data[0]).map(elem=><StyledTableCell>{elem}</StyledTableCell>)}
              {this.props.delete||this.props.edit?<StyledTableCell align="center"></StyledTableCell>:null}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map(elem => (
              <StyledTableRow key={elem._id}>
                {this.props.multiselect&&<StyledTableCell align="center"><Checkbox
                  color="primary"
                  id={`multiselect-${elem._id}`}
                  onChange={(e)=>{this.checkMultiselect(elem._id)}}
                /></StyledTableCell>}
              {Object.values(elem).map(e => <StyledTableCell>{e.toString()}</StyledTableCell>)}
              {(this.props.delete || this.props.edit)&&<StyledTableCell align="center">
                <div className='flex-box row'>
              {this.props.delete&&<DialogComponent opener={<DeleteIcon fontSize="small" />} 
                  dialogHeader="Löschen"
                  dialogText="Wirklich löschen?" 
                  options={[
                    {name:"Abbrechen"},
                    {name:"Löschen",action:()=>{this.props.delete(elem._id)}},
                    ]}/>}
                    {this.props.edit&&this.props.edit(elem)}
              </div>
          </StyledTableCell>}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex-box row">
      {this.props.hasOwnProperty("add")&&this.props.add} 
      {this.multiselect.isValid(this.state.multiselect.length)&&
        <DialogComponent opener={<DeleteIcon fontSize="small" />} 
        dialogHeader="Löschen"
        dialogText={`Wirklich alle ${this.state.multiselect.length} Elemente löschen?`} 
        options={[
          {name:"Abbrechen"},
          {name:"Löschen",action:()=>{this.state.multiselect.forEach(elem=>this.props.delete(elem))}},
        ]}
      />
      }
      </div>
    </>
    );
  }
}