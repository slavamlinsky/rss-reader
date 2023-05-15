const SHOW_PRELOADER = 'SHOW_PRELOADER'
const HIDE_PRELOADER = 'HIDE_PRELOADER'
const ERROR = 'ERROR'

const defaultState ={
    loader: false,
    error: ''
}

export default function appReducer(state = defaultState, action){
    switch(action.type){
        case SHOW_PRELOADER: return {...state, loader: true}
        case HIDE_PRELOADER: return {...state, loader: false}
        case ERROR:
            return{
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export const showPreloader = () => ({type: SHOW_PRELOADER})
export const hidePreloader = () => ({type: HIDE_PRELOADER})

export const getError = (message) => ({type: ERROR, payload: message})