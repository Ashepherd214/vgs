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
import Runway from './OutputVisual'



class ManageVGS extends Component {
    state = {
        color: 'gray',
        stageWidth: 900,
    }

    componentDidMount() {
      this.checkSize();

      window.addEventListener("resize", this.checkSize)
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.checkSize)
    }

    checkSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      this.setState({
        stageWidth: width,
        stageHeight: height
      })
    }
    render () {
        // All objects should be visible in a 900x900 scene
        const runWidthShow = this.state.stageWidth / 2
        const runLengthShow = this.state.stageHeight / 1.1
        // console.log("Stage Height is: " + this.state.stageHeight)
        // Scale this to smaller screens
        const scaleWidth = (runWidthShow)
        const scaleHeight = (runLengthShow)
        //console.log("Scaled Width is: " + scaleWidth)
        //console.log("Scaled Height is: " + scaleHeight)

//------------------This is where Runway function was -------------------------------------------------------------//

        return (
          <Container align="center" 
            ref={node => {
              this.container = node
            }}>
            <Row noGutters={false}>
              <Col xs={true} align="center">
                <Stage width={this.state.stageWidth} height={this.state.stageHeight}>
                  <Layer style={{ padding: 55 }}>
                    <Runway xPos={scaleWidth} yPos={scaleHeight} runWidth={runWidthShow} runLength={runLengthShow}/>
                  </Layer>
                </Stage>
              </Col>
            </Row>
          </Container>
        );
    }
}

export default ManageVGS
