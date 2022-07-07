
import {FETCH_ALL, CREATE, UPDATE, DELETE, LIKE} from '../../constants/actionTypes'
import * as api from '../../api/index'
 

//action creators

export const getPosts = () => async (dispatch) => {
    try{
        const {data} = await api.fetchPosts();
        dispatch({type : FETCH_ALL, payload: data})
    }catch(error){
        console.log(error.message)
    }

    
}

export const createPost = (post) => async (dispatch) =>{
    try{
        const {data} = await api.createPost(post);
        dispatch ({type:CREATE, payload:data})
    }catch(err){
        console.log(err.message)
    }
} 

export const getPostBySearch = (searchQuery) => async (dispatch) =>{

    try{
        const {data} = await api.fetchPostBySearch(searchQuery)
        console.log(data)

    }catch(err){
        console.log(err)
    }
}

export const updatePost = (id, post) => async (dispatch)=>{
    try{
        const {data} = await api.updatePost(id, post)
        dispatch({type: UPDATE , payload: data})
    }catch(err){
        console.log(err)

    }
}

export const deletePost = (id) => async (dispatch)=>{
    try{
        await api.deletepost(id)
        dispatch({type: DELETE, payload: id})
    }catch{

    }

}

export const likePost = (id) => async (dispatch) => {
    try{
        const {data} = await api.likepost(id)
        dispatch({type: LIKE , payload:data})

    }catch(err){
        console.log(err)
    }

}