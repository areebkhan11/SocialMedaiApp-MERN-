import React, {useState} from 'react'
import { Avatar, Typography, Button, Paper, Grid, Container } from '@material-ui/core';
import LockedOutlinedIcon from '@material-ui/icons/LockOutlined'
import {makeStyles} from '@material-ui/core';
import {useDispatch} from 'react-redux'
import {GoogleLogin} from 'react-google-login'
import Input from './Input';
import Icon from './Icon';
import { useNavigate } from 'react-router-dom';
import {signin, signup} from '../../redux/actions/auth'


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
  const [form, setForm] = useState({firstName:"", lastName:"", email: "", password:"" , confirmPassword:"" })

  const dispatch = useDispatch();
  const navigate = useNavigate();

    // for the toggle the password
    const handleShowpassword = () => setShowPassword((prevShowPassword) => !prevShowPassword) 

    const HandleSubmit = (e) =>{
      e.preventDefault()
      if(isSignUp){
        dispatch(signup(form, navigate));
      }else{
        dispatch(signin(form, navigate));

      }
    }

    const handleChange = (e) =>{
      console.log(form)
      setForm({...form, [e.target.name]:e.target.value})
    }

    const switchMode = () =>{
      setSignup((previsSignup)=> !previsSignup)
      setForm({...form, firstName:"", lastName:"", email: "", password:"" , confirmPassword:"" })

    }


    
    const googleSuccess = async (response) =>{
      const result = response?.profileObj;
      const token = response?.tokenId;
      try{
        console.log("success<-------------")
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
                  <Input name="firstName" value={form.firstName} label="First Name" handleChange={handleChange} autoFocus   /> 
                  <Input name="lastName" value={form.lastName} label="Last Name" handleChange={handleChange}   /> 
                </>
              )}
                  <Input name="email" value={form.email} label="Email Address" handleChange={handleChange} autoFocus half type="email" /> 
                  <Input name="password" value={form.password} label="Password" handleChange={handleChange} autoFocus half type={ showPassword? "text" : "password" } handleShowpassword={handleShowpassword}/> 
                  {isSignUp && <Input name="confirmPassword" value={form.confirmPassword} label="Repeat Password" half type="password" handleChange={handleChange}/>}
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
