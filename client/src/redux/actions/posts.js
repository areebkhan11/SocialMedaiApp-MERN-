
import {FETCH_ALL, CREATE,FETCH_POST, UPDATE,START_LOADING, END_LOADING, DELETE, LIKE, FETCH_BY_SEARCH} from '../../constants/actionTypes'
import * as api from '../../api/index'
 

//action creators

export const getPosts = (page) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPosts(page);
        dispatch({type : FETCH_ALL, payload: data})
        dispatch({type: END_LOADING})
    }catch(error){
        console.log(error.message)
    }
}

export const getPost = (id) => async (dispatch) =>{
    try{
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPosts(id);
        dispatch({type : FETCH_POST, payload: data})
        dispatch({type: END_LOADING})

    }catch(error){

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
        dispatch({type: START_LOADING})

        const {data: {data}} = await api.fetchPostBySearch(searchQuery)
        dispatch({type: FETCH_BY_SEARCH , payload: data})
        console.log(data)
        dispatch({type: END_LOADING})


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