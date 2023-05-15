import axios from 'axios'
import { setUser, registred } from '../reducers/userReducer'
import {API_URL} from "../config";
import { getError } from '../reducers/appReducer';

// registration - регистрация нового пользователя БД
export const registration = (name, email, password) => {
    
    return async dispatch => {
      try {
        const params = { name, email, password };
        const response = await axios.post(
          `${API_URL}api/auth/registration`,
          params
        );
        if (response.status === 200) {
          //alert("Користувач зареєстрований вдало!");
          dispatch(registred(response.data.user));
        }

        console.log(response.data);
      } catch (e) {
        if (e.response.data.message === "Incorrect request") {
          document.querySelector("#passwordError").innerHTML =
            "Невдалий запит. Спробуйте пізніше.";
          setTimeout(() => {
            document.querySelector("#passwordError").innerHTML = "";
          }, 3500);
        }

        if (e.response.data.message === "Server Error") {
          document.querySelector("#passwordError").innerHTML =
            "Сталася помилка. Сервер недоступний.";
          setTimeout(() => {
            document.querySelector("#passwordError").innerHTML = "";
          }, 3500);
        }

        if (e.response.data.message === "User already exists") {
          document.querySelector("#emailError").innerHTML =
            "Такий email в системі вже існує, спробуйте інший";
          setTimeout(() => {
            document.querySelector("#emailError").innerHTML = "";
          }, 3500);
        }
      }
    }   
    
}

// login - авторизация пользователя в системе
export const login = (email, password) => {
    return async dispatch => {
        try {            
            const params = {email, password}    
            const response = await axios.post(`${API_URL}api/auth/login`, params)                    
            dispatch(setUser(response.data.user))
            dispatch(getError(""))

            localStorage.setItem('token', response.data.token)
            
        } catch (e) {            
            dispatch(getError(e.response.data.message)) 
            setTimeout(() => {
                dispatch(getError(""))                
              }, 3500);    
        }
    }    
}

// auth - авторизация пользователя в системе
export const auth = () => {
        
    //добавить проверку для показа формы во время загрузки
    return async dispatch => {
        if(localStorage.getItem('token')!==null){
            try {    
                const response = await axios.get(`${API_URL}api/auth/auth`, 
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
                )
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.token)
                
            } catch (e) {                
                localStorage.removeItem('token')
            } 
        }        
    }    
}

