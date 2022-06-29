import React, {useState} from 'react'
import { Avatar, Typography, Button, Paper, Grid, Container } from '@material-ui/core';
import LockedOutlinedIcon from '@material-ui/icons/LockOutlined'
import {makeStyles} from '@material-ui/core';
import {useDispatch} from 'react-redux'
import {GoogleLogin} from 'react-google-login'
import Input from './Input';
import Icon from './Icon';
import { useNavigate } from 'react-router-dom';


const useStyles =  makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
}));




export default function Auth() {
  const classes = useStyles();
  const [isSignUp, setSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

    // for the toggle the password
    const handleShowpassword = () => setShowPassword((prevShowPassword) => !prevShowPassword) 

    const HandleSubmit = () =>{

    }

    const handleChange = () =>{

    }

    const switchMode = () =>{
      setSignup((previsSignup)=> !previsSignup)
    }


    
    const googleSuccess = async (response) =>{
      const result = response?.profileObj;
      const token = response?.tokenId;
      try{
        dispatch({type:"AUTH", data:{result, token}})
        navigate('/')
      }catch(err){
        console.log(err)
      }
    }
    
    const googleFaliure = (error) =>{
      console.log(error)  
      console.log("fail<-------------")

    }




  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockedOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? "Sign Up" : "Sign In"}</Typography>
          <form className={classes.form} onSubmit={HandleSubmit}>
            <Grid container spacing={2}>
              { isSignUp && (
                <>
                  <Input name="firstName" label="First Name" onChange={handleChange} autoFocus   /> 
                  <Input name="lastName" label="Last Name" onChange={handleChange}   /> 
                </>
              )}
                  <Input name="email" label="Email Address" onChange={handleChange} autoFocus half type="email" /> 
                  <Input name="password" label="Password" onChange={handleChange} autoFocus half type={ showPassword? "text" : "password" } handleShowpassword={handleShowpassword}/> 
                  {isSignUp && <Input name="confirmPassword" label="Repeat Password" half type="password" onChange={handleChange}/>}
            </Grid>

            <Button fullWidth type="submit" variant="contained" color="primary"  className={classes.submit}>
                  {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin 
              clientId="594632895030-okeq0ag4lp3g0rqbumq91ekk5vo26j9a.apps.googleusercontent.com"
              render={(renderProps)=>(
                <Button  className={classes.googleButton}
                 color="primary"
                 fullWidth
                 onClick={renderProps.onClick}
                 startIcon={<Icon />} 
                disabled={renderProps.disabled}
                variant="contained"
                > Google Sign In</Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFaliure}
                cookiePolicy={'single_host_origin'}
            />

            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Button onClick={switchMode}>
                    {isSignUp? "Already have an account? Sign In" : "Don't have an account Sign up"  }
                </Button>
              </Grid>
            </Grid>
          </form>


      </Paper>

    </Container>
  )
}
