/**constiable descriptions
 * zeg - pilot's eye above ground
 * zag - GS antenna above ground
 * xanteye - horizontal distance from eye to gs ant
 * Xax - horiz ground dist from GS ant to GS Tx
 * gndrvr - effective ground RVR
 * xcutoff - cut off angle
 * obseg - obscured segment
 * FOV - Field of View
 * xthres - GS antenna to RWY threshold
 * xeyethres - eyepoint to RWY threshold
 * xahead - visible before threshold
 * xbeyond - visible after threshold
 */

/**All calculations for VGS Chart drawing
 * zeg = (dh + ze)* cos(pitch angle)+ xe * sin(pitch angle)
 * zag = (dh + za)*cos(pitch angle) + xa * sin(pitch angle)
 * xanteye = (xa -xe)*cos(glide slope)+(ze-za)*sin(glide slope) 
 * Xax = sqrt( (zag/tan(3))^2 - (yxmtr^2))
 * gndrvr = Sqrt( xrvr^2 - zeg^2)
 * xcutoff =  lda - pa
 * obseg = zeg / tan(xcutoff)
 * FOV = gndrvr - obseg
 * xthres = Xax - xxmtr
 * xeyethres = xthres + xanteye
 * xahead = xthres - (obseg - xanteye)
 * xbeyond = FOV - xahead
 */

 /**Needed constiables from props
  * dh
  * ze
  * za
  * pitch angle
  * xe
  * xa
  * glide slope
  */

/** All available props
 * runwayIcao={this.props.runwayIcao}
    runwayDh={this.props.runwayDh} - dh
    runwayEdgeSpacing={this.props.runwayEdgeSpacing}
    runwayGsx={this.props.runwayGsx}
    runwayGsy={this.props.runwayGsy}
    runwayGlideSlope={this.props.runwayGlideSlope} - glide slope
    runwayTch={this.props.runwayTch}
    runwayWidth={this.props.runwayWidth}
    runwayUnits={this.props.runwayUnits}
    aircraftXa={this.props.aircraftXa} - xa
    aircraftXe={this.props.aircraftXe} - xe
    aircraftZa={this.props.aircraftZa} - za
    aircraftZe={this.props.aircraftZe} - ze
    aircraftCg={this.props.aircraftCg}
    aircraftFlaps={this.props.aircraftFlaps}
    aircraftLookdown={this.props.aircraftLookdown}
    aircraftPitch={this.props.aircraftPitch} - pitch angle
    aircraftSpeed={this.props.aircraftSpeed}
    aircraftWeight={this.props.aircraftWeight}
    aircraftUnits={this.props.aircraftUnits}
 */

import React, { Component, useState } from 'react'

function CalculateGroundSegment(props) {

    dh= this.props.runwayDh
    glideSlope= this.props.runwayGlideSlope
    xa= this.props.aircraftXa
    xe= this.props.aircraftXe
    za= this.props.aircraftZa
    ze= this.props.aircraftZe
    pitch= this.props.aircraftPitch
    gsx= this.props.runwayGsx
    gsy= this.props.runwayGsy
    lookdown= this.props.aircraftLookdown

    const xcutoff =  lookdown - pitch
    const zeg = (dh + ze)* Math.cos(pitch)+ xe * Math.sin(pitch)
    const zag = (dh + za)* Math.cos(pitch) + xa * Math.sin(pitch)
    const xanteye = (xa -xe) * Math.cos(glideSlope) + (ze-za) * Math.sin(glideSlope) 
    const obseg = zeg / Math.tan(xcutoff)
    const gndrvr = 1200//Math.sqrt( xrvr^2 - zeg^2)
    const fov = gndrvr - obseg
    const xax = Math.sqrt( (zag/Math.tan(3))^2 - (gsy^2))
    const xrvr = Math.sqrt(((fov + obseg)^2) + (zeg)^2)
    const xthres = xax - gsx
    const xeyethres = xthres + xanteye
    const xahead = xthres - (obseg - xanteye)
    const xbeyond = fov - xahead
}

class GroundSegment extends Component {
    
    
    constructor(props) {
        super(props)

            // const dh = this.props.dh
            // const glideSlope = this.props.glideslope
            // const xa = this.props.xa
            // const xe = this.props.xe
            // const za = this.props.za
            // const ze = this.props.ze
            // const pitch = this.props.pitch
            // const gsx = this.props.gsx
            // const gsy = this.props.gsy
            // const lookdown = this.props.lookdown

            
        

        this.state = {
            dh: this.props.runwayDh,
            glideSlope: this.props.runwayGlideSlope,
            xa: this.props.aircraftXa,
            xe: this.props.aircraftXe,
            za: this.props.aircraftZa,
            ze: this.props.aircraftZe,
            pitch: this.props.aircraftPitch,
            gsx: this.props.runwayGsx,
            gsy: this.props.runwayGsy,
            lookdown: this.props.aircraftLookdown,
            xahead: "",
            xbeyond: "",
            zeg: "",
            zag: "",
            xanteye: "",
            xax: "",
            gndrvr: "",
            xcutoff: "",
            obseg: "",
            xthre: "",
            xeyethres: "",
            XAhead: "",
            XBeyond: "",
            Zeg: "",
            Zag: "",
            Xanteye: "", 
            Xax: "",
            Gndrvr: "",
            Xcutoff: "",
            Obseg: "",
            Xthres: "",
            Xeyethres: "",
            RealXAhead: "",
            RealXBeyond: "",
            FOV: "",
            XAheadTCH: "",
            XBeyondTCH: "",
            RealXAheadTCH: "",
            RealXBeyondTCH: "",
            
        }
        
        this.setState({
            xcutoff:  lookdown - pitch,
            zeg: (dh + ze)* Math.cos(pitch)+ xe * Math.sin(pitch),
            zag: (dh + za)* Math.cos(pitch) + xa * Math.sin(pitch),
            xanteye: (xa -xe) * Math.cos(glideSlope) + (ze-za) * Math.sin(glideSlope),
            obseg: zeg / Math.tan(xcutoff),
            gndrvr: 1200,//Math.sqrt( xrvr^2 - zeg^2)
            fov: gndrvr - obseg,
            xax: Math.sqrt( (zag/Math.tan(3))^2 - (gsy^2)),
            xrvr: Math.sqrt(((fov + obseg)^2) + (zeg)^2),
            xthres: xax - gsx,
            xeyethres: xthres + xanteye,
            xahead: xthres - (obseg - xanteye),
            xbeyond: fov - xahead
            })
        

        console.log("Zeg = " + this.state.Zeg)
        console.log("Zag = " + this.state.Zag)
        console.log("Xanteye = " + this.state.Xanteye)
        console.log("Xax = " + this.state.Xax)
        console.log("Gndrvr = " + this.state.Gndrvr)
        console.log("Xcutoff = " + this.state.Xcutoff)
        console.log("Obseg = " + this.state.Obseg)
        console.log("Xthres = " + this.state.Xthres)
        console.log("Xeyethes = " + this.state.Xeyethes)
    }
    componentDidMount() {
        this.setState({
            XAhead: this.state.xahead,
            XBeyond: this.state.xbeyond,
            Zeg: this.state.zeg,
            Zag: this.state.zag,
            Xanteye: this.state.xanteye, 
            Xax: this.state.xax,
            Gndrvr: this.state.gndrvr,
            Xcutoff: this.state.xcutoff,
            Obseg: this.state.obseg,
            Xthres: this.state.xthres,
            Xeyethres: this.state.xeyethres,
        })
    }
    
    render () {
        return 
            //return lines for the Visual indicators according to the calculated data
            // and pass the values back up to display the outputs and input values.
        
    }
    
}




 export {GroundSegment}