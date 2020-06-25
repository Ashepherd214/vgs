import React, { Component } from 'react'
import {
    Col,
    Container,
    Row,
    Tab,
    Tabs
} from 'react-bootstrap'
import {
    Stage,
    Layer,
    Rect,
}   from 'react-konva'
import OutputVisuals from './OutputVisual'



class ManageVGS extends Component {
    state = {
        color: 'gray',
        stageWidth: 1000,
        stageHeight: 400,
    }

    // componentDidMount() {
    //   this.checkSize();

    //   window.addEventListener("resize", this.checkSize)
    // }

    // componentWillUnmount() {
    //   window.removeEventListener("resize", this.checkSize)
    // }

    // checkSize = () => {
    //   const width = window.innerWidth / 1.35
    //   const height = window.innerHeight / 1.5625
    //   this.setState({
    //     stageWidth: width,
    //     stageHeight: height
    //   })
    // }
    render () {
        // All objects should be visible in a 900x900 scene
        // const runWidthShow = this.state.stageWidth
        // const runLengthShow = this.state.stageHeight
        // console.log("Stage Height is: " + this.state.stageHeight)
        // Scale this to smaller screens
        // const scaleWidth = (runWidthShow)
        // const scaleHeight = (runLengthShow)
        //console.log("Scaled Width is: " + scaleWidth)
        //console.log("Scaled Height is: " + scaleHeight)

//------------------This is where Runway function was -------------------------------------------------------------//

        return (
          //-------Tab Layout---------//
          <Tabs defaultActiveKey="outputs" id="data-tabs">
            <Tab eventKey="outputs" title="Output">
              <Container style ={{ margin: 0, marginRight: 0, padding: 5}}>
                <Row >
                  <Col md={12}>
                    <OutputVisuals runwayName={this.props.runwayName} aircraftName={this.props.aircraftName}></OutputVisuals>
                  </Col>
                </Row>
                
              </Container>
              
            </Tab>
            <Tab eventKey="inputs" title="Input">

            </Tab>
            <Tab eventKey="aircraft-location" title="Aircraft Location">

            </Tab>
            <Tab eventKey="parameters" title="Parameters">
               
            </Tab>
          </Tabs>

          //--------Old Layout--------//
          // <Container align="center" 
          //   ref={node => {
          //     this.container = node
          //   }}>
          //   <Row noGutters={false}>
          //     <Col xs={true} align="center">
          //       <Stage width={this.state.stageWidth} height={this.state.stageHeight}>
          //         <Layer style={{ padding: 55 }}>
          //           <Runway xPos={scaleWidth} yPos={scaleHeight} runWidth={runWidthShow} runLength={runLengthShow}/>
          //         </Layer>
          //       </Stage>
          //     </Col>
          //   </Row>
          // </Container>
        );
    }
}

export default ManageVGS
