import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router";
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import "tachyons";
import ManageAircrafts from "./VGS Objects/ManageAircrafts";
import ManageRunways from "./VGS Objects/ManageRunways";
import CalculateButton from "./components/CalculateButton";
import ManageVGS from "./Calculation Components/ManageVGS";
import "./index.css";
import NavigationBar from "./components/NavigationBar";
import Authentication from "./components/AuthenticationComponents/AuthenticationPage";
import firebaseapp, { auth } from "firebase";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard.js";
import history from "history";
import UserProvider from "./Auth";
import firebase from "firebase";

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data_from_runway: [],
			data_from_aircraft: [],
			lights_data_from_runway: "",
			runway_name: "",
			runway_icao: "",
			runway_decision_height: "",
			runway_edge_light_spacing: "",
			runway_gs_x: "",
			runway_gs_y: "",
			runway_glideslope: "",
			runway_tch: "",
			runway_width: "",
			runway_unit_choice: "",
			aircraft_xa: "",
			aircraft_xe: "",
			aircraft_za: "",
			aircraft_ze: "",
			aircraft_cg: "",
			aircraft_flaps: "",
			aircraft_lookdown: "",
			aircraft_pitch: "",
			aircraft_speed: "",
			aircraft_weight: "",
			aircraft_units: "",
			me: auth.currentUser,
		};
	}

	parentRunwayCallbackFunction = (
		runwayData,
		runwayLights,
		runwayName,
		runwayIcao,
		runwayDh,
		runwayEdgeSpacing,
		runwayGsx,
		runwayGsy,
		runwayGlideSlope,
		runwayTch,
		runwayWidth,
		runwayUnits
	) => {
		console.log(String(runwayData));
		this.setState({
			data_from_runway: runwayData,
			lights_data_from_runway: runwayLights,
			runway_name: runwayName,
			runway_icao: runwayIcao,
			runway_decision_height: runwayDh,
			runway_edge_light_spacing: runwayEdgeSpacing,
			runway_gs_x: runwayGsx,
			runway_gs_y: runwayGsy,
			runway_glideslope: runwayGlideSlope,
			runway_tch: runwayTch,
			runway_width: runwayWidth,
			runway_unit_choice: runwayUnits,
		});
		// console.log("The Runway data from child is: " + runwayData)
		// console.log("Runway Lights data from child is: " + runwayLights)
		// console.log("The Runway data from parent is: " + this.state.data_from_runway)
		// console.log("The Runway Lights data from parent is: " + this.state.lights_data_from_runway)
		// console.log("The Runway data from parent is: " + this.state.runway_name)
		// console.log("The Runway data from parent is: " + this.state.runway_icao)
		// console.log("The Runway data from parent is: " + this.state.runway_decision_height)
		// console.log("The Runway data from parent is: " + this.state.runway_edge_light_spacing)
		// console.log("The Runway data from parent is: " + this.state.runway_gs_x)
		// console.log("The Runway data from parent is: " + this.state.runway_gs_y)
		// console.log("The Runway data from parent is: " + this.state.runway_glideslope)
		// console.log("The Runway data from parent is: " + this.state.runway_tch)
		// console.log("The Runway data from parent is: " + this.state.runway_width)
		// console.log("The Runway data from parent is: " + this.state.runway_unit_choice)
		//this.setState({value_key:value_key})
		//this.forceUpdate()
		// this.setState({
		//   rerender: !this.state.rerender
		// });
	};

	componentDidMount() {
		firebase.auth().onAuthStateChanged((me) => {
			this.setState({ me });
		});
	}

	parentAircraftCallbackFunction = (
		aircraftData,
		aircraftXa,
		aircraftXe,
		aircraftZa,
		aircraftZe,
		aircraftCg,
		aircraftFlaps,
		aircraftLookdown,
		aircraftPitch,
		aircraftSpeed,
		aircraftWeight,
		aircraftUnits
	) => {
		console.log(aircraftData);
		this.setState({
			data_from_aircraft: aircraftData,
			aircraft_xa: aircraftXa,
			aircraft_xe: aircraftXe,
			aircraft_za: aircraftZa,
			aircraft_ze: aircraftZe,
			aircraft_cg: aircraftCg,
			aircraft_flaps: aircraftFlaps,
			aircraft_lookdown: aircraftLookdown,
			aircraft_pitch: aircraftPitch,
			aircraft_speed: aircraftSpeed,
			aircraft_weight: aircraftWeight,
			aircraft_units: aircraftUnits,
		});
		console.log("The Aircraft data from child is: " + aircraftData);
		console.log(
			"The Aircraft data from parent is: " + this.state.data_from_aircraft
		);
		//this.setState({value_key:value_key})
		//this.forceUpdate()
		// this.setState({
		//   rerender: !this.state.rerender
		// });
	};

	// handleSignIn = history => (email, password) => {
	// 	return firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
	// 	  return history.push("/Dashboard");
	// 	});
	//   };

	render() {
		return (
			<Router>
				<NavigationBar />
				<Switch>
					<Route
						path='/Login'
						render={() =>
							!this.state.me ? <Authentication /> : <Redirect to='/Dashboard' />
						}
					/>
					<Route
						path='/Dashboard'
						render={() =>
							this.state.me ? (
								<Container>
									<ManageAircrafts
										parentFunction={this.parentAircraftCallbackFunction}
									/>
									<ManageRunways
										parentFunction={this.parentRunwayCallbackFunction}
									/>
									<Link to='/VGS'>
										<CalculateButton />
									</Link>{" "}
								</Container>
							) : (
								<Redirect to='/Login' />
							)
						}
					/>
					{/* <PrivateRoute redirectTo="/Login" path="/Dashboard" >
		  				<Dashboard /> 
					</PrivateRoute>  component={Dashboard} />  */}
					{/* <Route path='/Dashboard' >
						  <Dashboard />
					  </Route> */}
					{/*Original setup below*/}
					{/* <Route path='/Dashboard'>
						<ManageAircrafts
							parentFunction={this.parentAircraftCallbackFunction}
						/>
						<ManageRunways parentFunction={this.parentRunwayCallbackFunction} />
						<Link to='/VGS'>
							<CalculateButton />
						</Link>
					</Route> */}
					<Route path='/VGS'>
						<ManageVGS
							runwayLights={this.state.lights_data_from_runway}
							runwayName={this.state.data_from_runway}
							aircraftName={this.state.data_from_aircraft}
							//runwayName={this.state.runway_name}
							runwayIcao={this.state.runway_icao}
							runwayDh={this.state.runway_decision_height}
							runwayEdgeSpacing={this.state.runway_edge_light_spacing}
							runwayGsx={this.state.runway_gs_x}
							runwayGsy={this.state.runway_gs_y}
							runwayGlideSlope={this.state.runway_glideslope}
							runwayTch={this.state.runway_tch}
							runwayWidth={this.state.runway_width}
							runwayUnits={this.state.runway_unit_choice}
							aircraftXa={this.state.aircraft_xa}
							aircraftXe={this.state.aircraft_xe}
							aircraftZa={this.state.aircraft_za}
							aircraftZe={this.state.aircraft_ze}
							aircraftCg={this.state.aircraft_cg}
							aircraftFlaps={this.state.aircraft_flaps}
							aircraftLookdown={this.state.aircraft_lookdown}
							aircraftPitch={this.state.aircraft_pitch}
							aircraftSpeed={this.state.aircraft_speed}
							aircraftWeight={this.state.aircraft_weight}
							aircraftUnits={this.state.aircraft_units}
						/>
					</Route>
					<Route path='/Logoff'></Route>
				</Switch>
			</Router>
		);
	}
}

ReactDOM.render(
	<UserProvider>
		<App />
	</UserProvider>,
	document.getElementById("root")
);
