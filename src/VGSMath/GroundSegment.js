/**letiable descriptions
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

 /**Needed letiables from state
  * dh
  * ze
  * za
  * pitch angle
  * xe
  * xa
  * glide slope
  */

/** All available state
 * runwayIcao={this.state.runwayIcao}
    runwayDh={this.state.runwayDh} - dh
    runwayEdgeSpacing={this.state.runwayEdgeSpacing}
    runwayGsx={this.state.runwayGsx}
    runwayGsy={this.state.runwayGsy}
    runwayGlideSlope={this.state.runwayGlideSlope} - glide slope
    runwayTch={this.state.runwayTch}
    runwayWidth={this.state.runwayWidth}
    runwayUnits={this.state.runwayUnits}
    aircraftXa={this.state.aircraftXa} - xa
    aircraftXe={this.state.aircraftXe} - xe
    aircraftZa={this.state.aircraftZa} - za
    aircraftZe={this.state.aircraftZe} - ze
    aircraftCg={this.state.aircraftCg}
    aircraftFlaps={this.state.aircraftFlaps}
    aircraftLookdown={this.state.aircraftLookdown}
    aircraftPitch={this.state.aircraftPitch} - pitch angle
    aircraftSpeed={this.state.aircraftSpeed}
    aircraftWeight={this.state.aircraftWeight}
    aircraftUnits={this.state.aircraftUnits}
 */

import React from 'react'
import GroundSegmentRender from '../VGSMath/GroundSegmentRender'

const GroundSegment = (props) => {
        let dh= props.runwayDh
        let glideSlope= props.runwayGlideSlope
        let xa= props.aircraftXa
        let xe= props.aircraftXe
        let za= props.aircraftZa
        let ze= props.aircraftZe
        let pitch= props.aircraftPitch
        let gsx= props.runwayGsx
        let gsy= props.runwayGsy
        let lookdown= props.aircraftLookdown
    
        let xcutoff =  lookdown - pitch
        let zeg = (dh + ze)* Math.cos(pitch)+ xe * Math.sin(pitch)
        let zag = (dh + za)* Math.cos(pitch) + xa * Math.sin(pitch)
        let xanteye = (xa -xe) * Math.cos(glideSlope) + (ze-za) * Math.sin(glideSlope) 
        let obseg = zeg / Math.tan(xcutoff)
        let gndrvr = 1200//Math.sqrt( xrvr^2 - zeg^2)
        let fov = gndrvr - obseg
        let xax = Math.sqrt( (zag/Math.tan(3))^2 - (gsy^2))
        let xrvr = Math.sqrt(((fov + obseg)^2) + (zeg)^2)
        let xthres = xax - gsx
        let xeyethres = xthres + xanteye
        let xahead = xthres - (obseg - xanteye)
        let xbeyond = fov - xahead

        return <GroundSegmentRender 
            xcutoff={xcutoff}
            zeg={zeg}
            zag={zag}
            xanteye={xanteye}
            obseg={obseg}
            gndrvr={gndrvr}
            fov={fov}
            xax={xax}
            xrvr={xrvr}
            xthres={xthres}
            xeyethres={xeyethres}
            xahead={xahead}
            xbeyond={xbeyond} 
        />
}


 export {GroundSegment}

 // this.setState({
        //     xcutoff:  lookdown - pitch,
        //     zeg: (dh + ze)* Math.cos(pitch)+ xe * Math.sin(pitch),
        //     zag: (dh + za)* Math.cos(pitch) + xa * Math.sin(pitch),
        //     xanteye: (xa -xe) * Math.cos(glideSlope) + (ze-za) * Math.sin(glideSlope),
        //     obseg: zeg / Math.tan(xcutoff),
        //     gndrvr: 1200,//Math.sqrt( xrvr^2 - zeg^2)
        //     fov: gndrvr - obseg,
        //     xax: Math.sqrt( (zag/Math.tan(3))^2 - (gsy^2)),
        //     xrvr: Math.sqrt(((fov + obseg)^2) + (zeg)^2),
        //     xthres: xax - gsx,
        //     xeyethres: xthres + xanteye,
        //     xahead: xthres - (obseg - xanteye),
        //     xbeyond: fov - xahead
        //     })