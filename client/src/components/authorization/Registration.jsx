import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../../actions/user';
import { NavLink } from 'react-router-dom';

import styles from "../../styles/App.module.scss";

const Registration = () => {

  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const isRegistred = useSelector(state => state.user.isRegistred)

  const inputref = useRef();
  const pswrdbtnref = useRef();

  function showPass() {
    if (inputref.current.type === "text") {
      inputref.current.type = "password"
    }
    else {
      inputref.current.type = "text"
    }    

    if (pswrdbtnref.current.className === "pswrd_eye eye_show") {
      pswrdbtnref.current.className = "pswrd_eye eye_hide"
    }
    else {
      pswrdbtnref.current.className = "pswrd_eye eye_show"
    }

  }

  function checkMail() {
    // Перевіряємо валідність введеної email адреси 
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;   //eslint-disable-line          

    if (reg.test(email) === false) {
      document.querySelector("#emailError").innerHTML = "Вкажіть коректний email"
      setTimeout(() => {
        document.querySelector("#emailError").innerHTML = ""
      }, 2500);
    }
    if (!email) {
      document.querySelector("#emailError").innerHTML = "Поле login/email не може бути пустим"
      setTimeout(() => {
        document.querySelector("#emailError").innerHTML = ""
      }, 2500);
    }

  }

  function checkPassword() {
    if (!password) {
      //alert('Пожалуйста, введите email')
      document.querySelector("#passwordError").innerHTML = "Введіть пароль, будь-ласка"
      setTimeout(() => {
        document.querySelector("#passwordError").innerHTML = ""
      }, 2500);
    }
  }

  function RegistraionSend() {
    if (!email) {

      document.querySelector("#emailError").innerHTML = "Поле email не може бути пустим"
      setTimeout(() => {
        document.querySelector("#emailError").innerHTML = ""
      }, 3500);
    }
    if (!password) {

      document.querySelector('#passwordError').innerHTML = "Введіть пароль, будь-ласка"
      setTimeout(() => {
        document.querySelector("#passwordError").innerHTML = ""
      }, 3500);
    }

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; //eslint-disable-line

    if (email && password) {
      if (reg.test(email) !== false) {
        dispatch(registration(name, email, password))
      }
    }
  }



  return (
    <div>
      <h1 className='text-center text-3xl mt-4'>Реєстрація в системі</h1>
      {!isRegistred &&
        <>
          <h2 className='text-center text-xl mt-8'>Будь-ласка, заповніть форму</h2>
          <div className={styles.loginForm}>
            <label>Ім'я та прізвище
              <input value={name} onChange={(event) => setName(event.target.value)}
                type='text' placeholder='як до Вас звертатись' />
              <div id="nameError" className={styles.emailErrorMessage}> </div>
            </label>
            <label>Login/Email
              <input value={email} onChange={(event) => setEmail(event.target.value)}
                onFocus={() => document.querySelector("#emailError").innerHTML = ""}
                onBlur={() => checkMail()} type='text' placeholder='введіть ваш Email' />
              <div id="emailError" className={styles.emailErrorMessage}> </div>
            </label>
            <label className='flex flex-col'>Password
              <div className='relative w-full'>
                <input ref={inputref} value={password} onChange={(event) => setPassword(event.target.value)}
                  onFocus={() => document.querySelector("#passwordError").innerHTML = ""}
                  onBlur={() => checkPassword()} type='password' placeholder='введіть ваш пароль' />
                <button ref={pswrdbtnref} style={{ position: 'absolute', right: '8px', top: '1em' }} onClick={showPass} className='pswrd_eye eye_show'></button>
              </div>
              <div id="passwordError" className={styles.passwordErrorMessage}> </div>
            </label>
            <button onClick={RegistraionSend} className="authorization__btn">Зареєструватися</button>
            <br></br>
            <small className='text-white text-center'>Маєте обліковий запис? <NavLink to='/login' className='underline'>Ласкаво просимо</NavLink>.</small>
          </div>
        </>
      }
      {isRegistred &&
        <>
          <h2 className='text-center text-xl mt-16'>Реєстрація пройшла успішно</h2>
          <div className={styles.registredForm}>Був створений Ваш обліковий запис.<br></br>Тепер спробуйте <NavLink to='/login'>увійти до системи!</NavLink></div>
        </>
      }
    </div>
  )
}

export default Registration;