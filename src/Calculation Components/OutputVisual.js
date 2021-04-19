import React from "react";
import firestore from "../Firestore";
import { Stage, Layer, Rect } from "react-konva";
import { ThresholdLights } from "../components/Threshold Lights Draw";
import { LightType } from "../components/LightType";
import { ThresholdBars } from "../components/ThresholdBars";
import outputImg from "../img/Outputs Variable chart.png";
import GroundSegmentRender from "../VGSMath/GroundSegmentRender";
import { RunwayMarkingsDraw } from "../components/RunwayMarkingsDraw";
// import {
//   MALSR,
//   MALSF,
//   SSALR,
//   SSALF,
//   ALSF1,
//   ALSF2
// } from '../components/RunwayLights'

// Draws Runway
function Runway(props) {
	return (
		<Rect
			x={0}
			y={120}
			width={props.runLength}
			height={props.runWidth}
			fill='gray'
			shadowBlur={3}
		/>
	);
}

// function GrassApproach (props) {
//   return (
//     <Rect
//       x={10}
//       y={296}
//       width={ props.runLength }
//       height= { props.runWidth }
//       fill="green"
//       shadowBlur={3}
//     />
//   )
// }

// function LightType (props) {
//   console.log(props)
//    console.log("Light Type prop detected: " + props.lights)
//     //Should accept props coming from Runways table to determine which lights to show on the outputs tab.
//     //Based on incoming props, should call out to RunwayLights.js and render the respective component
//     switch(props.lights) {
//       case MALSR:
//         return <MALSR />
//       case MALSF:
//         return <MALSF />
//       case SSALR:
//         return <SSALR />
//       case SSALF:
//         return <SSALF />
//       case ALSF1:
//         return <ALSF1 />
//       case ALSF2:
//         return <ALSF2 />
//     }
// }

// function Diagram (props) {

// }

// function VisualOutputVals (props) {

// }

// function DiagramTextbox (props) {

// }

class OutputVisuals extends React.Component {
	//_isMounted = false

	constructor(props) {
		super(props);

		this.state = {
			color: "beige",
			stageWidth: 1600,
			stageHeight: 500,
			runLength: 550,
			runWidth: 200,
			//Runway state variables
			icao: " ",
			approachlights: this.props.runwayLights,
			dh: " ",
			edgespacing: this.props.runwayEdgeSpacing,
			gsx: " ",
			gsy: " ",
			glideslope: " ",
			tch: " ",
			width: this.props.runwayWidth,
			runUnits: true,
			//Aircraft state variables
			airName: " ",
			ze: " ",
			xe: " ",
			lookdown: " ",
			za: " ",
			xa: " ",
			flaps: " ",
			speed: " ",
			weight: " ",
			cg: " ",
			pitch: " ",
			airUnits: false,
			_isMounted: false,
		};
		this.componentDidMount = this.componentDidMount.bind(this);
		this.getRunwayData = this.getRunwayData.bind(this);
		//this.getRunwayData(this.props.runwayName)
	}

	componentDidMount() {
		this.state._isMounted = true;

		if (this.state._isMounted) {
			this.getRunwayData();
			this.getAircraftData(this.props.aircraftName);
			console.log("component has mounted");
		} else {
			console.log("components did not mount");
		}

		// console.log("runway lights in Output Visual are" + this.props.runwayLights)
		// console.log("The Runway data from ManageVGS is: " + this.props.runwayIcao)
		// console.log("The Runway data from ManageVGS is: " + this.props.runwayDh)
		// console.log("The Runway data from ManageVGS is: " + this.props.runwayEdgeSpacing)
		// console.log("The Runway data from ManageVGS is: " + this.props.runwayGsx)
		// console.log("The Runway data from ManageVGS is: " + this.props.runwayGsy)
		// console.log("The Runway data from ManageVGS is: " + this.props.runwayGlideSlope)
		// console.log("The Runway data from ManageVGS is: " + this.props.runwayTch)
		// console.log("The Runway data from ManageVGS is: " + this.props.runwayWidth)
		// console.log("The Runway data from ManageVGS is: " + this.props.runwayUnits)
		//window.addEventListener("resize", this.checkSize)
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	/*---------------------------Begin getRunwayData---------------------------------------- */

	/*--------------------------New get Data function using Snapshot------------------------ */
	async getRunwayData() {
		//const runwayName = this.props.runwayName
		//console.log(this.props.runwayName)

		try {
			const runDb = await
				firestore
				.collection("Runways")
				.doc(String(this.props.runwayName))
				.get();
			this.setState({
				icao: runDb.data().ICAO,
				approachlights: String(runDb.data().ApproachLights),
				dh: runDb.data().DH,
				edgespacing: runDb.data().EdgeSpacing,
				gsx: runDb.data().GSOffsetX,
				gsy: runDb.data().GSOffsetY,
				glideslope: runDb.data().GlideSlope,
				tch: runDb.data().TCH,
				width: runDb.data().Width,
				runUnits: String(runDb.data().Units),
			});
		} catch (error) {
			console.log("Unable to retrieve the doc", error);
		}
	}

	/*--------------------------Original get Data function --------------------------------- */
	// getRunwayData(runwayName) {
	//   //const runwayName = this.props.runwayName
	//   console.log(runwayName)
	//   const runDb = firebase.firestore().collection("Runways").doc(String(runwayName))

	//   runDb.get()
	//   .then(doc => {
	//     const data = doc.data()
	//     console.log(data)
	//     setTimeout(() => {
	//     this.setState({
	//       icao: doc.data().ICAO,
	//       approachlights: doc.data().ApproachLights,
	//       dh: doc.data().DH,
	//       edgespacing: doc.data().EdgeSpacing,
	//       gsx: doc.data().GSOffsetX,
	//       gsy: doc.data().GSOffsetY,
	//       glideslope: doc.data().GlideSlope,
	//       tch: doc.data().TCH,
	//       width: doc.data().Width,
	//       runUnits: String(doc.data().Units),
	//       lights: doc.data().ApproachLights,
	//     })}, 100)
	//   })
	// }

	/*---------------------------End getRunwayData---------------------------------------- */
	async getAircraftData(aircraftName) {
		console.log(aircraftName);
		const airDb = await
			firestore
			.collection("Aircrafts")
			.doc(String(aircraftName))
			.get();

		this.setState({
			airName: airDb.id,
			ze: airDb.data().Ze,
			xe: airDb.data().Xe,
			lookdown: airDb.data().lookdown,
			za: airDb.data().Za,
			xa: airDb.data().Xa,
			flaps: airDb.data().flaps,
			speed: airDb.data().speed,
			weight: airDb.data().weight,
			cg: airDb.data().cg,
			pitch: airDb.data().pitch,
			airUnits: String(airDb.data().unitsAir),
		});
	}
	// checkSize = () => {
	//   //const width = window.innerWidth
	//   //const height = window.innerHeight
	//   this.setState({
	//     stageWidth: window.innerWidth,
	//     stageHeight: window.innerHeight
	//   })
	// }
	render() {
		//const runLength = this.state.stageWidth * 0.50
		//const runWidth = this.state.stageLength * 0.50
		//const scaleWidth = (runWidthShow)
		//const scaleHeight = (runLengthShow)
		//getRunwayData(this.props.runwayName)
		//console.log(this.state.lights)
		//const lights = this.state.approachlights
		console.log("Variable lights: " + this.state.approachlights);
		console.log(
			"Edge Lights spacing in Output: " + this.state.runwayEdgeSpacing
		);
		console.log("OutputVisual xAhead: " + this.props.xahead);
		console.log("OutputVisual xBeyond: " + this.props.xbeyond);

		return (
			<div>
				{/* 
            <h5>{"ICAO: " + this.state.icao}</h5>
            <h5>{"Approach Lights: " + this.state.approachlights}</h5>
            <h5>{"Decision Height: " + this.state.dh}</h5>
            <h5>{"Edge Spacing: " + this.state.edgespacing}</h5>
            <h5>{"GSX: " + this.state.gsx}</h5>
            <h5>{"GSY: " + this.state.gsy}</h5>
            <h5>{"Glide Slope: " + this.state.glideslope}</h5>
            <h5>{"TCH: " + this.state.tch}</h5>
            <h5>{"Width: " + this.state.width}</h5>
            <h5>{"Metric?: " + this.state.runUnits}</h5> <br />
            <label>Selected Aircraft Data: </label>
            <h5>{"Aircraft: " + this.state.airName}</h5>
            <h5>{"Ze: " + this.state.ze}</h5>
            <h5>{"Xe: " + this.state.xe}</h5>
            <h5>{"Lookdown Angle: " + this.state.lookdown}</h5>
            <h5>{"Za: " + this.state.za}</h5>
            <h5>{"Xa: " + this.state.xa}</h5>
            <h5>{"Flaps: " + this.state.flaps}</h5>
            <h5>{"Speed: " + this.state.speed}</h5>
            <h5>{"Weight: " + this.state.weight}</h5>
            <h5>{"Center of Gravity: " + this.state.cg}</h5>
            <h5>{"Pitch Angle: " + this.state.pitch}</h5>
            <h5>{"Metric?: " + this.state.airUnits}</h5> <br /> */}

				<Stage
					style={{
						backgroundColor: "green",
						marginTop: 80,
						marginLeft: 0,
						marginRight: 0,
						height: "450px",
						width: "1500px",
					}}
					width={this.state.stageWidth}
					height={this.state.stageHeight}
				>
					{/* <Layer style={{ padding: 55 }}> */}
					<Layer>
						<Runway
							runWidth={this.state.runWidth}
							runLength={this.state.runLength}
						/>
						<LightType approachlights={this.state.approachlights} />
						<ThresholdLights />
						<ThresholdBars runwidth={this.state.width} />
						<RunwayMarkingsDraw edgespacing={this.state.edgespacing} />
						<GroundSegmentRender
							xahead={this.props.xahead}
							xbeyond={this.props.xbeyond}
						/>
					</Layer>
				</Stage>
				{/* <img src={outputImg} alt="Output Variable Chart" /> */}
			</div>
		);
	}
}
export { Runway };
export default OutputVisuals;
