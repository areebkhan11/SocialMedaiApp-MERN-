import React, {useState, useEffect} from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';






const useStyles =  makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignitems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignitems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignitems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));


export default function Navbar() {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    const Logout = () =>{
      dispatch({type:"LOGOUT", })
      navigate('/')
      setUser(null)
    }

    useEffect(()=>{
      // const user = user?.token

      setUser(JSON.parse(localStorage.getItem('profile')));

    },[location])
    
  return (
    <AppBar className={classes.appBar} position='static' color = 'inherit'>
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant='h2' alignitems="center">
            WeShare
            </Typography>
        </div>
        <Toolbar className={classes.toolbar}>
            { user ? 
            (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>  {user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" color='secondary' className={classes.logout} onClick={Logout}>Logout</Button>
                </div>

            ):
            (
                <div>
                    <Button component={Link} to="/auth" variant="contained" color='primary' className={classes.logout}>Sign In</Button>
                       
                </div>
            )

            }
        </Toolbar>
  </AppBar>
  )
}
