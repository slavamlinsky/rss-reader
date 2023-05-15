import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';

import styles from "../../styles/App.module.scss";

const Navbar = () => {
  
  const dispatch = useDispatch()

  const isAuth = useSelector(state => state.user.isAuth)
  // const isRegistred = useSelector(state => state.user.isRegistred)

  const currentUser = useSelector(state => state.user.currentUser)
  const userName = currentUser?.name
  
  function logoutHadler() {
    dispatch(logout())
  }

  return (
    <div className='w-full bg-slate-300 pt-3'>
      <div className='container flex justify-between m-auto items-center pb-1'>
        <div className={styles.logo}>        
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
          </svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 sm:w-12 sm:h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
          </svg>
          <span className="text-lg sm:text-2xl font-primary -tracking-wide">
            RSS Reader
            <span className="text-xs sm:text-sm block tracking-wide -mt-1"><span className='bg-yellow-200 w-1 h-1 rounded-full animate-pulse'></span> Keep In Touch <span className='bg-yellow-200 w-1 h-1 rounded-full animate-pulse hidden md:inline-block'></span></span>
            {/* <span className="text-sm block tracking-wide" style={{fontSize: '10px'}}>{API_URL}</span> */}
          </span>
        </div>
        <div className={styles.navmenu}>
          <nav>            
            <NavLink className={styles.navlink} to="/about">Про проект</NavLink>
            <NavLink className={styles.navlink} to="/feed">RSS стрічка</NavLink>
            {isAuth && <NavLink className={styles.navlink} to="/news">Мої новини</NavLink>}            
          </nav>
        </div>
        <div className={styles.navbtns}>
          {!isAuth &&
            <NavLink className='flex bg-teal-400 hover:bg-cyan-600 rounded-xl py-3 pl-4 pr-2' to="/login">Вхід
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block mr-2 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg></NavLink>}


          {isAuth && <div className='flex items-center text-xs sm:text-sm'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            {userName}</div>}
          {isAuth && <button className='flex bg-teal-500 hover:bg-cyan-600 rounded-xl py-2 pl-3 pr-2 mx-1' onClick={logoutHadler}>
            Вийти<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>}
        </div>        
      </div>
      <div className='bg-slate-100 mt-1 mb-0 flex justify-around items-center text-center w-full sm:hidden px-1'>          
            <NavLink className={styles.navlink} to="/about">Про проект</NavLink>
            <NavLink className={styles.navlink} to="/feed">RSS стрічка</NavLink>
            {isAuth && <NavLink className={styles.navlink} to="/news">Мої новини</NavLink>}                      
        </div>
    </div>
  )
}

export default Navbar;