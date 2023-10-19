import React from 'react'
import classnames from 'classnames'
import {TextField} from '@mui/material';
function InputGroup({label, type, name, onChangeHandler, errors, value,autocomplete}) {
  return (
    <div className="mb-3" style={{'marginLeft':'0.3%','marginTop':'0.3%','marginBottom':'0.7%'}}>
    <TextField  label={label} type={type} value={value} className={(classnames("form-control", {"is-invalid": errors}))}  name={name} onChange={onChangeHandler}
     autoComplete= {autocomplete}
    />
    {
      errors && (<div className="invalid-feedback">
      {errors}
    </div>)
    }
  </div>
  )
}

export default InputGroup