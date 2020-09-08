import React, { Component } from 'react'
import firebase from "../Firestore"
import {
    Col,
    Container,
    Row,
} from 'react-bootstrap'
import {
    Stage,
    Layer,
    Rect,
}   from 'react-konva'
import { ThresholdLights } from '../components/Threshold Lights Draw'
import {
  MALSR,
  MALSF, 
  SSALR,
  SSALF,
  ALSF1,
  ALSF2
} from '../components/RunwayLights'

function Runway (props) {
  return (
    <Rect
      x={0}
      y={120}
      width={ props.runLength }
      height= { props.runWidth }
      fill="gray"

      shadowBlur={3}
    />
  );
}

function GrassApproach (props) {
  return (
    <Rect
      x={10}
      y={296}
      width={ props.runLength }
      height= { props.runWidth }
      fill="green"
      shadowBlur={3}
    />
  )
}

function LightType (props) {
  // const lights = props.Lights
   console.log("Light Type prop detected: " + this.props.Lights)
    //Should accept props coming from Runways table to determine which lights to show on the outputs tab.
    //Based on incoming props, should call out to RunwayLights.js and render the respective component
    switch(props.Lights) {
      case MALSR:
        return <MALSR />
      case MALSF:
        return <MALSF />
      case SSALR:
        return <SSALR />
      case SSALF:
        return <SSALF />
      case ALSF1:
        return <ALSF1 />
      case ALSF2:
        return <ALSF2 />
    }
}


function Diagram (props) {

} 

function VisualOutputVals (props) {

}

function DiagramTextbox (props) {

}

class OutputVisuals extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
          color: 'beige',
          stageWidth: 1600,
          stageHeight: 500,
          runLength: 550,
          runWidth: 200,
          lights: " ",
          //Runway state variables
          icao: " ",
          approachlights: " ",
          dh: " ",
          edgespacing: " ",
          gsx: " ",
          gsy: " ",
          glideslope: " ",
          tch: " ",
          width: " ",
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
      }
      this.getRunwayData = this.getRunwayData.bind(this)
    }
    componentDidMount() {
      //this.checkSize();
      this.getRunwayData(this.props.runwayName)
      this.getAircraftData(this.props.aircraftName)
      //window.addEventListener("resize", this.checkSize)
    }

    componentWillUnmount() {
      //window.removeEventListener("resize", this.checkSize)
    }

    getRunwayData(runwayName) {
      //const runwayName = this.props.runwayName
      console.log(runwayName)
      const runDb = firebase.firestore().collection("Runways").doc(runwayName.toString())
    
      runDb.get()
      .then(doc => {
        const data = doc.data()
        console.log(data)
        this.setState({
          icao: doc.data().ICAO,
          approachlights: doc.data().ApproachLights,
          dh: doc.data().DH,
          edgespacing: doc.data().EdgeSpacing,
          gsx: doc.data().GSOffsetX,
          gsy: doc.data().GSOffsetY,
          glideslope: doc.data().GlideSlope,
          tch: doc.data().TCH,
          width: doc.data().Width,
          runUnits: String(doc.data().Units),
          lights: doc.data().ApproachLights,
        })
      })
    }

    getAircraftData (aircraftName) {
      console.log(aircraftName)
      const airDb = firebase.firestore().collection("Aircrafts").doc(aircraftName.toString())
    
      airDb.get()
      .then(doc => {
        const data = doc.data()
        console.log(data)
        setTimeout(() => {
        this.setState({
          airName: doc.id,
          ze: doc.data().Ze,
          xe: doc.data().Xe,
          lookdown: doc.data().lookdown,
          za: doc.data().Za,
          xa: doc.data().Xa,
          flaps: doc.data().flaps,
          speed: doc.data().speed,
          weight: doc.data().weight,
          cg: doc.data().cg,
          pitch: doc.data().pitch,
          airUnits: String(doc.data().unitsAir),
        })},600)
      })
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
        console.log(this.state.approachlights)
        const lights = this.state.approachlights
        console.log("Variable lights: " + lights)
        
        return (
          <div>
            {/* <label>Selected Runway Data: </label>
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
            <Stage style={{ backgroundColor: "green", marginTop: 80, marginLeft: 0, marginRight: 0, height: '500px', width: '1000px' }} width={this.state.stageWidth } height={this.state.stageHeight }>
                {/* <Layer style={{ padding: 55 }}> */}
                <Layer>
                    <Runway runWidth={this.state.runWidth} runLength={this.state.runLength}/>
                    <LightType Lights={this.state.lights} />
                    <ThresholdLights />
                </Layer>
            </Stage>
            <label>X Ahead:</label>
            </div>
        );
    }
}
export {LightType, Runway}
export default OutputVisuals