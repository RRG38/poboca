import "./Nav.css";

import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { updateUser, logout } from "../../redux/reducer";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    axios.get("/api/auth/me").then((res) => this.props.updateUser(res.data));
  }

  logout() {
    axios.post("/api/auth/logout").then((_) => this.props.logout());
  }

  render() {
    return (
      this.props.location.pathname !== "/" && (
        <div className="nav-parent">

            <Link className="nav-links" to="/form">
              <span alt="new post"> New Post </span>
            </Link>

            <Link className="nav-links" to="/dash">
              <span  alt="home"> Home </span>
            </Link>
            <h1 className='title'> Pobooca.app </h1>
            <p className="username">{this.props.username}</p>
          <Link className="nav-links" to="/" onClick={this.logout}>
            <span alt="logout"> Logout </span>
          </Link>

          </div>

      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
  };
};

export default withRouter(
  connect(mapStateToProps, { updateUser, logout })(Nav)
);
