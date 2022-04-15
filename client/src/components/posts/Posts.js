import React from 'react'
import Post from './post/Post'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles ((theme)=>({
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
      },
      smMargin: {
        margin: theme.spacing(1),
      },
      actionDiv: {
        textAlign: 'center',
      },
}))


export default function Posts() {



    const classes = useStyles();
  return (
    <>
        <Post />
    </>
  )
}
