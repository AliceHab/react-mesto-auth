import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";

function Register() {
  const { values, handleChange } = useForm({ email: "", password: "" });
  const [showInfo, setShowInfo] = React.useState(false);
  const [textInfo, setTextInfo] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState(false);
  const navigate = useNavigate();

  function closeInfo() {
    setShowInfo(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    auth
      .registerUser(values.password, values.email)
      .then((res) => {
        if (res) {
          setShowInfo(true);
          setIsRegister(true);
          setTextInfo("Вы успешно зарегистрировались");
          setTimeout(() => {
            navigate("/signin", { replace: true });
          }, 2000);
        }
      })
      .catch((err) => {
        setShowInfo(true);
        setIsRegister(false);
        console.error(err);
      });
  }

  return (
    <div className="sign">
      <p className="sign__title">Регистрация</p>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input
          className="sign__input"
          placeholder="Email"
          required
          id="email"
          name="email"
          type="text"
          onChange={handleChange}
        />
        <input
          className="sign__input"
          placeholder="Пароль"
          required
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
        />
        <input type="submit" className="sign__button" value="Зарегистрироваться" />
      </form>
      <div className="sign__redirect">
        <p className="sign__link">Уже зарегистрированы?⠀</p>
        <Link to="/signin" className="sign__link">
          Войти
        </Link>
      </div>
      <InfoTooltip
        showInfo={showInfo}
        isSuccess={isRegister}
        onClick={closeInfo}
        message={textInfo}
      />
    </div>
  );
}

export default Register;
