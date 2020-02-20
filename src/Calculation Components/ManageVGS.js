import React, { Component } from 'react'
import {
    Accordion,
    Button,
    Col,
    Container,
    Row,
    AccordionCollapse,
    AccordionToggle
} from 'react-bootstrap'
import {
    Stage,
    Layer,
    Rect,
    Text
} from 'react-konva'

{/* <Button
                    variant="primary"
                    size="x-lg"
                    onClick={() => this.setState({ showVGS: true })}
                    eventKey='0'
                  ></Button> */}
class ManageVGS extends Component {
    state = {
        color: 'gray',
        stageWidth: 900,
        showVGS: false
    }
    render () {
        // All objects should be visible in a 900x900 scene
        const CANVAS_VIRTUAL_WIDTH = 600
        const CANVAS_VIRTUAL_HEIGHT = 900

        // Scale this to smaller screens
        const scaleWidth = Math.min(
            window.innerWidth / CANVAS_VIRTUAL_WIDTH,
            
        )
        const scaleHeight = Math.min(
            window.innerHeight / CANVAS_VIRTUAL_HEIGHT
        );
        return (
          <Accordion>
            <Container align="center">
              <Row>
                <Col sm align="center">
                  <AccordionToggle as={Button} eventKey='0'>
                    Calculate Visual Ground Segment
                  </AccordionToggle>
                </Col>
              </Row>
              <Accordion.Collapse eventKey="0">
                <Row>
                  <Col sm slign="center">
                    <Stage
                      width={window.innerWidth}
                      height={window.outerHeight}
                      scaleX={scaleWidth}
                      scaleY={scaleHeight}
                    >
                      <Layer style={{ padding: 25 }}>
                        <Rect
                          x={window.innerWidth}
                          y={window.innerHeight}
                          width={window.innerWidth}
                          height={window.innerHeight}
                          fill={this.state.color}
                          shadowBlur={3}
                        />
                      </Layer>
                    </Stage>
                  </Col>
                </Row>
              </Accordion.Collapse>
            </Container>
          </Accordion>
        );
    }
}

export default ManageVGS
