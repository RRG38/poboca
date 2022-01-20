import "./Auth.css";

import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "../../redux/reducer";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMsg: "",
    };
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val,
    });
  }

  login() {
    const { username, password } = this.state;
    axios
      .post("/api/auth/login", this.state)
      .then((res) => {
        this.props.updateUser({ username, password });
        this.props.history.push("/dash");
      })
      .catch((err) => {
        console.log(err);
        this.setState({ errorMsg: "Incorrect username or password!" });
      });
  }

  register() {
    const { username, password } = this.state;
    axios
      .post("/api/auth/register", this.state)
      .then((res) => {
        this.props.updateUser({ username, password });
        this.props.history.push("/dash");
      })
      .catch((err) => {
        console.log(err);
        this.setState({ errorMsg: "Username taken!" });
      });
  }

  closeErrorMessage = () => {
    this.setState({
      errorMsg: false,
      username: "",
      password: "",
    });
  };

  render() {
    return (
      <div className="auth-parent">
        <header className='auth-header'>
          Poboca.app
        </header>
        <section className='section-parent'>
          <h1> A web app for post-bootcamp students. </h1>
        </section>
        <div className='register-container'>
          {this.state.errorMsg && (
            <h3 className="auth-error-msg">
              {this.state.errorMsg}{" "}
              <span onClick={this.closeErrorMessage}>X</span>
            </h3>
          )}
          <h3 className='auth-description'> Find others who want to continue to learn as we interview and find paying work.</h3>
          <p> Want a free account? </p>
          <input
            value={this.state.username} placeholder="Username"
            onChange={(e) => this.handleChange("username", e.target.value)}
          />
          <input
            value={this.state.password}
            type="password"
            placeholder="Password"
            onChange={(e) => this.handleChange("password", e.target.value)}
          />
          <div className="auth-button-container">
            <button className="dark-button" onClick={this.login}>
              {" "}
              Login{" "}
            </button>
            <button className="dark-button" onClick={this.register}>
              {" "}
              Register{" "}
            </button>
          </div>
        </div>
      </div>
      )
  }
}

export default connect(null, { updateUser })(Auth);
