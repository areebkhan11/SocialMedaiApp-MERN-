import React from 'react'
import  {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core'
import {useNavigate, useLocation, useSearchParams} from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import Posts from '../posts/Posts'
import Form from '../form/Form'
import { makeStyles  } from '@material-ui/core'
import {getPosts, getPostBySearch} from '../../redux/actions/posts'
import Paginate from '../reusable/Paginationa'



const useStyles = makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  }));


  // function useQuery(){
  //   return new URLuseSearchParams(useLocation().search);
  // }


export default function Home() {

    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState({value:""});
    const [tags, setTags] = useState([])
    const dispatch = useDispatch();
    // const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const HandleChange =  (e) =>{
      setSearch({...search, value: e.target.value})
   
    }

    
    const handleAdd = (tag) =>{
      setTags([...tags, tag])
    }
    
    const handleDelete = () =>{

    }

    const searchPost =() => {
     
      if(search.value || tags){

          
          dispatch(getPostBySearch({search: search.value , tags: tags.join(',')}))
          navigate(`/posts/search?searchQuery=${search.value || 'none'}&tags=${tags.join(',')}`)
      }else{
        navigate('/')

      }
    }
    
    const handleKeypress = (e) =>{
        if (e.keyCode === 13){
          // search func
          // console.log("Hello")
          searchPost();
        }
    }
 
  return (
      <Grow in>
        <Container maxWidth="xl">
          <Grid container justify="space-between"  className={classes.gridContainer} alignitems='stretch' spacing={3}>
            <Grid item xs={12} sm={6} md={9} >
              <Posts currentId = {currentId}  setCurrentId={setCurrentId}/>
            </Grid> 

            <Grid item xs={12} sm={6} md={3} >
              <AppBar className={classes.appBarSearch} position="static" color= "inherit" >
                <TextField onKeyPress={handleKeypress} name='search' variant='outlined' label = "Search Posts" fullWidth value={search.value} onChange={HandleChange} />   
                <ChipInput style={{margin:'10px 0'}}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search Tags"
                  variant="outlined" /> 
                <Button onClick={searchPost} classNam={classes.searchButton} color="primary" >Search</Button>
              </AppBar>
              <Form currentId = {currentId} setCurrentId={setCurrentId}/>
              <Paper className={classes.pagination} elevatgion={6}>
                <Paginate page={page} />
              </Paper>
            </Grid>  
          </Grid>  
        </Container>
      </Grow>
  )
}
