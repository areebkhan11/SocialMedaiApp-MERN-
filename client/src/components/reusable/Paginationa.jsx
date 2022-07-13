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
    const classes = useStyles();
    const dispatch = useDispatch(page);

    useEffect(()=>{
        if(page){
            dispatch(getPosts)
        }


    },[page]);

    return(
        <Pagination 
            classes={{ul: classes.ul}}
            count={5}
            page={1}
            variant={1}
            color="primary"
            renderItem={(item)=>(
                <PaginationItem {...item} component={Link} to={`/posts?pages=${1}`}/>
            )}
        />
    )
}

export default Paginate;