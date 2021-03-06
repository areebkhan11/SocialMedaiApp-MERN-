import {AUTH, LOGOUT} from '../../constants/actionTypes'


const authReducers = (state = {authData: null}, action) =>{

    switch(action.type){
        case AUTH:
            localStorage.setItem('profile' , JSON.stringify({...action.data}))
            return {...state, authData: action?.data}
            break;
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: action?.data}
            break;
        
        default:
            return state;
    }


}

export default authReducers;