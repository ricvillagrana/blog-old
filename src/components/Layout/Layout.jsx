import React, { useState } from 'react'
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom'
import _ from 'lodash'
import PostsService from '../../services/posts_service'

const HamburguerMenu = (props) => (
  <div className={`modal-${props.open ? 'open' : 'closed'} transition-long flex md:hidden flex-col top-0 right-0 bg-black h-full w-full fixed`}>
    <div className="font-bold text-2xl mb-3 mt-8 px-6 cursor-pointer">
      <Link className="text-white font-bold hover:text-gray-100" onClick={props.switchModal} to="/">Blog | ricvillagrana</Link>
    </div>

    <span onClick={props.switchModal} className="flex self-end absolute top-0 text-white pt-8 pr-6 cursor-pointer md:hidden">
      Close
    </span>

    <div className="flex flex-col items-center">
      {props.menu.map(item => (
        <Link key={props.menu.indexOf(item)} onClick={props.switchModal} to={item.link} className="py-2 w-full text-center uppercase font-bold text-white hover:text-gray-100 text-md">
          {item.text}
        </Link>
      ))}
    </div>
  </div>
)

const TagFilter = (props) => {
  const defaultName = 'All'
  const { tags, history } = props
  const [open, setOpen] = useState(false)

  const selectTag = (tag) => {
    tag === defaultName
      ? history.push('/')
      : history.push(`/tag/${tag}`)

    setOpen(false)
  }

  return (
    <button onClick={() => setOpen(!open)} onBlur={() => setOpen(false)} className="flex flex-col self-end items-end w-full items-center md:w-auto border border-gray-300 rounded cursor-pointer py-1">
      <div className="w-full bg-white font-semibold text-gray-600 hover:text-gray-700 px-4">
        Filter
      </div>
      <div className="absolute mt-8 w-full left-0 self-end px-6 md:w-auto md:left-auto md:px-0">
        {open && (
          <div className="w-full h-128 overflow-scroll md:w-auto mt-2 py-2 bg-white border border-gray-300 shadow-lg rounded cursor-pointer">
            <p onClick={() => selectTag(defaultName)} className="md:text-right mb-0 px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-primary-200">{defaultName}</p>
            {_.uniq(tags).map(tag => <p onClick={() => selectTag(tag)} className="md:text-right mb-0 px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-primary-200" key={tag}>{tag}</p>)}
          </div>
        )}
      </div>
    </button>
  )
}

class Layout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      menu: [
        { link: '/', text: 'All posts' },
        { link: '/about', text: 'About' }
      ],
      modal: {
        open: false
      },
      tags: [],
    }

    this.switchModal = this.switchModal.bind(this)
  }

  switchModal() {
    this.setState({
      ...this.state,
      modal: {
        open: !this.state.modal.open
      }
    })
  }

  async componentDidMount() {
    const postService = new PostsService()
    const posts = await postService.process()

    this.setState({
      ...this.state,
      tags: posts.map(post => post.tags).flat()
    })
  }

  render() {
    const { menu, modal, tags } = this.state
    const { history } = this.props

    return (
      <div className="flex flex-col items-start md:items-start m-6 mt-0 w-full md:w-3/5 lg:w-1/2 mx-auto">
        <span onClick={this.switchModal} className="flex self-end top-0 pt-8 pr-6 cursor-pointer md:hidden">
          Menu
        </span>

        <div className="flex flex-row w-full justify-between md:pt-8 items-baseline">
          <div className="font-bold text-2xl px-6 cursor-pointer">
            <Link className="text-black font-bold hover:text-gray-800" to="/">Blog | ricvillagrana</Link>
          </div>

          <div className="hidden md:flex">
            {menu.map(item => (
              <Link key={menu.indexOf(item)} to={item.link} className="ml-8 self-center uppercase font-bold text-gray-700 hover:text-gray-800">
                {item.text}
              </Link>
            ))}

            <span className="hidden md:block ml-8">
              <TagFilter tags={tags} history={history} />
            </span>
          </div>
        </div>

        <HamburguerMenu className="flex md:hidden" menu={menu} tags={tags} open={modal.open} switchModal={this.switchModal} />

        <div className="flex flex-col justify-start items-start text-justify w-full p-6">
          <span className="w-full md:hidden">
            <TagFilter tags={tags} history={history} />
          </span>

          {this.props.children}
        </div>
      </div>
    )
  }
}

export default withRouter(Layout)
