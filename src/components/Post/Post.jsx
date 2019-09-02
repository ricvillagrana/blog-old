import React from 'react'
import ReactMarkdown from 'react-markdown'
import PostsService from '../../services/posts_service'

class Post extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      post: {}
    }
  }

  async componentDidMount() {
    const { slug } = this.props.match.params
    const postService = new PostsService()
    const posts = await postService.process()
    const post = posts.find(post => post.slug === slug)
    console.log(posts)

    this.setState({ post })
  }

  render() {
    const { post } = this.state
    return (
      <div>
        {post.title}
        <ReactMarkdown source={post.body}></ReactMarkdown>
      </div>
    )
  }
}

export default Post
