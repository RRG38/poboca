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
          <div>
            <div className="post-header">
              <div className="post-title">{this.state.title}</div>
              <div className="author-box">
                <div>: {this.state.author}</div>
              </div>
            </div>
            <div className="post-content-box">
              <div>{this.state.content}</div>
            </div>
          </div>
        ) : !this.state.loading ? (
          <div className="oops-box">
            <div className="title">Oops!</div>
            <div>Looks like this post doesn't exist anymore</div>
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
