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
        <div className="nav">
          <div className="nav-profile-container">
            <div
              className="nav-profile-pic"
              style={{
                backgroundImage: `url(${this.props.profilePic})`,
              }}
            ></div>
            <p>{this.props.username}</p>
          </div>
          <div className="nav-links">
            <Link to="/dash">
              <span className="material-icons-outlined" alt="home">
                menu
              </span>
            </Link>
            <Link to="/form">
              <span className="material-icons-outlined" alt="new post">
                add
              </span>
            </Link>
          </div>
          <Link to="/" onClick={this.logout}>
            <span className="material-icons-outlined" alt="logout">
              logout
            </span>
          </Link>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    profilePic: state.profilePic,
  };
};

export default withRouter(
  connect(mapStateToProps, { updateUser, logout })(Nav)
);
