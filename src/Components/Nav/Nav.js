import "./Nav.css";

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../../redux/reducer";

const Nav = (props) => {
  console.log(props);

  const logout = () => {
      props.logoutUser();
  }

  return (
      props.location.pathname !== "/" && (
        <div className="nav-parent">
<div className='nav-icons-container'>
            <Link style={{textDecoration: 'none'}} className="nav-links-left" to="/form">
            <div className='material-icons' >add</div>
            </Link>

            <Link style={{textDecoration: 'none'}} className="nav-links-left" to="/dash">
            <div className='material-icons' >home</div>
            </Link>


              <div>

          <Link style={{textDecoration: 'none'}} className="nav-links" to="/" onClick={logout}>
          <div className='material-icons' >logout</div>
          </Link>
            </div>
            </div>
            <div className='bottom-nav'>
            <div className='title'> Pobooca.app </div>
            <div className="username-container">
              <div className="username">: {props.username}</div>
              <div className='nav-school'> {props.school} </div>
              </div>


            </div>
          </div>

      )
    );
  }


const mapDispatchToProps = (reduxState) => {
  return {
    state: reduxState
  };
};

export default withRouter(
  connect(mapDispatchToProps, { logoutUser })(Nav)
);
