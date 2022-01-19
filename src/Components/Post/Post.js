import "./Post.css";

import React, { Component } from "react";
import axios from "axios";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: "",
      author_pic: "",
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
      <div className="post content-box">
        {!this.state.loading && this.state.title ? (
          <div>
            <div className="post-header">
              <h2 className="title">{this.state.title}</h2>
              <div className="author-box">
                <p>by {this.state.author}</p>
                <img src={this.state.author_pic} alt="author" />
              </div>
            </div>
            <div className="post-content-box">
              <p>{this.state.content}</p>
            </div>
          </div>
        ) : !this.state.loading ? (
          <div className="oops-box">
            <h2 className="title">Oops!</h2>
            <p>Looks like this post doesn't exist anymore</p>
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
