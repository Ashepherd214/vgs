import React, { Component } from 'react'
import {
	Group,
	Line
} from 'react-konva'

class GroundSegmentRender extends Component {
	constructor(props) {
		super(props)

		this.state={
			Xcutoff: this.props.xcutoff,
			Zeg: this.props.zeg,
			Zag: this.props.zag,
			Xanteye: this.props.xanteye,
			Obseg: this.props.obseg,
			Gndrvr: this.props.gndrvr,
			FOV: this.props.fov,
			Xax: this.props.xax,
			Xrvr: this.props.xrvr,
			Xthres: this.props.xthres,
			Xeyethres: this.props.xeyethres,
			Xahead: this.props.xahead,
			Xbeyond: this.props.xbeyond
		}
		
	}
	render() {
		console.log("XCutoff in the GS Render Component is: " + this.state.Xcutoff)
		return(
			<Group>
				<Line
					x={20}
					y={200}
					points={[0, 0, 100]}
					closed
					stroke="yellow"
				/>
				<Line />
			</Group>
		)
	}
}

export default GroundSegmentRender