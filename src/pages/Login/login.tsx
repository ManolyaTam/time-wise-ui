import "./login.css";
import React from "react";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import Checkbox from "../../components/checkbox/checkbox";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/user/login.hook";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const loginHook = useLogin();
  return (
    <div className="login" id="login-container">
      <div className="login-logo" id="login-logo">
        <img src="logo.png" alt="logo" width={70} id="logo-image" />
        <div className="logo-text" id="logo-text">
          <h4 id="logo-title">Time Wise</h4>
          <h5 id="logo-subtitle">Track your time wisely</h5>
        </div>
      </div>
      <h3 id="welcome-message">Welcome Back!</h3>
      <form onSubmit={loginHook.submitHandler} id="login-form">
        <Input
          name="email"
          label="Email"
          type="email"
          required
          id="email-input"
        />
        <Input
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          required
          id="password-input"
        />
        <Checkbox
          label="Show Password"
          style={{ color: "var(--primary-color)" }}
          checked={showPassword}
          setChecked={setShowPassword}
          id="show-password-checkbox"
        />
        <Button label="Log in" primary id="login-button" />
        <Link to="/signup" id="signup-link">
          Don't have an account?
        </Link>
      </form>
    </div>
  );
};

export default Login;
