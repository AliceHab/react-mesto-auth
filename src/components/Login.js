import React from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";

function Login({ isLoggedIn, setIsLogged }) {
  const { values, handleChange } = useForm({ email: "", password: "" });
  const [showInfo, setShowInfo] = React.useState(false);
  const [textInfo, setTextInfo] = React.useState("");

  const navigate = useNavigate();

  function closeInfo() {
    setShowInfo(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    auth
      .loginUser(values.password, values.email)
      .then((res) => {
        if (res) {
          setShowInfo(true);
          setIsLogged(true);
          setTextInfo("Входим...");
          localStorage.setItem("jwt", res.token);
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 2000);
        }
      })
      .catch((err) => {
        setShowInfo(true);
        setIsLogged(false);
        console.error(err);
      });
  }

  return (
    <div className="sign">
      <p className="sign__title">Вход</p>
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
        <input type="submit" className="sign__button" value="Войти" />
      </form>
      <InfoTooltip
        showInfo={showInfo}
        onClick={closeInfo}
        message={textInfo}
        isSuccess={isLoggedIn}
      />
    </div>
  );
}

export default Login;
