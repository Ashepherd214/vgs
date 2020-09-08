import React, { Component } from 'react'
import {
    Col,
    Container,
    Row,
} from 'react-bootstrap'
import {
    Stage,
    Layer,
    Group,
    Rect,
    Circle,
}   from 'react-konva'


function generateThreshold() {
    const items = []
		for (let t=1; t <= 47; t++) {
			items.push({
				x: 550,
				y: (100 + (5*t)),
				id: t + "t",
			})
		}
    return items
}

class ThresholdLights extends Component {
    state = {
        items: generateThreshold()
    }
    render() {   
        return (
            <Group>
                {this.state.items.map(item => (
                    <Circle
                        key={item.id}
                        x={item.x}
                        y={item.y}
                        fill="lightgreen"
                        radius={1}
                        shadowBlur={3}
                    />
                
                ))}
            </Group>
        )
    }
}

export {ThresholdLights}