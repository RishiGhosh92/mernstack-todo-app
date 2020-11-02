import React from 'react';
import axios from 'axios';

import './App.css'

class App extends React.Component {
  state = {
    title: '',
    body: '',
    posts: []
  };
  componentDidMount = () => {
    this.getBlogPost();
  }
  getBlogPost = () => {
    axios.get('/api')
    .then((response) => {
      const data = response.data;
      this.setState({
        posts: data
      });
      console.log('Data has been received');
    })
    .catch(() => {
      alert('Error receiving data');
    });
  };
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value
    })
  };
  resetUserInputs = () => {
    this.setState({
      title: '',
      body: ''
    });
  };
  displayBlogPost = posts => {
    if(!posts.length) return null;
    return posts.map((post, index) => (
      <div key={index} className="blog-post__display">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  };
  submit = (event) => {
    event.preventDefault();
    const payload = {
      title: this.state.title,
      body: this.state.body
    };
    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
    .then(() => {
      console.log('Data has been sent to server');
      this.resetUserInputs();
      this.getBlogPost();
    })
    .catch(() => {
      console.log('Internal server error');
    });
  };
  render () {
    console.log('State: ', this.state);
    return (
      <div className="app">
        <h2>Welcome to todo App</h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input
              type="text"
              name="title"
              placeholder="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea 
              placeholder="body"
              name="body"
              cols="30"
              rows="10"
              value={this.state.body}
              onChange={this.handleChange}
            />
          </div>
          <button>Submit</button>
        </form>
        <div className="blog">
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    );
  }
}

export default App;