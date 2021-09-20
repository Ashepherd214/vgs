import React, { Component } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import OutputVisuals from "./OutputVisual";
import outputImg from "../img/Outputs Variable chart.png";
import inputImg from "../img/PlaneSide.jpg";
//-------------Expermintal calculations function---------//
function SegmentCalculations() {}

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
	};
	render() {
		let xcutoff = this.state.lookdown - this.state.pitch;
		let zeg =
			this.state.dh +
			this.state.ze * Math.cos((this.state.pitch * Math.PI) / 180) +
			this.state.xe * Math.sin((this.state.pitch * Math.PI) / 180);
		let zag =
			this.state.dh +
			this.state.za * Math.cos((this.state.pitch * Math.PI) / 180) +
			this.state.xa * Math.sin((this.state.pitch * Math.PI) / 180);
		let xanteye =
			(this.state.xa - this.state.xe) *
				Math.cos((this.state.glideSlope * Math.PI) / 180) +
			(this.state.ze - this.state.za) *
				Math.sin((this.state.glideSlope * Math.PI) / 180);
		let obseg = zeg / Math.tan((xcutoff * Math.PI) / 180);
		let gndrvr = Math.sqrt(Math.pow(this.state.xrvr, 2) - Math.pow(zeg, 2));
		let fov = gndrvr - obseg;
		let xax = Math.sqrt(
			Math.pow(zag / Math.tan((3 * Math.PI) / 180), 2) -
				Math.pow(this.state.gsy, 2)
		); /* With certain Runway/ aircraft combos the inside val`1  3wersdfcue comes up negative which gives NaN*/
		let xthres = xax - this.state.gsx;
		let xahead = xthres - (obseg - xanteye);
		let xbeyond = fov - Math.abs(xahead);
		let xeyethres = xthres + xanteye;

		console.log("----------Start Variables in ManageVGS calculated----------");
		console.log("xcutoff: " + xcutoff);
		console.log("zeg: " + zeg);
		console.log("zag: " + zag);
		console.log("xanteye: " + xanteye);
		console.log("obseg: " + obseg);
		console.log("gndrvr: " + gndrvr);
		console.log("fov: " + fov);
		console.log("xax: " + xax);
		console.log("xthres: " + xthres);
		console.log("xahead: " + xahead);
		console.log("xbeyond: " + xbeyond);
		console.log("-----------End Variables in ManageVGS calculated----------");
		//------------------This is where Runway function was -------------------------------------------------------------//

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
									xAhead: {Number(xahead).toFixed(2)}
								</label>
								<br />
							</Col>
							<Col md={3}>
								<label className='outputLabel'>
									xBeyond: {Number(xbeyond).toFixed(2)}
								</label>
							</Col>
							<Col md={3}>
								<label className='outputLabel'>
									FOV: {Number(fov).toFixed(2)}
								</label>
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
									runwayLights={this.props.runwayLights}
									runwayName={this.props.runwayName}
									aircraftName={this.props.aircraftName}
									runwayIcao={this.props.runwayIcao}
									runwayDh={this.props.runwayDh}
									runwayEdgeSpacing={this.props.runwayEdgeSpacing}
									runwayGsx={this.props.runwayGsx}
									runwayGsy={this.props.runwayGsy}
									runwayGlideSlope={this.props.runwayGlideSlope}
									runwayTch={this.props.runwayTch}
									runwayWidth={this.props.runwayWidth}
									runwayUnits={this.props.runwayUnits}
									aircraftXa={this.props.aircraftXa}
									aircraftXe={this.props.aircraftXe}
									aircraftZa={this.props.aircraftZa}
									aircraftZe={this.props.aircraftZe}
									aircraftCg={this.props.aircraftCg}
									aircraftFlaps={this.props.aircraftFlaps}
									aircraftLookdown={this.props.aircraftLookdown}
									aircraftPitch={this.props.aircraftPitch}
									aircraftSpeed={this.props.aircraftSpeed}
									aircraftWeight={this.props.aircraftWeight}
									aircraftUnits={this.props.aircraftUnits}
									xahead={xahead}
									xbeyond={xbeyond}
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
								<label className='paramlabel'>
									Aircraft ground segment to Threshold(xthres): {Number(xthres).toFixed(2)}{" "}
								</label>
								<label className='paramlabel'>
									Eyepoint to threshold(xeyethres): {Number(xeyethres).toFixed(2)}{" "}
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
								<label className='paramlabel'>
									Transmitter antenna horizontal offset(xxmtr) {Number(xax).toFixed(2)}
								</label>
								<br />
								<label className='paramlabel'>
									Cutoff angle(xcutoff) {Number(xcutoff)}
								</label>
								<br />
								<label className='paramlabel'>
									Visible before threshold(xahead) {Number(xahead).toFixed(2)}
								</label>
								<br />
								<label className='paramlabel'>
									Visible after threshold(xbeyond) {Number(xbeyond).toFixed(2)}
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
								<label className='paramlabel'>
									Horizontal distance of eye ground segment(xanteye): {Number(xanteye).toFixed(2)}{" "}
								</label>
								<label className='paramlabel'>
									Obscured Segment (obseg): {Number(obseg).toFixed(2)}{" "}
								</label>
								<br />
								<label className='paramlabel'>
									Aircraft ground segment to Threshold(xthres): {Number(xthres).toFixed(2)}{" "}
								</label>
								<label className='paramlabel'>
									Eyepoint to threshold(xeyethres): {Number(xeyethres).toFixed(2)}{" "}
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
								<label className='paramlabel'>
									Transmitter antenna horizontal offset(xxmtr) {Number(xax).toFixed(2)}
								</label>
								<br />
								<label className='paramlabel'>
									Cutoff angle(xcutoff) {Number(xcutoff)}
								</label>
								<br />
								<label className='paramlabel'>
									Visible before threshold(xahead) {Number(xahead).toFixed(2)}
								</label>
								<br />
								<label className='paramlabel'>
									Visible after threshold(xbeyond) {Number(xbeyond).toFixed(2)}
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
