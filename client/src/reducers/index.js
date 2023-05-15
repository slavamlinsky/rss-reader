import {combineReducers} from "redux"
import {configureStore} from '@reduxjs/toolkit'
import postReducer from "./postReducer"
import userReducer from "./userReducer"
import appReducer from "./appReducer"

const rootReducer = combineReducers({
    user: userReducer,    
    posts: postReducer,    
    app: appReducer
})

export const store = configureStore({reducer: rootReducer})


