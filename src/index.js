import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'
import 'tachyons'
import ManageAircrafts from './VGS Objects/ManageAircrafts'
import ManageRunways from './VGS Objects/ManageRunways'
import CalculateButton from './components/CalculateButton'
import ManageVGS from './Calculation Components/ManageVGS'
import './index.css'

export default function App() {
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
          <ManageAircrafts />
          <ManageRunways />
          <Link to="/VGS">
            <CalculateButton />
          </Link>
        </Route>
        <Route path="/VGS">
          <ManageVGS />
        </Route>
      </Switch>
      {/*</div>*/}
    </Router>
  );
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
