import React from 'react'
import { Link } from 'react-router-dom'

const HamburguerMenu = (props) => (
  <div className={`modal-${props.open ? 'open' : 'closed'} transition-long flex md:hidden flex-col top-0 right-0 absolute bg-black h-full w-full`}>
    <span onClick={props.switchModal} className="flex justify-end text-white pt-8 pr-6 cursor-pointer">
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
      <div className="flex flex-col items-start md:items-start m-6 mt-0 w-full md:w-3/5 mx-auto">
        <span onClick={this.switchModal} className="flex self-end top-0 pt-8 pr-6 cursor-pointer md:hidden">
          Menu
        </span>

        <div className="flex flex-row md:pt-8 items-baseline">
          <div className="font-bold text-2xl mb-3 -mt-10 px-6 cursor-pointer">
            <Link className="text-black hover:text-gray-800" to="/">Blog | ricvillagrana</Link>
          </div>

          <div className="hidden md:flex mx-8">
            {menu.map(item => (
              <Link key={menu.indexOf(item)} to={item.link} className="mx-4 uppercase font-bold text-gray-700 hover:text-gray-800">
                {item.text}
              </Link>
            ))}
          </div>
        </div>

        <HamburguerMenu className="flex md:hidden" menu={menu} open={modal.open} switchModal={this.switchModal} />

        <div className="flex flex-col justify-start items-start text-justify w-full p-6">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout
