import "./signup.css";
import React from "react";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/user/signup.hook";

const Signup = () => {
  const signupHook = useSignup();
  return (
    <div className="signup" id="signup-container">
      <div className="signup-logo" id="signup-logo">
        <img src="logo.png" alt="logo" width={70} id="logo-image" />
        <div className="logo-text" id="logo-text">
          <h4 id="logo-title">Time Wise</h4>
          <h5 id="logo-subtitle">Track your time wisely</h5>
        </div>
      </div>
      <h3 id="welcome-message">Create an Account</h3>
      <form onSubmit={signupHook.submitHandler} id="signup-form">
        <Input
          name="email"
          label="Email"
          type="email"
          required
          id="signup-email-input"
        />
        <Input
          name="password"
          label="Password"
          type="password"
          required
          id="signup-password-input"
        />
        <Input
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          required
          id="signup-confirm-password-input"
        />
        <Button label="Sign Up" primary id="signup-button" />
        <Link to="/login" id="login-link">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default Signup;
