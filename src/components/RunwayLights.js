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


//----------------To be fixed and added later --------------//
// if(i=4) {
        //     for (let k=-5; k <=10; k++) {
        //         if (k < 1) {
        //             items.push({
        //                 x: (60 + (4*k)),
        //                 y: (297 + (20 * 5)),
        //                 id: "Special " + k.toString,
        //             })
        //         }
        //         else if (k >=1 ) {
        //             items.push({
        //                 x: (85 + (4*k)),
        //                 y: (297 + (20 * 5)),
        //                 id: "Special " + k.toString,
        //             })
        //         }
        //         else {
        //             items.push({
        //                 x: (106 + (4*k)),
        //                 y: (297 + (20 * 5)),
        //                 id: "Special " + k.toString,
        //             })
        //         }
        //     }
        // }
        // else {
//------------------------End Section --------------------------------//
function generateMALSR() {
    const items = []
    for (let i=0; i < 10; i++) {
        
            for (let j=1; j <= 5; j++) {
                items.push({
                    x: (467 + (40 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                    y: (220 + (4*j)),//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                    id: i + " , " + j,
                })
            } 
        
    }
    return items
}

class MALSR extends Component {
    state = {
        items: generateMALSR()
    }
    render() {   
        return (
            <Group>
                {this.state.items.map(item => (
                    <Circle
                        key={item.id}
                        x={item.x}
                        y={item.y}
                        fill="white"
                        radius={1}
                        shadowBlur={3}
                    />
                
                ))}
            </Group>
        )
    }
}

const MALSF = () => {
    return (
        <Button variant="primary">Calculate VGS</Button>
    )
}
const SSALR = () => {
    return (
        <Button variant="primary">Calculate VGS</Button>
    )
}
const SSALF = () => {
    return (
        <Button variant="primary">Calculate VGS</Button>
    )
}
const ALSF1 = () => {
    return (
        <Button variant="primary">Calculate VGS</Button>
    )
}
const ALSF2 = () => {
    return (
        <Button variant="primary">Calculate VGS</Button>
    )
}

export { MALSR, MALSF, SSALR, SSALF, ALSF1, ALSF2 };
