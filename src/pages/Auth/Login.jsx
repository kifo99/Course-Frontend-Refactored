/* eslint-disable no-unused-vars */
import { useState } from "react";
import PropTypes from "prop-types";
import Input from "../../components/Form/Input/Input";
import Button from "../../components/Button/Button";
import { required, length, email } from "../../util/validators";
import Auth from "./Auth";

export default function Login({ onLogin, loading }) {
  const [loginForm, setLoginForm] = useState({
    email: {
      value: "",
      valid: false,
      touched: false,
      validators: [required, email],
    },
    password: {
      value: "",
      valid: false,
      touched: false,
      validators: [required, length({ min: 5 })],
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangeHandler = (input, value) => {
    const isValid = loginForm[input].validators.every((validator) =>
      validator(value)
    );

    const updatedForm = {
      ...loginForm,
      [input]: {
        ...loginForm[input],
        value,
        valid: isValid,
      },
    };

    const formValidity = Object.keys(updatedForm).every(
      (key) => updatedForm[key].valid
    );

    setLoginForm(updatedForm);
    setFormIsValid(formValidity);
  };

  const inputBlurHandler = (input) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [input]: {
        ...prevState[input],
        touched: true,
      },
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onLogin(e, {
      email: loginForm.email.value,
      password: loginForm.password.value,
    });
  };

  return (
    <Auth>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="Your E-Mail"
          type="email"
          control="input"
          onChange={(e) => inputChangeHandler("email", e.target.value)}
          onBlur={() => inputBlurHandler("email")}
          value={loginForm.email.value}
          valid={loginForm.email.valid}
          touched={loginForm.email.touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={(e) => inputChangeHandler("password", e.target.value)}
          onBlur={() => inputBlurHandler("password")}
          value={loginForm.password.value}
          valid={loginForm.password.valid}
          touched={loginForm.password.touched}
        />
        <Button design="raised" type="submit" loading={loading}>
          Login
        </Button>
      </form>
    </Auth>
  );
}

Login.propTypes = {
  loading: PropTypes.bool,
  onLogin: PropTypes.func,
};
