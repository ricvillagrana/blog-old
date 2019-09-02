import React from 'react'

class Layout extends React.Component {

  render() {
    return (
      <div>
        <div className="title">About</div>
        <div className="content">
          My name is Ricardo Villagrana also (<a href="https://twitter.com/ricvillagrana" target="_blank">@ricvillagrana</a>), I am a full-stack developer focusing on Ruby on Rail, Node.js and React.js (I also like and use Vue.js).
        </div>

        <div>
          <header className="sub-title">Why</header>
          <div className="content">
             I want to share what I like and what I think will help new developers to learn more about this technologies.
          </div>
        </div>
      </div>
    )
  }
}

export default Layout
