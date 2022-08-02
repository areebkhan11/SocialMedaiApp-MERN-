
import {FETCH_ALL, CREATE, UPDATE,FETCH_POST, DELETE,START_LOADING,END_LOADING,  LIKE, FETCH_BY_SEARCH} from '../../constants/actionTypes'

const initialState ={
    isLoading : true,
    posts: []
}


export default (state = initialState , action)=>{
    switch(action.type){
        case START_LOADING :
            return {...state, isLoading:true}
            
        case END_LOADING :
            return {...state, isLoading:false}
        
        case FETCH_ALL :  
        return {
            ...state,
            posts: action.payload.data,
            currentPage: action.payload.currentPage,
            numberOfPages: action.payload.numberOfPages
        }
        case FETCH_POST:
            return{ ...state, post:action.payload}
        case FETCH_BY_SEARCH:
            console.log(action.payload, "<----------------action")
            return {
                ...state,
                posts: action.payload
            }
                    
        case CREATE :  
        return {...state, posts : [...state.posts, action.payload]};
        
        case UPDATE : 
        case LIKE: 
        return {...state, posts : state.posts.map((st) => st._id === action.payload._id ? action.payload : st )};

        case DELETE :  
        return {...state, posts : state.posts.filter((post) => post._id !== action.payload)};



        default:
            return state; 

    }
}