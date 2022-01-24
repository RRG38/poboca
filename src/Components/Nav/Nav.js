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
          <div className='nav-links-container'>
            <Link style={{textDecoration: 'none'}} className="nav-links-left" to="/form">
            <div className='material-icons' >add</div>
            </Link>
            <Link style={{textDecoration: 'none'}} className="nav-links-left" to="/dash">
            <div className='material-icons' >home</div>
            </Link>
          <Link style={{textDecoration: 'none'}} className="nav-links" to="/" onClick={this.logout}>
          <div className='material-icons' >logout</div>
          </Link>
            </div>
        <div className='nav-title-user-container'>
            <div className='title'> Pobooca.app </div>
            <div className="username-container">
              <div className="username">: {this.props.username}</div>
              <div className='nav-school'> {this.props.school} </div>

            </div>
            </div>
          </div>
      )
    );
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.username,
    school: state.school
  };
};

export default withRouter(
  connect(mapStateToProps, { updateUser, logout })(Nav)
);