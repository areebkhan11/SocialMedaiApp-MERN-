import React, {useState} from 'react'
import { makeStyles  } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/actions/posts';

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
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({creator:'', title:'', message:'', tags:'', selectedFile:''  });

    console.log(postData, "<-----------------")

    const HandleSubmit = () =>{
      console.log(postData, "postData")
      dispatch(createPost(postData))

    }
    const Clear = () =>{
      console.log("Clear")
    }
  
 

  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={HandleSubmit}>
        <Typography variant='h6'> Creating a Post </Typography>
        <TextField  name="creator"  variant="outlined"  label="Creator"  fullWidth value={postData.creator} onChange={(e)=> setPostData({...postData, creator:e.target.value})}  />
        <TextField  name="title"  variant="outlined"  label="Title"  fullWidth value={postData.title} onChange={(e)=> setPostData({...postData, title:e.target.value})}  />
        <TextField  name="message"  variant="outlined"  label="Message"  fullWidth value={postData.message} onChange={(e)=> setPostData({...postData, message:e.target.value})}  />
        <TextField  name="tags"  variant="outlined"  label="Tags"  fullWidth value={postData.tags} onChange={(e)=> setPostData({...postData, tags:e.target.value})}  />
      
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
    </form>
    </Paper>
  )
}
