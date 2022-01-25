import "./Post.css";

import React, { Component } from "react";
import axios from "axios";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: "",
      title: "",
      content: "",
      loading: true,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/post/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({ ...res.data, loading: false });
      })
      .catch((err) => {
        console.log(`Error displaying post: ${err}`);
      });
  }

  render() {
    return (
      <div className="post-container">
        {!this.state.loading && this.state.title ? (
          <div className='post-parent'>
            <div className="post-header">
              <div>
              <div className="post-title">{this.state.title}</div>
              <div className="author-box">
                - {this.state.author}
              </div>
              </div>
            </div>
            <div className="post-content-box">
              <div className='post-content'>{this.state.content}</div>
            </div>
          </div>
        ) : !this.state.loading ? (
          <div className="oops-box">
            <div className="title">Oops!</div>
            <div>You have deleted your post.</div>
          </div>
        ) : (
          <div className="load-box">
            <div className="load-background"></div>
            <div className="load"></div>
          </div>
        )}
      </div>
    );
  }
}

export default Post;
