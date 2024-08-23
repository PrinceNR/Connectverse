import React, { useState } from "react";
import "./App.css";
import googleIcon from "./assets/chrome-bg.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey , faEnvelope} from '@fortawesome/free-solid-svg-icons'


function App() {
  
  const [name, setName ] = useState("");
  const [email, setEmail ] = useState("");
  const [password, setPassword ] = useState("");

  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };
  const [formData, setFormData] = useState({
    name: name,
    email: email,
    password: password,
  });

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setError({...error, email: ""});

  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setError({...error, password: ""});

  }
  const handleUserName = (e) => {
    setName(e.target.value);
    setError({...error, name: ""});
  }

  const [error, setError] = useState({
    name : "",
    email : "",
    password : "",
  })



  return (
    <>
      <div className="auth-container">
        <div className="logo">MelodyVerse</div>
        <h2>Welcome Back!</h2>

        <form className="auth-form">
          {modal && (
            <div className="input-group">
              <FontAwesomeIcon className="icon" icon={faUser} />
              <input type="text" placeholder="User Name" onChange={handleUserName} required />
              <span className="error">{error.name}</span>
            </div>
          )}  
          <div className="input-group">
            <FontAwesomeIcon className="icon" icon={faEnvelope} />
            <input type="email" placeholder="Email Address" onChange={handleEmail} required />
            <span className="error">{error.email}</span>
          </div>

          <div className="input-group">
            <FontAwesomeIcon className="icon" icon={faKey} />
            <input type="password" placeholder="Password" onChange={handlePassword} required />
            <span className="error">{error.password}</span>
    
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {
            modal ?  <button type="submit" className="btn primary outln-btn">Signup</button> 
                   : <button type="submit" className="btn primary">  Login </button>
          } 

         
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>

          <div className="social-login">
            <p>Or</p>
            <button className="btn social-btn google-btn">
              <img src={googleIcon} className="googleIcon" alt="" /> Signup With
              Google
            </button>
          </div>

          <p className="signup-link">
            {modal ? "Already " : "Don't "}
            have an account?{" "}
            <a href="#" onClick={handleModal}>
              {modal ? "Login" : "Sign Up"}
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default App;
