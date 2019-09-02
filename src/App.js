// eslint-disable-next-line
import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import './assets/style.css'
import PostsService from './services/posts_service'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
  }

  async componentDidMount() {
    const postService = new PostsService()
    this.setState({
      posts: await postService.process()
    })
  }

  render() {
    const { posts } = this.state

    return (
      <div>
        {posts.map(post => (
          <Link to={`posts/${post.slug}`} className="mb-6 p-4 cursor-pointer" key={posts.indexOf(post)}>
            <div className="text-xl font-bold">{post.title}</div>
            <span className="text-sm text-gray-600">{post.description}</span>
          </Link>
        ))}
      </div>
    )
  }
}

export default App
