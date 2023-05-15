import React, { useEffect } from "react";
import Navbar from "./navbar/Navbar";
import './app.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/user";

import About from "./about/About";
import Feed from "./feed/Feed";
import News from "./news/News";
import AddNew from "./news/AddNew";
import EditNews from "./news/EditNews";


function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  //console.log(isAuth);

  const currentUser = useSelector(state => state.user.currentUser)
  //console.log(currentUser);
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth());
    
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
    <div className="app"> 
      <Navbar/>          
      <div className="wrap">
      
        {!isAuth && 
        <Routes>
          <Route path='/login' element={<Login/>}/>                    
          <Route path='/registration' element={<Registration/>}/>                    
          <Route path='/about' element={<About/>}/>                    
          <Route path='/feed' element={<Feed/>}/>
          <Route path="*" element={<Navigate to="/login" />} />          
        </Routes>  
        }         
        {isAuth && 
        <Routes>          
          <Route path='/news' element={<News/>}/>
          <Route path='/news/add' element={<AddNew />}/>
          <Route path='/news/edit' element={<EditNews />}/>
          {/* <Route path='/add' element={<AddNew />}/>           */}
          <Route path='/feed' element={<Feed/>}/> 
          <Route path='/about' element={<About/>}/>         
          <Route path="*" element={<Navigate to="/feed" />} />
        </Routes>  
        }        
      </div>      
    </div>
    </BrowserRouter>    
  );  
}
export default App;
