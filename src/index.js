import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Aircraft from './VGS Objects/Aircraft.js'
import Runway from './VGS Objects/Runway.js'
import './index.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Aircraft /> <br />
        <Runway />
      </div>
    )
  }
}

export default App

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
