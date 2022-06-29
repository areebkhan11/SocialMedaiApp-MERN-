import React from 'react'
import Post from './post/Post'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import {Grid, CircularProgress} from '@material-ui/core'


const useStyles = makeStyles ((theme)=>({
    mainContainer: {
        display: 'flex',
        alignitems: 'center',
      },
      smMargin: {
        margin: theme.spacing(1),
      },
      actionDiv: {
        textAlign: 'center',
      },
}))


export default function Posts({setCurrentId}) {


    const posts = useSelector((state) => state.Posts)
    const classes = useStyles();

    console.log(posts)

  return (
   !posts.length ? <CircularProgress /> :(
    <Grid className={classes.mainContainer} container aligntems='stretch' spacing={3}>
      {posts.map(post =>(
        <Grid item key={post.id} xs={12} sm={6}>
          <Post  post={post} setCurrentId={setCurrentId}/>  
        </Grid>
      ))

      }
    </Grid>
   )
  )
}
