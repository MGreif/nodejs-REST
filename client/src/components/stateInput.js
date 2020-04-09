import React from 'react'
import TextField from '@material-ui/core/TextField'
import './stateInput.css'

export const StateInput = (props) => {


  return (
    <div className='state-input'>
      <TextField id="standard-basic" label={props.label || ""} onChange={e=>props.handleChange(e)} />
    </div>
  )
}

