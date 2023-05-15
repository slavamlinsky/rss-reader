const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"
const REGISTRED = "REGISTRED"

const defaultState ={
    currentUser: {},
    isAuth: false,    
    isRegistred: false
}

export default function userReducer(state = defaultState, action){
    switch(action.type){
        case SET_USER:
            return{
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return{
                ...state,
                currentUser: {},
                isAuth: false
            }
        case REGISTRED:
            //тут можно ещё какой-то функционал прописать...
            return{
                ...state,
                currentUser: action.payload,
                isRegistred: true                
            }        
        default:
            return state
    }
}

export const setUser = (user) => ({type: SET_USER, payload: user})
export const logout = () => ({type: LOGOUT})
export const registred = (user) => ({type: REGISTRED, payload: user})

