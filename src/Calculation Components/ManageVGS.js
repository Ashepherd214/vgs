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

const Runway = ({ scaleWidth, scaleHeight }) => {
  const rectWidth = (window.innerWidth * 0.5)
  const rectHeight = (window.innerHeight * 0.60)
  const yPos = (scaleHeight)
  return (
    <Rect
      x={scaleWidth }
      y={scaleHeight}
      width={ rectWidth }
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
    render () {
        // All objects should be visible in a 900x900 scene
        const CANVAS_VIRTUAL_WIDTH = 600
        const CANVAS_VIRTUAL_HEIGHT = 900
        // Scale this to smaller screens
        const scaleWidth = (window.innerWidth * 0.75)
        const scaleHeight = (window.innerHeight * 0.90)
        return (
          <Container align="center">
            <Row noGutters={false}>
              <Col xs={true} align="center">
                <Stage width={scaleWidth} height={scaleHeight}>
                  <Layer style={{ padding: 55 }}>
                    <Runway winWidth={scaleWidth} winHeight={scaleHeight}/>
                  </Layer>
                </Stage>
              </Col>
            </Row>
          </Container>
        );
    }
}

export default ManageVGS
