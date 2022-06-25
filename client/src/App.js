import React, {useEffect} from 'react'
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import Posts from './components/posts/Posts'
import Form from './components/form/Form'
import { makeStyles  } from '@material-ui/core'
import { deepPurple  } from '@material-ui/core/colors'
import {useDispatch} from 'react-redux'
import {getPosts} from './redux/actions/posts'


const useStyles = makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  }
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
        <Container >
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
