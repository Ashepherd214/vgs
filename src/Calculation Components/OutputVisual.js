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

function Runway (props) {
    const rectHeight = window.innerHeight
    //console.log("window height is" + rectHeight)
    //console.log("Runway x position passed is: " + props.xPos )
    //console.log("Runway y position passed is: " + props.yPos )
    //console.log("Runway width passed is: " + props.runWidth )
    //console.log("Runway length passed is: " + props.runLength )
    //const xPos = (scaleWidth)
    //const yPos = (scaleHeight)
    return (
      <Rect
        x={200}
        y={50}
        width={ props.runWidth }
        height= { props.runLength }
        fill="gray"
        stroke="black"
        shadowBlur={3}
      />
    );
}

function LightType (props) {
    //Should accept props coming from Runways table to determine which lights to show on the outputs tab.
}

function Diagram (props) {

} 

function VisualOutputVals (props) {

}

function DiagramTextbox (props) {
    
}

  export default Runway;