
import {FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH} from '../../constants/actionTypes'


export default (state = [], action)=>{
    switch(action.type){
        
        case FETCH_ALL :  
    
        return {
            ...state,
            posts: action.payload.data,
            currentPage: action.payload.currentPage,
            numberOfPages: action.payload.numberOfPages
        }
        case FETCH_BY_SEARCH:
            console.log(action.payload, "<----------------action")
            return {
                ...state,
                posts: action.payload
            }
                    
        case CREATE :  
        return [...state, action.payload];
        
        case UPDATE : 
        case LIKE: 
        return state.map((st) => st._id === action.payload._id ? action.payload : st );

        case DELETE :  
        return state.filter((post) => post._id !== action.payload);



        default:
            return state; 

    }
}