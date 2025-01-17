import { useState } from "react";
import PropTypes from "prop-types";
import Input from "../../components/Form/Input/Input";
import Button from "../../components/Button/Button";
import { required, length, email } from "../../util/validators";
import Auth from "./Auth";

export default function Signup({ onSignup, loading }) {
  const [signupForm, setSignupForm] = useState({
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
    name: {
      value: "",
      valid: false,
      touched: false,
      validators: [required],
    },
  });

  // eslint-disable-next-line no-unused-vars
  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangeHandler = (input, value) => {
    const isValid = signupForm[input].validators.every((validator) =>
      validator(value)
    );

    const updatedForm = {
      ...signupForm,
      [input]: {
        ...signupForm[input],
        value,
        valid: isValid,
      },
    };

    const formValidity = Object.keys(updatedForm).every(
      (key) => updatedForm[key].valid
    );

    setSignupForm(updatedForm);
    setFormIsValid(formValidity);
  };

  const inputBlurHandler = (input) => {
    setSignupForm((prevState) => ({
      ...prevState,
      [input]: {
        ...prevState[input],
        touched: true,
      },
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSignup(e, signupForm);
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
          value={signupForm.email.value}
          valid={signupForm.email.valid}
          touched={signupForm.email.touched}
        />
        <Input
          id="name"
          label="Your Name"
          type="text"
          control="input"
          onChange={(e) => inputChangeHandler("name", e.target.value)}
          onBlur={() => inputBlurHandler("name")}
          value={signupForm.name.value}
          valid={signupForm.name.valid}
          touched={signupForm.name.touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={(e) => inputChangeHandler("password", e.target.value)}
          onBlur={() => inputBlurHandler("password")}
          value={signupForm.password.value}
          valid={signupForm.password.valid}
          touched={signupForm.password.touched}
        />
        <Button design="raised" type="submit" loading={loading}>
          Signup
        </Button>
      </form>
    </Auth>
  );
}

Signup.propTypes = {
  onSignup: PropTypes.func,
  loading: PropTypes.bool,
};
