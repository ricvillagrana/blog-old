import React from 'react'
import { Link } from 'react-router-dom'

const HamburguerMenu = (props) => (
  <div className={`modal-${props.open ? 'open' : 'closed'} transition-long flex md:hidden flex-col top-0 right-0 absolute bg-primary-900 h-full w-full`}>
    <span onClick={props.switchModal} className="flex justify-end text-white pt-8 pr-6 cursor-pointer">
      Close
    </span>
    <div className="flex flex-col items-center">
      {props.menu.map(item => (
        <Link onClick={props.switchModal} to={item.link} className="my-2 uppercase font-bold text-white hover:text-gray-100 text-md">
          {item.text}
        </Link>
      ))}
    </div>
  </div>
)

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
      }
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

  render() {
    const { menu, modal } = this.state

    return (
      <div className="flex flex-row justify-center md:justify-start m-6 items-baseline w-full md:w-3/5 mx-auto">
        <Link className="font-bold text-primary-500 text-2xl cursor-pointer no-underline">Ricardo's blog</Link>

        <div className="hidden md:flex mx-8">
          {menu.map(item => (
            <Link to={item.link} className="mx-4 uppercase font-bold text-gray-500 hover:text-gray-600">
              {item.text}
            </Link>
          ))}
        </div>

        <span onClick={this.switchModal} className="absolute top-0 right-0 text-primary-900 pt-8 pr-6 cursor-pointer">
          Menu
        </span>
        <HamburguerMenu className="flex md:hidden" menu={menu} open={modal.open} switchModal={this.switchModal} />
      </div>
    )
  }
}

export default Layout
