import "./Auth.css";

import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { loginUser } from "../../redux/reducer";

const Auth = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [school, setSchool] = useState('')
  const [errorMsg, setErrorMsg] = useState('')


  const login = () => {
      const loginInfo = { username, password }
      props.loginUser(loginInfo);
      props.history.push('/dash')
  }

  const register = () => {

    const userInfo = {
        username, password, school
    }

    axios.post('/auth/register', userInfo )
        .then(res => {
            console.log(res.data);
            props.history.push('/dash')
            // const newUsername = res.data.username;
            // const loginInfo = { newUsername, password };
            // props.loginUser(loginInfo);
            // setShowConfirmationScreen(true);
        })
        .catch(err => console.log(err))
}

const closeErrorMessage = () => {
  setErrorMsg({
    errorMsg: false,
    username: "",
    password: "",
    school: ''
  });

};
  return (
      <div className="auth-parent">
        <div className='auth-header'>
          Pobooca.app
        </div>
        <div className='section-parent'>
          <div>
          A web app for post-bootcamp students.
        </div>
        </div>
        <div className='register-container'>
          {errorMsg && (
            <h3 className="auth-error-msg">
              {errorMsg}{" "}
              <span onClick={closeErrorMessage}>X</span>
            </h3>
          )}
          <div className='auth-description'> Continue to learn as we interview and find jobs.</div>
          <div className='auth-free'> Want a free account? </div>

          <input className="auth-input"
            value={school}
          placeholder="Bootcamp Attended"
            onChange={(e) => setSchool(e.target.value)}
          />
            <input className="auth-input"
              value={username} placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input className="auth-input"
              value={password}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

          <div className="auth-button-container">
            <button className="dark-button" onClick={login}>
              {" "}
              Login{" "}
            </button>
            <button className="dark-button" onClick={register}>
              {" "}
              Register{" "}
            </button>
          </div>
        </div>
      </div>
      )
  }


const mapStateToProps = (reduxState) => {
  return {
    state: reduxState.state
  }
}

const mapDispatchToProps = { loginUser }

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
