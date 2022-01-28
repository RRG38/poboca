import "./Form.css";

import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    axios
      .post("/api/post", this.state)
      .then(() => this.props.history.push("/dash"))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className='form-master'>
        <div className="form-title">New Post</div>
          <div className="form-content-box">
            <div className="form-main">
              <div className='form-text-box'>What do you want to learn more about:</div>
                <div className="learn-about">
                  <input className="form-input-box"
                  placeholder="example: Javascript, CSS, ReactJS, Redux, etc."
                  value={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                  />
                </div>
              <div className="form-text-box">
              Put in here what resources you have to learn about your topic and the way to contact you: </div>
                <div className='learn-about'>
                  <input className="form-input-box"
                    placeholder="example: A past project, past assignment, CodeWars Kata, etc."
                    value={this.state.content}
                    onChange={(e) => this.setState({ content: e.target.value })}
                  />
                </div>
              <button onClick={this.submit} className="form-dark-button">
              Post
              </button>
              </div>
            </div>
          </div>
        );
  }
}

export default Form;
