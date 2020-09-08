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
    //For all middle aligned lights
    for (let i=0; i < 5; i++) {
        for (let j=1; j <= 5; j++) {
            items.push({
                x: (550 + (20 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                y: (210 + (4*j)),//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                id: i + " , " + j,
            })
        }
        // For further spaced white light bars after row 5
        for (let t=1; t <= 1; t++) {
            items.push({
                x: (650 + (20 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                y: (222),//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                id: i + "t",
            })
        } 
    }
    // For extra white lights above center
    for (let t=1; t <= 8; t++) {
        items.push({
            x: 650,
            y: (140 + (4*t)),
            id: t + "alt",
        })
    }
    //For extra white lights below center
    for (let t=1; t <= 8; t++) {
        items.push({
            x: 650,
            y: (268 + (4*t)),
            id: t + "alt",
        })
    }
    return items
}

function generateMALSF() {
    const items = []
    //For all middle aligned lights
    for (let i=0; i < 4; i++) {
        for (let j=1; j <= 5; j++) {
            items.push({
                x: (550 + (20 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                y: (210 + (4*j)),//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                id: i + " , " + j,
            })
        }
        // For further spaced white light bars after row 5
         
    }
    for (let i=0; i < 2; i++){
        for (let t=1; t <= 5; t++) {
            items.push({
                x: (650 + (40 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                y: (210 + (4*t)),//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                id: i + "t",
            })
        }
        for (let t=1; t <= 5; t++) {
            items.push({
                x: (665 + (40 * (i+1))),
                y: 222
            })
        }
    }
    return items
}
function generateMALSFGreenLight() {
    const items = []
    // For center forest green lights at row 5
    for (let t=1; t <= 5; t++) {
        items.push({
            x: 650,
            y: (210 + (4*t)),
            id: t + "malsf"
        })
    }
    // For extra forest green lights above center at row 5
    for (let t=1; t <= 8; t++) {
        items.push({
            x: 650,
            y: (140 + (4*t)),
            id: t + "malsf",
        })
    }
    //For extra forest green lights below center at row 5
    for (let t=1; t <= 8; t++) {
        items.push({
            x: 650,
            y: (268 + (4*t)),
            id: t + "malsf",
        })
    }
    return items
}

function generateSSALR() {
    const items = []
    for (let i=0; i < 10; i++) {
        
            for (let j=1; j <= 5; j++) {
                items.push({
                    x: (550 + (40 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
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
                    x: (550 + (40 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                    y: (210 + (4*j)),//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                    id: i + " , " + j,
                })
            } 
        
    }
    return items
}

function generateALSF1() {
    const items = []
    // For main center white light bars up to 10 rows
    for (let i=0; i < 10; i++) {
        
            for (let j=1; j <= 5; j++) {
                items.push({
                    x: (570 + (10 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                    y: (210 + (4*j)),//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                    id: i + " , " + j,
                })
            } 
        
    }
    // For main center white light bars past row 10
    for (let i=0; i < 14; i++) {
        
        for (let j=1; j <= 5; j++) {
            items.push({
                x: (650 + (40 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                y: (210 + (4*j)),//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                id: i + "af2",
            })
        }     
    }
    // For single bright directional LEDS in between after row 10 light bars
    for (let i=0; i < 15; i++) {
        
        for (let j=1; j <= 1; j++) {
            items.push({
                x: (670 + (40 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                y: 222 ,//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                id: i + "aft2",
            })
        }     
    }
    // The extra white lights at row 10
    for (let i=1; i <= 8; i++) {
        items.push({
            x: 650,
            y: (132 + (4*i)),
            id: i + "r",
        })
    }
    for (let i=1; i <= 8; i++) {
        items.push({
            x: 650,
            y: (280 + (4*i)),
            id: i + "r",
        })
    }
    return items
}

function generateALSF2() {
    const items = []
    // For main center white light bars up to 10 rows
    for (let i=0; i < 10; i++) {
        
            for (let j=1; j <= 5; j++) {
                items.push({
                    x: (550 + (10 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                    y: (210 + (4*j)),//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                    id: i + " , " + j,
                })
            } 
        
    }
    // For main center white light bars past row 10
    for (let i=0; i < 14; i++) {
        
        for (let j=1; j <= 5; j++) {
            items.push({
                x: (650 + (40 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                y: (210 + (4*j)),//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                id: i + "af2",
            })
        }     
    }
    // For single bright directional LEDS in between after row 10 light bars
    for (let i=0; i < 15; i++) {
        
        for (let j=1; j <= 1; j++) {
            items.push({
                x: (670 + (40 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                y: 222 ,//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                id: i + "aft2",
            })
        }     
    }
    // The extra lights at row 5
    for (let i=1; i <= 3; i++) {
        items.push({
            x: 600,
            y: (182 + (4*i)),
            id: i + "r",
        })
    }
    for (let i=1; i <= 3; i++) {
        items.push({
            x: 600,
            y: (250 + (4*i)),
            id: i + "r",
        })
    }
    // The extra white lights at row 10
    for (let i=1; i <= 8; i++) {
        items.push({
            x: 650,
            y: (132 + (4*i)),
            id: i + "r",
        })
    }
    for (let i=1; i <= 8; i++) {
        items.push({
            x: 650,
            y: (280 + (4*i)),
            id: i + "r",
        })
    }
    return items
}

function generateALSF1RedLights() {
    const items = []
    for (let i=0; i < 1; i++) {
        //Create repeated red lights per row lined up with the other white lights
        //for (let j=1; j <= 6; j++){
            // Middle red led bar on second row
            for (let j=1; j <= 5; j++) {
                items.push({
                    x: (550 + (20 * (i+1))),//(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
                    y: (210 + (4*j)),//(297 + (20 * (i+1))), // Needed to change to the next row down. 
                    id: i + " , " + j,
                })
            } 
                // For extra red lights above first row
                for (let t=1; t <= 5; t++) {
                    items.push({
                        x: (550 + (10 * (i+1))),
                        y: (140 + (4*t)),
                        id: t + "alt",
                    })
                }
                //For extra red lights below first row
                for (let t=1; t <= 5; t++) {
                    items.push({
                        x: (550 + (10 * (i+1))),
                        y: (292 + (4*t)),
                        id: t + "alt",
                    })
                }
        //}
    }
    for (let i=0; i < 1; i++) {
        //Create repeated red lights per row lined up with the other white lights
        //for (let j=1; j <= 6; j++){
                // For extra red lights above second row
                for (let t=1; t <= 5; t++) {
                    items.push({
                        x: (550 + (20 * (i+1))),
                        y: (160 + (4*t)),
                        id: t + "alt",
                    })
                }
                //For extra red lights below second row
                for (let t=1; t <= 5; t++) {
                    items.push({
                        x: (550 + (20 * (i+1))),
                        y: (272 + (4*t)),
                        id: t + "alt",
                    })
                }
        //}
    }
    return items
}

function generateALSF2RedLights() {
    const items = []
    for (let i=0; i < 9; i++) {
        //Create repeated red lights per row lined up with the other white lights
        //for (let j=1; j <= 6; j++){
                // For extra red lights above center
                for (let t=1; t <= 3; t++) {
                    items.push({
                        x: (550 + (10 * (i+1))),
                        y: (140 + (4*t)),
                        id: t + "alt",
                    })
                }
                //For extra red lights below center
                for (let t=1; t <= 3; t++) {
                    items.push({
                        x: (550 + (10 * (i+1))),
                        y: (292 + (4*t)),
                        id: t + "alt",
                    })
                }
        //}
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
        items: generateMALSF(),
        greenitems: generateMALSFGreenLight()
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
                {this.state.greenitems.map(item => (
                    <Circle
                        key={item.id}
                        x={item.x}
                        y={item.y}
                        fill="forestgreen"
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
        items: generateALSF1(),
        reditems: generateALSF1RedLights()
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
                {this.state.reditems.map(item => (
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
class ALSF2 extends Component {
    state = {
        items: generateALSF2(),
        reditems: generateALSF2RedLights()
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
                {this.state.reditems.map(item => (
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

export { MALSR, MALSF, SSALR, SSALF, ALSF1, ALSF2 };
