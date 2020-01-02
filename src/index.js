import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Aircraft from './VGS Objects/Aircraft.js'
import Runway from './VGS Objects/Runway.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
import Popper from 'popper.js'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { 
  Container,
  Row,
  Col
} from 'reactstrap'
import './index.css'

class App extends Component {
  render () {
    return (
      <Container>
        <Row>
          <Col xs="6"><Aircraft /> <br /></Col>// Replace with Aircraft Tableview comp.
          <Col xs="6"><Runway /></Col>// Replace with Runway Tableview comp.
        </Row>
      </Container>
    )
  }
}

export default App

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
