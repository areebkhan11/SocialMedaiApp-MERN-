import React, { useEffect }  from 'react'; 
import {Pagination, PaginationItem } from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getPosts } from '../../redux/actions/posts';




const useStyles = makeStyles({
    ul:{
        justifyContent:'space-around',

    }
})





const Paginate = ({page}) =>{


    const {numberOfPages} = useSelector((state)=> state.Posts || [])
   
    const classes = useStyles();
    const dispatch = useDispatch(page);

    useEffect(()=>{
        if(page){
            dispatch(getPosts(page))
        }
    },[page]);

    

    return(
        <Pagination 
            classes={{ul: classes.ul}}
            count={numberOfPages}
            page={Number(page)}
            variant="outlined"
            color="primary"
            renderItem={(item)=>(
                <PaginationItem  component={Link} to={`/posts?pages=${item.page}`} {...item}/>
            )}  
        />
    )
}

export default Paginate;