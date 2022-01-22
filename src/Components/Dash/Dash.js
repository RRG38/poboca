import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Dash.css";

class Dash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      myPosts: true,
      oldestFirst: false,
      posts: [],
      loading: true,
    };

    this.grabPosts = this.grabPosts.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.grabPosts();
  }

  grabPosts() {
    let { search, myPosts, oldestFirst } = this.state;
    let url = "/api/posts";
    if (myPosts && !search) {
      oldestFirst ? (url += "?mine=true&oldest=true") : (url += "?mine=true");
    } else if (!myPosts && search) {
      oldestFirst
        ? (url += `?search=${search}&oldest=true`)
        : (url += `?search=${search}`);
    } else if (myPosts && search) {
      oldestFirst
        ? (url += `?mine=true&search=${search}&oldest=true`)
        : (url += `?mine=true&search=${search}`);
    } else {
      if (oldestFirst) {
        url += "?oldest=true";
      }
    }
    axios.get(url).then((res) => {
      this.setState({ posts: res.data, loading: false });
    });
  }

  deletePost = (id) => {
    axios.delete(`/api/post/${id}`).then((_) => this.grabPosts());
  };

  reset() {
    let { myPosts } = this.state;
    let url = "/api/posts";
    if (myPosts) {
      url += "?mine=true";
    }
    axios.get(url).then((res) => {
      this.setState({ posts: res.data, loading: false, search: "" });
    });
  }

  render() {
    let { loading, search, posts, myPosts, oldestFirst } = this.state;

    let mappedPosts = posts.map((post) => {
      const id = post.post_id;
      const intID = +id;
      return (
        <div className="content-box-dash-post-box" key={post.post_id}>
          <Link style={{textDecoration: 'none'}} className='my-post-title' to={`post/${intID}`}>
            <div>{post.title}</div>
          </Link>
          {post.author_username === this.props.username ? (
            <button className='dash-delete-button' onClick={(_) => this.deletePost(post.post_id)}>
              Delete your Post
            </button>
          ) : (
            <div className="author-box">
              <div className='author-text'>- {post.author_username}</div>
              <div className='dash-school-text'> {this.props.school}</div>
            </div>
          )}
        </div>
      );
    });

    return (
      <div className='master-dash'>
        <div className='dash-new'> Add a topic you want to learn more about! </div>
      <div className="dash">
        <div className="content-box-dash-filter">
          <div className="dash-search-box">
            <div className='dash-search'> Search for Topics </div>
            <input
              value={search}
              onChange={(e) => this.setState({ search: e.target.value })}
              className="dash-search-bar"
              placeholder="example: React, React Hooks, ReactJS, CSS Mastery"
            />
            <div className='dash-buttons-container'>
            <button onClick={this.grabPosts} className="dash-dark-button">
              Search
            </button>
            <button onClick={this.reset} className="dash-dark-button">
              Reset
            </button>
            </div>
          </div>

          <div className='dash-check-box-container'>
          <div className="dash-check-box">
            <p>Show My Posts</p>
            <input
              checked={myPosts}
              onChange={(_) =>
                this.setState({ myPosts: !myPosts }, this.grabPosts)
              }
              type="checkbox"
            />
          </div>
          <div className="dash-check-box">
            <p>Oldest to Newest</p>
            <input
              checked={oldestFirst}
              onChange={(_) =>
                this.setState({ oldestFirst: !oldestFirst }, this.grabPosts)
              }
              type="checkbox"
            />
          </div>
          </div>
        </div>
        <div className="content-box dash-posts-container">
          {!loading ? (
            mappedPosts
          ) : (
            <div className="load-box">
              <div className="load-background"></div>
              <div className="load"></div>
            </div>
          )}
        </div>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Dash);
