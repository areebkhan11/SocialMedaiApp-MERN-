import React, {useState, useEffect} from 'react'
import { makeStyles  } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../redux/actions/posts';



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
      message:{
        height:'125px'
      },

      buttonSubmit: {
        marginTop:"10px",
        marginBottom: "10px",
      },
  }));

export default function Form({currentId, setCurrentId}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({title:'', message:'', tags:'', selectedFile:''  });
    const post = useSelector((state) => currentId ?  state.Posts.find((p)=> p._id === currentId) : null )
    // const user = useSelector((state) => state.auth.authData);

    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(()=>{
      if(post) setPostData(post)

    },[post])

    const HandleSubmit = (e) =>{
      e.preventDefault();

      if( postData.title && postData.message && postData.tags && postData.selectedFile){
        if(currentId){
          dispatch(updatePost(currentId, postData))

        }else{
          dispatch(createPost({...postData, name: user?.result?.name}))
        }
      }
      Clear()
    }

    const Clear = () =>{
      setCurrentId(null)
      setPostData({ title:'', message:'', tags:'', selectedFile:''}) 

    }


  
 

  return (
    <>
    { user?.result?.name ?
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={HandleSubmit}>
        <Typography variant='h6'> {currentId ?  "Edit a Post" :  "Creating a Post"} </Typography>
       
        <TextField  name="title"  variant="outlined"  label="Title"  fullWidth value={postData.title} onChange={(e)=> setPostData({...postData, title:e.target.value})}  />
        <TextField  name="message" multiline maxRows={6}  variant="outlined"   label="Message"  fullWidth  value={postData.message} onChange={(e)=> setPostData({...postData, message:e.target.value})}  />
        <TextField  name="tags"  variant="outlined"   label="Tags"  fullWidth value={postData.tags} onChange={(e)=> setPostData({...postData, tags:e.target.value.split(",")})}  />
      
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
    </Paper> : <Paper className={classes.paper}>
            <Typography variant='h6' align="center">
              Please Sign in to create your own memory and like other's memory.

            </Typography>
          </Paper>
  }

</>
  )
}
