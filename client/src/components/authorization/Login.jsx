import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";

import styles from "../../styles/App.module.scss";

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 500);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const inputref = useRef();
  const pswrdbtnref = useRef();

  function showPass() {
    if (inputref.current.type === "text") {
      inputref.current.type = "password";
    } else {
      inputref.current.type = "text";
    }

    if (pswrdbtnref.current.className === "pswrd_eye eye_show") {
      pswrdbtnref.current.className = "pswrd_eye eye_hide";
    } else {
      pswrdbtnref.current.className = "pswrd_eye eye_show";
    }
  }

  function checkMail() {
    // Перевіряємо валідність введеної email адреси
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; //eslint-disable-line

    if (reg.test(email) === false) {
      document.querySelector("#emailError").innerHTML =
        "Вкажіть коректний email";
      setTimeout(() => {
        document.querySelector("#emailError").innerHTML = "";
      }, 2500);
      return false;
    }
    if (!email) {
      document.querySelector("#emailError").innerHTML =
        "Поле login/email не може бути пустим";
      setTimeout(() => {
        document.querySelector("#emailError").innerHTML = "";
      }, 2500);
      return false;
    }
    return true;
  }

  function checkPassword() {
    if (!password) {
      document.querySelector("#passwordError").innerHTML =
        "Введіть пароль, будь-ласка";
      setTimeout(() => {
        document.querySelector("#passwordError").innerHTML = "";
      }, 2500);
      return false;
    }
    return true;
  }

  function LoginSend() {
    // Валідація введеної email адреси та пароля перед відправкою на сервер
    if (checkMail() && checkPassword()) {
      dispatch(login(email, password));
    }
  }

  if (isLoading === true) {
    return (
      <div className="p-3">
        <span className="preloader"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center text-3xl mt-4">Вхід до системи</h1>
      <h2 className="text-center bg text-xl mt-8">
        Будь-ласка, заповніть форму
      </h2>
      <div className={styles.loginForm}>
        <label>
          Login/Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onFocus={() =>
              (document.querySelector("#emailError").innerHTML = "")
            }
            onBlur={() => checkMail()}
            type="text"
            placeholder="введіть ваш Email"
          />
          <div id="emailError" className={styles.emailErrorMessage}></div>
        </label>
        <label className="flex flex-col">
          Password
          <div className="relative w-full">
            <input
              ref={inputref}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onFocus={() =>
                (document.querySelector("#passwordError").innerHTML = "")
              }
              onBlur={() => checkPassword()}
              type="password"
              placeholder="введіть ваш пароль"
            />
            <button
              ref={pswrdbtnref}
              style={{ position: "absolute", right: "8px", top: "1em" }}
              onClick={showPass}
              className="pswrd_eye eye_show"
            ></button>
          </div>
          <div id="passwordError" className={styles.passwordErrorMessage}></div>
        </label>
        <button onClick={LoginSend}>Увійти</button>
        <br></br>
        <small className="text-white text-center">
          Ви тут вперше?{" "}
          <NavLink to="/registration" className="underline">
            Пройдіть реєстрацію
          </NavLink>
          .
        </small>
      </div>
    </div>
  );
};

export default Login;
