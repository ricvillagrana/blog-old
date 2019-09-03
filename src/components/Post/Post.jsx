import React from 'react'
import moment from 'moment'
import { Link }from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import prettify from 'google-code-prettify/bin/run_prettify.min.js'
import PostsService from '../../services/posts_service'
import 'google-code-prettify/bin/prettify.min.css'
import '../../assets/prettify.css'

const RouterLink = props => {
  return (
    props.href.match(/^\//)
      ? <Link to={props.href}>{props.children}</Link>
      : <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>
  )
}

const BackToTop = () => (
  <div className="flex flex-col font-extrabold cursor-pointer w-full items-center mt-10" onClick={() => window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })}>
    🔝 BACK TO TOP 🔝
    <span className="text-5xl font-black">RV</span>
  </div>
)

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

    this.setState({ post })

    Array.prototype.slice.call(document.getElementsByTagName('pre')).forEach(codeTag => {
      codeTag.classList.add('prettyprint')
      codeTag.classList.add('linenums')
      codeTag.classList.add('nocode')
      codeTag.innerHTML = prettify.prettyPrintOne(codeTag.innerHTML)
    })
  }

  render() {
    const { post } = this.state

    return (
      <div className="w-full p-4">
        <header className="mb-6">
          <div className="text-4xl font-bold">
            {post.title}
            <span className="font-medium mx-2 text-sm text-gray-500" title={moment(post.date).format('LLLL')}>{moment(post.date).fromNow()}</span>
          </div>

          <div className="text-sm text-gray-600">{post.description}</div>

          <hr />
        </header>

        <ReactMarkdown
          source={post.body}
          renderers={{
            link: RouterLink
          }}
          escapeHtml={false} />

        <BackToTop />
      </div>
    )
  }
}

export default Post
