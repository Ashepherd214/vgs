import React, { Component } from "react";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import OutputVisuals from "./OutputVisual";
import outputImg from "../img/Outputs Variable chart.png";
import inputImg from "../img/PlaneSide.jpg";
//-------------Expermintal calculations function---------//

class ManageVGS extends Component {
	state = {
		color: "gray",
		stageWidth: 1000,
		stageHeight: 400,
		//Setting state for Calculation variables via props
		//So they can be used in any tab
		dh: this.props.runwayDh,
		glideSlope: this.props.runwayGlideSlope,
		xa: this.props.aircraftXa,
		xe: this.props.aircraftXe,
		za: this.props.aircraftZa,
		ze: this.props.aircraftZe,
		pitch: this.props.aircraftPitch,
		gsx: this.props.runwayGsx,
		gsy: this.props.runwayGsy,
		lookdown: this.props.aircraftLookdown,
		xrvr: 1200,
		tch: this.props.runwayTch,
		calcChoice: "realCal", /**Choices are, 0Cal, realCal, 0TCH, realTCH */
	};
	render() {
		let radToDeg = Math.PI/180 // Anywhere this variable is found can be switched back to this math if needed.
		let xcutoff = this.state.lookdown - this.state.pitch;
		// Calculate Eye Distance to Ground modified by AC pitch at Decision Height
		let zeg =
			this.state.dh +
			this.state.ze * Math.cos(this.state.pitch * (Math.PI / 180)) +
			this.state.xe * Math.sin(this.state.pitch * (Math.PI / 180));
		//Calculate antenna distance to ground modified by pitch at decision heights	
		let zag =
			this.state.dh +
			this.state.za * Math.cos(this.state.pitch * (Math.PI / 180)) +
			this.state.xa * Math.sin(this.state.pitch * (Math.PI / 180));
		//Calculate ground distance from AC antenna to eye
		let xanteye =
			(this.state.xa - this.state.xe) *
				Math.cos(this.state.pitch * (Math.PI / 180)) +
			(this.state.ze - this.state.za) *
				Math.sin(this.state.pitch * (Math.PI / 180));
		//Calculate the obscured segment
		let obseg = zeg / Math.tan(xcutoff * (Math.PI / 180));
		//Calculate ground RVR
		let gndrvr = Math.sqrt(Math.pow(this.state.xrvr, 2) - Math.pow(zeg, 2));
		//calculate the field of view
		let fov = gndrvr - obseg;

		//function to calculate the distance from the AC antenna to GS TX accounting for TX lateral offset with hard coded 3 degree glide slope
		// let xax = Math.sqrt(
		// 	Math.pow(zag / Math.tan((3(this value is the typical glideslope) * Math.PI) / 180), 2) -
		// 		Math.pow(this.state.gsy, 2)
		// );
		//function to calculate the distance from the AC antenna to GS TX accounting for TX lateral offset i.e. Y Offset = real world
		let xaxreal = Math.sqrt(
			Math.pow((zag / Math.tan((Math.PI / 180) * this.state.glideSlope)), 2) - Math.pow(this.state.gsy, 2)
		);
		//function to calculate distance from AC antenna to GS Tx with no lateral offset i.e. Y Offset = zero
		let xax0 = zag / Math.tan((Math.PI / 180) * this.state.glideSlope)

		

		let xthres0 = xax0 - this.state.gsx;
		let xthresreal = xaxreal - this.state.gsx;
		let xeyethres0 = xthres0 + xanteye;
		let xeyethresreal = xthresreal + xanteye;
		let xahead0 = xthres0 - obseg;
		let xbeyond0 = fov - Math.abs(xahead0);
		let xaheadreal = xthresreal - obseg;
		let xbeyondreal = fov - Math.abs(xaheadreal);

		//calculate GS Tx Offset to Threshold based on published TCH
		let gsxOffsetTCH = this.state.tch /*need to pass in this value */ / Math.tan(this.state.glideSlope * (Math.PI / 180))

		//calculate distance from pilot eye to the threshold of the runway based on the published TCH assuming GS TX is on runway centerline
		let xeyethres0TCH = xax0 - gsxOffsetTCH + xanteye

		//calculate ahead and beyond segment values assuming GS TX is on runway CL using published TCH
		let xahead0TCH = xeyethres0TCH - obseg
		let xbeyond0TCH = fov - xahead0TCH

		//calculate antenna to threshold distance accounting for lateral offset using published TCH
		let xeyethresrealTCH = xaxreal - gsxOffsetTCH + xanteye
		
		//calculate ahead and beyond segment values assuming GS TX lateral offset using the published TCH
		let xaheadrealTCH = xeyethresrealTCH - obseg
		let xbeyondrealTCH = fov - xaheadrealTCH

		// console.log("----------Start Variables in ManageVGS calculated----------");
		console.log("xcutoff: " + xcutoff);
		console.log("zeg: " + zeg);
		console.log("zag: " + zag);
		console.log("xanteye: " + xanteye);
		console.log("obseg: " + obseg);
		console.log("gndrvr: " + gndrvr);
		console.log("fov: " + fov);
		console.log("glideslope: " + this.state.glideSlope);
		console.log("decision Height: " + this.state.dh);
		console.log("xax: " + xaxreal);
		console.log("xthres: " + xthresreal);
		console.log("xahead: " + xaheadreal);
		console.log("xbeyond: " + xbeyondreal);
		// console.log("-----------End Variables in ManageVGS calculated----------");

		/* The methods of calculating the VGS vary based on a combination of two things, Whether the lateral position of the Ground Transmitter station
		 * is being taken into consideration and whether the calculated or published TCH is being used. Below are the variables for each of
		 * of the 4 combinations of these calculations */
		//------------------0 Offset, Calculated TCH Variables Begin------------------------------------------------------------//
			/**
			 * xax0
			 * xthres0
			 * xeyethres0
			 * xahead0
			 * xbeyond0
			 */
			
		//------------------0 Offset, Calculated TCH Variables End------------------------------------------------------------//
			
		//------------------Real Offset, Calculated TCH Variables Begin------------------------------------------------------------//
			/**
			 * xaxreal
			 * xthresreal
			 * xeyethresreal
			 * xaheadreal
			 * xbeyondreal
			 */
		//------------------Real Offset, Calculated TCH Variables End------------------------------------------------------------//

		//------------------0 Offset, Published TCH Variables ------------------------------------------------------------//
			/**
			 * xeyethres0TCH
			 * xahead0TCH
			 * xbeyond0TCH
			 */
		//------------------0 Offset, Published TCH Variables ------------------------------------------------------------//

		//------------------Real Offset, Published TCH Variables ------------------------------------------------------------//
			/**
			 * xeyethresrealTCH
			 * xaheadrealTCH
			 * xbeyondrealTCH
			 */
		//------------------Real Offset, Published TCH Variables ------------------------------------------------------------//


		
		//------------------This is where Runway function was -------------------------------------------------------------//

			function xaheadChoose (choice){
				switch(choice) {
					case '0Cal':
						console.log("Showing Xahead 0 offset with calculated TCH")
						return xahead0;
					case 'realCal':
						console.log("Showing Xahead real offset with calculated TCH")
						return xaheadreal;
					case '0TCH':
						console.log("Showing Xahead 0 offset with published TCH")
						return xahead0TCH;
					case 'realTCH':
						console.log("Showing Xahead real offset with published TCH")
						return xaheadrealTCH;
					default:
						return xahead0;
				}
			}

			function xbeyondChoose (choice){
				switch(choice) {
					case '0Cal':
						console.log("Showing Xbeyond 0 offset with calculated TCH")
						return xbeyond0;
					case 'realCal':
						console.log("Showing Xbeyond real offset with calculated TCH")
						return xbeyondreal;
					case '0TCH':
						console.log("Showing Xbeyond 0 offset with published TCH")
						return xbeyond0TCH;
					case 'realTCH':
						console.log("Showing Xbeyond real offset with published TCH")
						return xbeyondrealTCH;
					default:
						return xbeyond0;
				}
			}

		return (
			//-------Tab Layout---------//
			<Tabs defaultActiveKey='outputs' id='data-tabs'>
				<Tab eventKey='outputs' title='Output'>
					<Row>
						<Col md={3}>
							<label className='outputlabel'>
								Aircraft: {this.props.aircraftName}{" "}
							</label>
							<br />
							<label className='outputlabel'>
								Runway: {this.props.runwayIcao}{" "}
							</label>
						</Col>
						<Col md={3}>
							<label className='outputlabel'>
								Units in {this.state.runwayUnits}
							</label>
							<br />
							<label className='outputlabel'>
								Rendered on {/*({Date})*/}
							</label>
						</Col>
					</Row>
					<Row>
							<Col md={3}>
								<label className='outputLabel'>
									xAhead: {Number(xaheadChoose(this.state.calcChoice)).toFixed(2)}
								</label>
								<br />
							</Col>
							<Col md={3}>
								<label className='outputLabel'>
									xBeyond: {Number(xbeyondChoose(this.state.calcChoice)).toFixed(2)}
								</label>
							</Col>
							<Col md={3}>
								<label className='outputLabel'>
									FOV: {Number(fov).toFixed(2)}
								</label>
							</Col>
						</Row>
						<Row>
							<Col md={1}>
								<Button 
									variant="primary"
									onClick={() => {
										this.setState({calcChoice: "0Cal"})
									}}
								>
									0 Offset: Calc TCH
								</Button>
							</Col>
							<Col md={1}>
								<Button 
									variant="primary"
									onClick={() => {
										this.setState({calcChoice: "realCal"})
									}}
								>
									real Offset: Calc TCH
								</Button>
							</Col>
							<Col md={1}>
								<Button 
									variant="primary"
									onClick={() => {
										this.setState({calcChoice: "0TCH"})
									}}
								>
									0 Offset: Pub TCH
								</Button>
							</Col>
							<Col md={1}>
								<Button 
									variant="primary"
									onClick={() => {
										this.setState({calcChoice: "realTCH"})
									}}
								>
									real Offset: Pub TCH
								</Button>
							</Col>
						</Row>
					<Container
						style={{
							height: "300px",
							width: "1000px",
							margin: 0,
							marginRight: 0,
							padding: 0,
						}}
					>
						<Row>
							<Col md={12}>
								<OutputVisuals
									style={{ height: "500px", width: "1000px" }}
									runwayName={this.props.runwayName}
									aircraftName={this.props.aircraftName}
									xahead={xaheadChoose(this.state.calcChoice)}
									xbeyond={xbeyondChoose(this.state.calcChoice)}
									runwayLights={this.props.runwayLights}
									runwayEdgeSpacing={this.props.runwayEdgeSpacing}
									runwayWidth={this.props.runwayWidth}
									// runwayIcao={this.props.runwayIcao}
									// runwayDh={this.props.runwayDh}
									// runwayGsx={this.props.runwayGsx}
									// runwayGsy={this.props.runwayGsy}
									// runwayGlideSlope={this.props.runwayGlideSlope}
									// runwayTch={this.props.runwayTch}
									// runwayUnits={this.props.runwayUnits}
									// aircraftXa={this.props.aircraftXa}
									// aircraftXe={this.props.aircraftXe}
									// aircraftZa={this.props.aircraftZa}
									// aircraftZe={this.props.aircraftZe}
									// aircraftCg={this.props.aircraftCg}
									// aircraftFlaps={this.props.aircraftFlaps}
									// aircraftLookdown={this.props.aircraftLookdown}
									// aircraftPitch={this.props.aircraftPitch}
									// aircraftSpeed={this.props.aircraftSpeed}
									// aircraftWeight={this.props.aircraftWeight}
									// aircraftUnits={this.props.aircraftUnits}				
								></OutputVisuals>
							</Col>
						</Row>
						
						<Row>
							<Col md={6}>
								<img src={outputImg} alt='Output Variable Chart' />
							</Col>
							<Col md={3}>
								<label className='paramlabel'>
									Decision Height: {this.props.runwayDh}{" "}
								</label>
								<br />
								<label className='paramlabel'>
									Pilot's eye above ground(zeg): {Number(zeg).toFixed(2)}{" "}
								</label>
								<label className='paramlabel'>
									Ground Segment antenna above ground(zag): {Number(zag).toFixed(2)}{" "}
								</label>
								<br />
								<label className='paramlabel'>
									Horizontal distance of eye ground segment(xanteye): {Number(xanteye).toFixed(2)}{" "}
								</label>
								<label className='paramlabel'>
									Obscured Segment (obseg): {Number(obseg).toFixed(2)}{" "}
								</label>
								<br />
								<label className='paramlabel'> {/*Add logic for Calculated/Published TCH with 0/real offsets buttons */}
									Aircraft ground segment to Threshold(xthres): {Number(xthresreal).toFixed(2)}{" "}
								</label>
								<label className='paramlabel'> {/**Button Logic */}
									Eyepoint to threshold(xeyethres): {Number(xeyethresreal).toFixed(2)}{" "}
								</label>
								<br />
								<label className='paramlabel'>
									Slant RVR(xrvr): {this.state.xrvr}{" "}
								</label>
							</Col>
							<Col md={3}>
								<label className='paramlabel'>
									Effective ground rvr(gndrvr) {Number(gndrvr).toFixed(2)}
								</label>
								<br />
								{/* <label className='outputlabel'>
								Slant rvr(xrvr) {this.state.runwayUnits}
							</label>
							<br /> */}
								<label className='paramlabel'>
									Threshold crossing height(TCH): {this.props.runwayTch}
								</label>
								<br />
								<label className='paramlabel'>Field of view(FOV) {Number(fov).toFixed(2)}</label>
								<br />
								<label className='paramlabel'> {/**Button Logic */}
									Transmitter antenna horizontal offset(xxmtr) {Number(xaxreal).toFixed(2)}
								</label>
								<br />
								<label className='paramlabel'>
									Cutoff angle(xcutoff) {Number(xcutoff)}
								</label>
								<br />
								<label className='paramlabel'> {/**Button Logic */}
									Visible before threshold(xahead) {Number(xaheadChoose(this.state.calcChoice)).toFixed(2)}
								</label>
								<br />
								<label className='paramlabel'> {/**Button Logic */}
									Visible after threshold(xbeyond) {Number(xbeyondChoose(this.state.calcChoice)).toFixed(2)}
								</label>
								<br />
							</Col>
						</Row>
					</Container>
				</Tab>
				<Tab eventKey='inputs' title='Input'>
					<Container>
						<Row>
							<Col md={6}>
								<label>
									Aircraft <br /> {this.props.aircraftName}
								</label>
							</Col>
							<Col md={6}>
								<label>
									Runway <br /> {this.props.runwayIcao}
								</label>
							</Col>
						</Row>
					</Container>
					<Container>
						<img src={inputImg} alt='Input Aircraft Visual' />
					</Container>
					<Container>
						<Row>
							<label className='paramlabel'>ze: {this.props.aircraftZe} </label>
						</Row>
						<Row>
							<label className='paramlabel'>xe: {this.props.aircraftXe} </label>
						</Row>
						<Row>
							<label className='paramlabel'>za: {this.props.aircraftZa} </label>
						</Row>
						<Row>
							<label className='paramlabel'>xa: {this.props.aircraftXa} </label>
						</Row>
						<Row>
							<label className='paramlabel'>
								pitch angle: {this.props.aircraftPitch}{" "}
							</label>
						</Row>
						<Row>
							<label className='paramlabel'>
								max lookdown: {this.props.aircraftLookdown}{" "}
							</label>
						</Row>
						<br />
						<br />
						<Row>
							<Col md={2}>
								<label className='inputLabel2'>
									Aircraft Weight <br /> {this.props.aircraftWeight}
								</label>
							</Col>
							<Col md={2}>
								<label className='inputLabel2'>
									Aircraft Speed <br /> {this.props.aircraftSpeed}
								</label>
							</Col>
							<Col md={2}>
								<label className='inputLabel2'>
									%CG <br /> {this.props.aircraftCg}
								</label>
							</Col>
							<Col md={2}>
								<label className='inputLabel2'>
									Flaps Setting <br /> {this.props.aircraftFlaps}
								</label>
							</Col>
						</Row>
					</Container>
				</Tab>
				<Tab eventKey='aircraft-location' title='Aircraft Location'></Tab>
				<Tab eventKey='parameters' title='Parameters'>
					<Container>
						<img src={outputImg} alt='Output Variable Chart' />

						<Row>
							<Col md={6}>
								<label className='paramlabel'>
									Decision Height: {this.props.runwayDh}{" "}
								</label>
								<br />
								<label className='paramlabel'>
									Pilot's eye above ground(zeg): {Number(zeg).toFixed(2)}{" "}
								</label>
								<label className='paramlabel'>
									Ground Segment antenna above ground(zag): {Number(zag).toFixed(2)}{" "}
								</label>
								<br />
								<label className='paramlabel'> {/**Button Logic */}
									Horizontal distance of eye ground segment(xanteye): {Number(xanteye).toFixed(2)}{" "}
								</label>
								<label className='paramlabel'>
									Obscured Segment (obseg): {Number(obseg).toFixed(2)}{" "}
								</label>
								<br />
								<label className='paramlabel'> {/**Button Logic */}
									Aircraft ground segment to Threshold(xthres): {Number(xthresreal).toFixed(2)}{" "}
								</label>
								<label className='paramlabel'> {/**Button Logic */}
									Eyepoint to threshold(xeyethres): {Number(xeyethresreal).toFixed(2)}{" "}
								</label>
								<br />
								<label className='paramlabel'>
									Slant RVR(xrvr): {this.state.xrvr}{" "}
								</label>
							</Col>
							<Col md={6}>
								<label className='paramlabel'>
									Effective ground rvr(gndrvr) {Number(gndrvr).toFixed(2)}
								</label>
								<br />
								{/* <label className='outputlabel'>
								Slant rvr(xrvr) {this.state.runwayUnits}
							</label>
							<br /> */}
								<label className='paramlabel'>
									Threshold crossing height(TCH): {this.props.runwayTch}
								</label>
								<br />
								<label className='paramlabel'>Field of view(FOV) {Number(fov).toFixed(2)}</label>
								<br />
								<label className='paramlabel'> {/**Button Logic */}
									Transmitter antenna horizontal offset(xxmtr) {Number(xaxreal).toFixed(2)}
								</label>
								<br />
								<label className='paramlabel'>
									Cutoff angle(xcutoff) {Number(xcutoff)}
								</label>
								<br />
								<label className='paramlabel'> {/**Button Logic */}
									Visible before threshold(xahead) {Number(xaheadChoose(this.state.calcChoice)).toFixed(2)}
								</label>
								<br />
								<label className='paramlabel'> {/**Button Logic */}
									Visible after threshold(xbeyond) {Number(xbeyondChoose(this.state.calcChoice)).toFixed(2)}
								</label>
								<br />
							</Col>
						</Row>
					</Container>
				</Tab>
			</Tabs>
		);
	}
}

export default ManageVGS;
