import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core'
import React from 'react'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

export default function Input({half, name, label, handleChange, autoFocus, handleShowpassword, type, value }) {
  return (
    <Grid item xs={12} sm={half ? 12 : 6 }>
        <TextField 
            name={name}
            onChange={handleChange}
            variant="outlined"
            value={value}
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password' ? {
                endAdornment:(
                    <InputAdornment position='end'>
                        <IconButton onClick={handleShowpassword}>
                            {type === 'password' ? <Visibility /> : <VisibilityOff /> }
                        </IconButton>
                    </InputAdornment>
                )
            }:null }
            />

    </Grid>
  )
}
