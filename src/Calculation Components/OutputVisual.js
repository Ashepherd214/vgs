import React, { Component } from 'react'
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
      width={ props.runWidth }
      height= { props.runLength }
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
    state = {
        color: 'beige',
        stageWidth: 1000,
        stageHeight: 400,
    }

    componentDidMount() {
      this.checkSize();

      window.addEventListener("resize", this.checkSize)
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.checkSize)
    }

    checkSize = () => {
      //const width = window.innerWidth
      //const height = window.innerHeight
      this.setState({
        stageWidth: window.innerWidth,
        stageHeight: window.innerHeight
      })
    }
    render() {
        const runLength = this.state.stageHeight * 0.36
        const runWidth = this.state.stageWidth * 0.35
        //const scaleWidth = (runWidthShow)
        //const scaleHeight = (runLengthShow)
        return (
            <Stage style={{ backgroundColor: "green", marginTop: 80, marginLeft: 0, marginRight: 0 }} width={this.state.stageWidth } height={this.state.stageHeight * 0.75}>
                <Layer style={{ padding: 55 }}>
                    <Runway runWidth={runWidth} runLength={runLength}/>
                    <LightType Lights={MALSR} />
                </Layer>
            </Stage>
        );
    }
}

  export { OutputVisuals, Runway, LightType, Diagram, VisualOutputVals, DiagramTextbox };