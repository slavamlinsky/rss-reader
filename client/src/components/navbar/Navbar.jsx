import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";

import styles from "../../styles/App.module.scss";

const Navbar = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.user.isAuth);

  const currentUser = useSelector((state) => state.user.currentUser);
  const userName = currentUser?.name;

  function logoutHadler() {
    dispatch(logout());
  }

  return (
    <div className="w-full bg-slate-300 pt-3">
      <div className="container flex justify-between m-auto items-center pb-1 md:pb-3 w-12/12 md:w-full px-1">
        <div className={styles.logo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 sm:w-12 sm:h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
            />
          </svg>
          <span className="text-lg sm:text-2xl font-primary -tracking-wide">
            RSS Reader
            <span className="text-xs sm:text-sm block tracking-wide -mt-1">
              <span className="bg-yellow-200 w-1 h-1 rounded-full animate-pulse"></span>{" "}
              Keep In Touch{" "}
              <span className="bg-yellow-200 w-1 h-1 rounded-full animate-pulse hidden md:inline-block"></span>
            </span>
          </span>
        </div>
        <div className={styles.navmenu}>
          <nav>
            <NavLink className={styles.navlink} to="/about">
              Про проект
            </NavLink>
            <NavLink className={styles.navlink} to="/feed">
              RSS стрічка
            </NavLink>
            {isAuth && (
              <NavLink className={styles.navlink} to="/news">
                Мої новини
              </NavLink>
            )}
          </nav>
        </div>
        <div className={styles.navbtns}>
          {!isAuth && (
            <NavLink
              className="flex bg-teal-400 hover:bg-cyan-600 rounded-xl py-2 pl-4 pr-2"
              to="/login"
            >
              Вхід
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline-block mr-2 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>
            </NavLink>
          )}

          {isAuth && (
            <div className="flex items-center text-xs sm:text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              {userName}
            </div>
          )}
          {isAuth && (
            <button
              className="flex bg-teal-500 hover:bg-cyan-600 rounded-xl py-2 pl-3 pr-2 mx-1"
              onClick={logoutHadler}
            >
              Вийти
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline-block ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="bg-slate-100 mt-1 mb-0 flex justify-around items-center text-center w-full sm:hidden px-1 py-1">
        <NavLink className={styles.navlink} to="/about">
          Про проект
        </NavLink>
        <NavLink className={styles.navlink} to="/feed">
          RSS стрічка
        </NavLink>
        {isAuth && (
          <NavLink className={styles.navlink} to="/news">
            Мої новини
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
