import React from 'react'; 
import {Pagination, PaginationItem } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';



const useStyles = makeStyles({
    ul:{
        justifyContent:'space-around',

    }


})


const Paginate = () =>{
    const classes = useStyles();
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