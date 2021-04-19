import React from "react";
import { Form } from "react-bootstrap";
import ReactDOM from "react-dom";
import firestore from "../../Firestore";
import { Formik, Field, ErrorMessage } from "formik";

class AddRunway extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			RunName: " ",
			ICAO: " ",
			ALights: " ",
			DH: " ",
			ESpacing: " ",
			GSX: " ",
			GSY: " ",
			GlideSlope: " ",
			TCH: " ",
			Width: " ",
			Units: false,
		};
	}

	addRunway = (values) => {
		const db = firestore;
		console.log(values);
		db.collection("Runways")
			.doc(String(values.runName))
			.set({
				ApproachLights: String(values.approachlights),
				DH: Number(values.dh),
				EdgeSpacing: Number(values.edgespacing),
				GSOffsetX: Number(values.gsx),
				GSOffsetY: Number(values.gsy),
				GlideSlope: Number(values.glideslope),
				ICAO: String(values.icao),
				TCH: Number(values.tch),
				Units: Boolean(values.units),
				Width: Number(values.width),
			});
	};

	handleSubmit = (values, { setSubmitting, resetForm }) => {
		setTimeout(() => {
			this.addRunway(values);
			setSubmitting(false);
		}, 400);
		this.props.toggle();
	};

	render() {
		return (
			<div className='container'>
				<div className='row mb-5'>
					<div className='col-lg-12 text-center'>
						<h1 className='mt-5'>Add Runway</h1>
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-12'>
						<Formik
							initialValues={{
								runName: " ",
								icao: " ",
								approachlights: " ",
								dh: " ",
								edgespacing: " ",
								gsx: " ",
								gsy: " ",
								glideslope: " ",
								tch: " ",
								width: " ",
								units: true,
							}}
							validate={(values) => {
								const errors = {};
								if (!values.runName) {
									errors.runName = "Required";
								} else if (values.runName.length > 50) {
									errors.runName = "Must be 50 characters or less";
								}

								return errors;
							}}
							onSubmit={this.handleSubmit}
						>
							{({
								touched,
								errors,
								isSubmitting,
								handleSubmit,
								handleChange,
								values,
							}) => (
								<Form onSubmit={handleSubmit}>
									<Form.Group controlId='editRunwayForm'>
										<Form.Label>Runway Name</Form.Label>
										<Field
											value={values.runName}
											//defaultValue={values.acName}
											//onChange={this.setState({acName: values.acName})}
											name='runName'
											type='text'
											placeholder='Enter the Runway Name'
											className={`form-control ${
												touched.runName && errors.runName ? "is-invalid" : ""
											}`}
										/>
										<br />
										<Form.Label>Runway ICAO</Form.Label>
										<Field
											value={values.icao}
											id='icao'
											name='icao'
											type='text'
											placeholder='Enter ICAO code'
											className={`form-control ${
												touched.icao && errors.icao ? "is-invalid" : ""
											}`}
										/>
										<br />
										<Form.Label>Approach Lights type</Form.Label>
										<Field
											as='select'
											value={values.approachlights}
											id='approachlights'
											name='approachlights'
											type='select'
										>
											<option value='' label='Select a lighting system' />
											<option value='ODALS' label='ODALS' />
											<option value='MALSR' label='MALSR' />
											<option value='MALSF' label='MALSF' />
											<option value='SSALR' label='SSALR' />
											<option value='SSALF' label='SSALF' />
											<option value='ALSF1' label='ALSF1' />
											<option value='ALSF2' label='ALSF2' />
											<option value='CALVERT' label='CALVERT' />
											<option value='CALVERT2' label='CALVERT2' />
											<option value='RAIL' label='RAIL' />
										</Field>
										<br />
										<Form.Label>Decision Height</Form.Label>
										<Field
											value={values.dh}
											id='dh'
											name='dh'
											type='number'
											placeholder='Enter Decision Height'
											className={`form-control ${
												touched.dh && errors.dh ? "is-invalid" : ""
											}`}
										/>
										<br />
										<Form.Label>Edge Light Spacing</Form.Label>
										<Field
											value={values.edgespacing}
											id='edgespacing'
											name='edgespacing'
											type='number'
											placeholder='Enter Edge Light spacing'
											className={`form-control ${
												touched.edgespacing && errors.edgespacing
													? "is-invalid"
													: ""
											}`}
										/>
										<br />
										<Form.Label>GS Offset X Value</Form.Label>
										<Field
											value={values.gsx}
											id='gsx'
											name='gsx'
											type='number'
											placeholder='Enter GS Offset X value'
											className={`form-control ${
												touched.gsx && errors.gsx ? "is-invalid" : ""
											}`}
										/>
										<br />
										<Form.Label>GS Offset Y Value</Form.Label>
										<Field
											value={values.gsy}
											id='gsy'
											name='gsy'
											type='number'
											placeholder='Enter GS Offset Y value'
											className={`form-control ${
												touched.gsy && errors.gsy ? "is-invalid" : ""
											}`}
										/>
										<br />
										<Form.Label>TCH</Form.Label>
										<Field
											value={values.tch}
											id='tch'
											name='tch'
											type='number'
											placeholder='Enter TCH value'
											className={`form-control ${
												touched.tch && errors.tch ? "is-invalid" : ""
											}`}
										/>
										<br />
										<Form.Label>Runway Width</Form.Label>
										<Field
											value={values.width}
											id='width'
											name='width'
											type='number'
											placeholder='Enter Runway Width'
											className={`form-control ${
												touched.width && errors.width ? "is-invalid" : ""
											}`}
										/>
										<br />
										<label htmlFor='unitsAir'>
											Unit of measurement for values
										</label>
										<br />
										<Field
											as='select'
											id='unitsRun'
											name='unitsRun'
											type='select'
											value={values.units}
										>
											<option value='true'>Metric</option>
											<option value='false'>Imperial</option>
										</Field>
										<br />
										<button
											type='submit'
											className='btn btn-primary btn-block'
											disabled={isSubmitting}
										>
											{isSubmitting ? "Please wait..." : "Submit"}
										</button>
									</Form.Group>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		);
	}
}

export default AddRunway;
