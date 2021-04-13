import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

AddAirForm = () => {
	const formik = useFormik({
		initialValues: {
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
			unit: true,
		},
		validationSchema: Yup.object({
			runName: Yup.string()
				.max(15, "Must be 15 characters or less")
				.required("Required"),
		}),
		onSubmit: (values) => {
			this.addRunway();
		},
	});
	return (
		/*<div>
                <h1 id='title'>Aircraft Dynamic Table</h1>
                <table id='aircrafts'>
                    <tbody>
                        <tr>{this.renderAircraftTableHeader()}</tr>
                        {this.renderAircraftTable()}
                    </tbody>
                </table>
            </div>*/
		<Form onSubmit={Formik.handleSubmit}>
			<label htmlFor='aircraft'>Aircraft Name</label>
			<input
				id='acName'
				name='acName'
				type='text'
				placeholder='ex. A320'
				onChange={this.updateInfo}
				value={runName}
			/>
			<br />
			<input
				type='number'
				name='ze'
				placeholder="Aircrat's Ze value"
				onChange={this.updateInfo}
				value={icao}
			/>
			<br />
			<select
				type='dropdown'
				name='approachlights'
				placeholder="Runway's approach lighting system"
				onChange={this.updateInfo}
				value={approachlights}
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
			</select>
			<br />
			<input
				type='number'
				name='dh'
				placeholder="Runway's dh value"
				onChange={this.updateInfo}
				value={dh}
			/>
			<br />
			<input
				type='number'
				name='edgespacing'
				placeholder="Runway's Za value"
				onChange={this.updateInfo}
				value={edgespacing}
			/>
			<br />
			<input
				type='number'
				name='gsx'
				placeholder="Runway's Xa value"
				onChange={this.updateInfo}
				value={gsx}
			/>
			<br />
			<input
				type='number'
				name='gsy'
				placeholder="Runway's gsy value"
				onChange={this.updateInfo}
				value={gsy}
			/>
			<br />
			<input
				type='number'
				name='glideslope'
				placeholder="Aircraft's glideslope value"
				onChange={this.updateInfo}
				value={glideslope}
			/>
			<br />
			<input
				type='number'
				name='tch'
				placeholder="Runway's tch value"
				onChange={this.updateInfo}
				value={tch}
			/>
			<br />
			<input
				type='number'
				name='width'
				placeholder="Runway's width value"
				onChange={this.updateInfo}
				value={width}
			/>
			<br />
			<input
				type='number'
				name='pitch'
				placeholder="Runway's pitch value"
				onChange={this.updateInfo}
				value={pitch}
			/>
			<br />
			<input
				type='checkbox'
				name='unit'
				value='Metric'
				onChange={this.updateInfo}
				value={unit}
			/>{" "}
			These values are in metric.
			<br />
			<input type='submit' value='submit' />
		</Form>
	);
};
