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
} from 'react-konva'

const Runway = ({ scaleWidth, scaleHeight, runWidthShow }) => {
  const rectWidth = (window.innerWidth * 0.5)
  const rectHeight = (window.innerHeight * 0.60)
  //const xPos = (scaleWidth)
  //const yPos = (scaleHeight)
  return (
    <Rect
      x={scaleWidth}
      y={scaleHeight}
      width={ runWidthShow }
      height={ rectHeight }
      fill={'gray'}
      shadowBlur={3}
    />
  );
}

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
      const width = this.container.offsetWidth
      this.setState({
        stageWidth: width
      })
    }
    render () {
        // All objects should be visible in a 900x900 scene
        const CANVAS_VIRTUAL_WIDTH = 600
        const CANVAS_VIRTUAL_HEIGHT = 900
        const runWidthShow = this.state.stageWidth / 3
        // Scale this to smaller screens
        const scaleWidth = (window.innerWidth)
        const scaleHeight = (window.innerHeight)
        return (
          <Container align="center" 
            ref={node => {
              this.container = node
            }}>
            <Row noGutters={false}>
              <Col xs={true} align="center">
                <Stage width={this.state.stageWidth} height={scaleHeight}>
                  <Layer style={{ padding: 55 }}>
                    <Runway xPos={scaleWidth} yPos={scaleHeight} runWidth={runWidthShow}/>
                    {console.log("Stage Width is" + this.state.stageWidth)}
                    {console.log("Runway Width is" + runWidthShow)}
                  </Layer>
                </Stage>
              </Col>
            </Row>
          </Container>
        );
    }
}

export default ManageVGS
