import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'
import 'tachyons'
import ManageAircrafts from './VGS Objects/ManageAircrafts'
import ManageRunways from './VGS Objects/ManageRunways'
import CalculateButton from './components/CalculateButton'
import ManageVGS from './Calculation Components/ManageVGS'
import './index.css'

export class App extends Component {
  constructor(props) {
    super(props)
      this.state={
        data_from_runway: [],
        data_from_aircraft: []
      }
  }
  


  parentRunwayCallbackFunction=(runwayData) => {
    console.log(String(runwayData))
    this.setState({data_from_runway:runwayData})
    console.log("The Runway data from child is: " + runwayData)
    console.log("The Runway data from parent is: " + this.state.data_from_runway)
    //this.setState({value_key:value_key})
    //this.forceUpdate()
    // this.setState({ 
    //   rerender: !this.state.rerender
    // });
  };

  parentAircraftCallbackFunction=(aircraftData) => {
    console.log(aircraftData)
    this.setState({data_from_aircraft:aircraftData})
    console.log("The Aircraft data from child is: " + aircraftData)
    console.log("The Aircraft data from parent is: " + this.state.data_from_aircraft)
    //this.setState({value_key:value_key})
    //this.forceUpdate()
    // this.setState({ 
    //   rerender: !this.state.rerender
    // });
  };

  

  render() {
    return (
      <Router>
        {/* <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/VGS">VGS visual</Link>
              </li>
            </ul>
          </nav> */}
        <Switch>
          <Route exact path="/">
            <ManageAircrafts parentFunction={this.parentAircraftCallbackFunction} />
            <ManageRunways parentFunction={this.parentRunwayCallbackFunction} />
            <Link to="/VGS">
              <CalculateButton />
            </Link>
          </Route>
          <Route path="/VGS">
            <ManageVGS runwayName={this.state.data_from_runway} aircraftName={this.state.data_from_aircraft} />
          </Route>
        </Switch>
        {/*</div>*/}
      </Router>
    );
  }
}

// class App extends Component {
//   render () {
//     return (
//       <div>
//         <ManageAircrafts />
//         <ManageRunways />
//         <CalculateButton />
//       </div>
          
//     )
//   }
// }

// export default App

// const routing = (
//   <Router>
//     <div>
//       <Route exact path="/" component={App} />
//       <Route path="/VGS" component={ManageVGS} />
//     </div>
//   </Router>
// );

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
