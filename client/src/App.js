import React, {useEffect} from 'react'
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import Posts from './components/posts/Posts'
import Form from './components/form/Form'
import { makeStyles  } from '@material-ui/core'
import { deepPurple  } from '@material-ui/core/colors'
import {useDispatch} from 'react-redux'
import {getPosts} from './redux/actions/posts'


const useStyles =  makeStyles((theme) =>({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));



export default function App() {

const classes = useStyles();
const dispatch = useDispatch();

useEffect(()=>{
  dispatch(getPosts())
},[dispatch])




  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position='static' color = 'inherit'>
        <Typography className={classes.heading} variant='h2' alignItems="center">
          WeShare
        </Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7} >
              <Posts />
            </Grid> 
            <Grid item xs={12} sm={4} >
              <Form />
            </Grid>  
          </Grid>  
        </Container>
      </Grow>
      </Container>
  )
}
