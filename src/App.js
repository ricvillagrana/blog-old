// eslint-disable-next-line
import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import './App.css'
import './assets/style.css'
import PostsService from './services/posts_service'

const Post = props => {
  const { post } = props

  return (
    <Link to={`posts/${post.slug}`} className="w-full mb-2 p-4 cursor-pointer rounded text-gray-800 hover:text-gray-900 hover:no-underline hover:bg-gray-200 transition">
      <div className="flex flex-col md:flex-row text-xl font-bold items-baseline text-black">
        {post.title}
        <span className="text-sm md:mx-2 font-medium text-gray-500" title={moment(post.date).format('LLLL')}>{moment(post.date).fromNow()}</span>
      </div>
      <div className="text-sm text-gray-600">{post.description}</div>
    </Link>
  )
}

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
      <>
        {posts.map(post => <Post post={post} key={posts.indexOf(post)} />)}
      </>
    )
  }
}

export default App
