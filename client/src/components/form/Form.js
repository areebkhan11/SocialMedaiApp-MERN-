import React, {useState} from 'react'
import { makeStyles  } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { TextField, Button, Typography, Paper } from '@material-ui/core';

const useStyles =  makeStyles((theme) =>({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
        },
      },
      paper: {
        padding: theme.spacing(2),
        
      },
      form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        

      },
      fileInput: {
        width: '97%',
        margin: '10px 0',
      },

      buttonSubmit: {
        marginTop:"10px",
        marginBottom: "10px",
      },
  }));

export default function Form() {
    const classes = useStyles();
    const [postData, setPostData] = useState({creator:'', title:'', message:'', tags:'', selectedFile:''  });
    const HandleSubmit = () =>{
      console.log("Clear")
    }
    const Clear = () =>{
      console.log("Clear")
    }
  


  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={HandleSubmit}>
        <Typography variant='h6'> Creating a Post </Typography>
        <TextField  name="creator"  variant="outlined"  label="creator"  fullWidth value={postData.creator} onChange={(e)=> setPostData({...postData, creator:e.target.value})}  />
        <TextField  name="title"  variant="outlined"  label="title"  fullWidth value={postData.title} onChange={(e)=> setPostData({...postData, creator:e.target.value})}  />
        <TextField  name="message"  variant="outlined"  label="message"  fullWidth value={postData.message} onChange={(e)=> setPostData({...postData, creator:e.target.value})}  />
        <TextField  name="tags"  variant="outlined"  label="tags"  fullWidth value={postData.tags} onChange={(e)=> setPostData({...postData, creator:e.target.value})}  />
      </form>
      <div className={classes.fileInpiut}>
        <FileBase 
          type="file"
          multiple={false}
          onDone={({base64})=> setPostData({...postData, selectedFile:base64})}
        />

        <Button className={classes.buttonSubmit} 
        variant="contained" 
        color="primary" 
        size="large" 
        
        type='submit' 
        fullWidth > Submit </Button>
        
        <Button 
        variant="contained" 
        color="secondary" 
        size="large" 
        onClick={Clear} 
        fullWidth > Clear </Button>

      </div>
    </Paper>
  )
}
