import React from 'react'

class Layout extends React.Component {

  render() {
    return (
      <div>
        <div className="font-bold text-2xl">About</div>
        <div className="content">
          My name is Ricardo Villagrana (<a href="https://twitter.com/ricvillagrana" rel="noopener noreferrer" target="_blank" className="link">@ricvillagrana</a>), I am a full-stack developer focusing on Ruby on Rails, Node.js and React.js (I also like and use Vue.js).
        </div>

        <div>
          <header className="font-bold text-lg text-gray-700">Why</header>
          <div className="content">
             I want to share what I like and what I think will help new developers to learn more about this technologies.
          </div>
        </div>
      </div>
    )
  }
}

export default Layout
