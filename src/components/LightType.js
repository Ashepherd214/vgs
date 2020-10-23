import React from 'react'
import {
  MALSR,
  MALSF, 
  SSALR,
  SSALF,
  ALSF1,
  ALSF2
} from '../components/RunwayLights'

function LightType(props) {
        console.log(props)
        console.log("Light Type prop detected: " + props.approachlights)
        //Should accept props coming from Runways table to determine which lights to show on the outputs tab.
        //Based on incoming props, should call out to RunwayLights.js and render the respective component
        switch(props.approachlights) {
        case "MALSR":
            return <MALSR />
        case "MALSF":
            return <MALSF />
        case "SSALR":
            return <SSALR />
        case "SSALF":
            return <SSALF />
        case "ALSF1":
            return <ALSF1 />
        case "ALSF2":
            return <ALSF2 />
        }
}

export {LightType}