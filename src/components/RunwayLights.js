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

//------------------------Light Drawings------------------------------//
function generateMALSR() {
    const items = []
    for (let i=0; i < 10; i++) {
        
            for (let j=1; j <= 5; j++) {
                items.push({
                    x: (510 + (40 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                    y: (210 + (4*j)),//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                    id: i + " , " + j,
                })
            } 
        
    }
    return items
}

function generateMALSF() {
    const items = []
    for (let i=0; i < 10; i++) {
        
            for (let j=1; j <= 5; j++) {
                items.push({
                    x: (510 + (40 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                    y: (210 + (4*j)),//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                    id: i + " , " + j,
                })
            } 
        
    }
    return items
}

function generateSSALR() {
    const items = []
    for (let i=0; i < 10; i++) {
        
            for (let j=1; j <= 5; j++) {
                items.push({
                    x: (510 + (40 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                    y: (210 + (4*j)),//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                    id: i + " , " + j,
                })
            } 
        
    }
    return items
}

function generateSSALF() {
    const items = []
    for (let i=0; i < 10; i++) {
        
            for (let j=1; j <= 5; j++) {
                items.push({
                    x: (510 + (40 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                    y: (210 + (4*j)),//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                    id: i + " , " + j,
                })
            } 
        
    }
    return items
}

function generateALSF1() {
    const items = []
    for (let i=0; i < 10; i++) {
        
            for (let j=1; j <= 5; j++) {
                items.push({
                    x: (510 + (40 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                    y: (210 + (4*j)),//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                    id: i + " , " + j,
                })
            } 
        
    }
    return items
}

function generateALSF2() {
    const items = []
    for (let i=0; i < 10; i++) {
        
            for (let j=1; j <= 5; j++) {
                items.push({
                    x: (510 + (40 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                    y: (210 + (4*j)),//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                    id: i + " , " + j,
                })
            } 
        
    }
    return items
}

//---------------------------End Section------------------------------//

//---------------------------Light Classes----------------------------//

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

class MALSF extends Component {
    state = {
        items: generateMALSF()
    }
    render() {
        return (
            <Group>
                {this.state.items.map(item => (
                    <Circle
                        key={item.id}
                        x={item.x}
                        y={item.y}
                        fill="yellow"
                        radius={1}
                        shadowBlur={3}
                    />
                
                ))}
            </Group>
        )
    }
}
class SSALR extends Component {
    state = {
        items: generateSSALR()
    }
    render() {
        return (
            <Group>
                {this.state.items.map(item => (
                    <Circle
                        key={item.id}
                        x={item.x}
                        y={item.y}
                        fill="red"
                        radius={1}
                        shadowBlur={3}
                    />
                
                ))}
            </Group>
        )
    }
}
class SSALF extends Component {
    state = {
        items: generateSSALF()
    }
    render() {
        return (
            <Group>
                {this.state.items.map(item => (
                    <Circle
                        key={item.id}
                        x={item.x}
                        y={item.y}
                        fill="blue"
                        radius={1}
                        shadowBlur={3}
                    />
                
                ))}
            </Group>
        )
    }
}
class ALSF1 extends Component {
    state = {
        items: generateALSF1()
    }
    render() {
        return (
            <Group>
                {this.state.items.map(item => (
                    <Circle
                        key={item.id}
                        x={item.x}
                        y={item.y}
                        fill="violet"
                        radius={1}
                        shadowBlur={3}
                    />
                
                ))}
            </Group>
        )
    }
}
class ALSF2 extends Component {
    state = {
        items: generateALSF2()
    }
    render() {
        return (
            <Group>
                {this.state.items.map(item => (
                    <Circle
                        key={item.id}
                        x={item.x}
                        y={item.y}
                        fill="orange"
                        radius={1}
                        shadowBlur={3}
                    />
                
                ))}
            </Group>
        )
    }
}

export { MALSR, MALSF, SSALR, SSALF, ALSF1, ALSF2 };
