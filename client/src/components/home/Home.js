import React from 'react'
import  {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Container, Grow, Grid} from '@material-ui/core'
import Posts from '../posts/Posts'
import Form from '../form/Form'
import { makeStyles  } from '@material-ui/core'
import {getPosts} from '../../redux/actions/posts'




const useStyles = makeStyles((theme) => ({
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
    },
    [theme.breakpoints.down('sm')]:{
      mainContainer:{
        flexDirection:"column-reverse"
      }
    }
  }));


export default function Home() {

    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();



    useEffect(()=>{
      dispatch(getPosts())
    },[dispatch])
    
    
  return (
    <Grow in>
        <Container >
          <Grid container justify="space-between"  className={classes.mainContainer} alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7} >
              <Posts currentId = {currentId}  setCurrentId={setCurrentId}/>
            </Grid> 
            <Grid item xs={12} sm={4} >
              <Form currentId = {currentId} setCurrentId={setCurrentId}/>
            </Grid>  
          </Grid>  
        </Container>
      </Grow>
  )
}
