import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AddAircraft from './VGS Objects/AddAircraft.js'
import ManageAircrafts from './VGS Objects/ManageAircrafts'
import Runway from './VGS Objects/Runway.js'
import { 
  Container,
  Row,
  Col
} from 'react-bootstrap'
import './index.css'

class App extends Component {
  render () {
    return (

          <ManageAircrafts />

    )
  }
}

export default App

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
