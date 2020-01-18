import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'


  AddAirForm = () => {
    const formik = useFormik({
      initialValues: {
        acName: " ",
        ze: " ",
        xe: " ",
        lookdown: " ",
        za: " ",
        xa: " ",
        flaps: " ",
        speed: " ",
        weight: " ",
        cg: " ",
        pitch: " ",
        unit: true,
      },
      validationSchema: Yup.object({
          acName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
      }),
      onSubmit: values => {
        this.addAircraft();
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
        <label htmlFor="aircraft">Aircraft Name</label>
        <input
          id="acName"
          name="acName"
          type="text"
          placeholder="ex. A320"
          onChange={Formik.handleChange}
          value={Formik.values.acName}
        />
        <br />
        <input
          type="number"
          name="ze"
          placeholder="Aircrat's Ze value"
          onChange={this.updateInfo}
          value={ze}
        />
        <br />
        <input
          type="number"
          name="xe"
          placeholder="Aircraft's Xe value"
          onChange={this.updateInfo}
          value={xe}
        />
        <br />
        <input
          type="number"
          name="lookdown"
          placeholder="Aircraft's lookdown value"
          onChange={this.updateInfo}
          value={lookdown}
        />
        <br />
        <input
          type="number"
          name="za"
          placeholder="Aircraft's Za value"
          onChange={this.updateInfo}
          value={za}
        />
        <br />
        <input
          type="number"
          name="xa"
          placeholder="Aircraft's Xa value"
          onChange={this.updateInfo}
          value={xa}
        />
        <br />
        <input
          type="number"
          name="flaps"
          placeholder="Aircraft's flaps value"
          onChange={this.updateInfo}
          value={flaps}
        />
        <br />
        <input
          type="number"
          name="speed"
          placeholder="Aircraft's speed value"
          onChange={this.updateInfo}
          value={speed}
        />
        <br />
        <input
          type="number"
          name="weight"
          placeholder="Aircraft's weight value"
          onChange={this.updateInfo}
          value={weight}
        />
        <br />
        <input
          type="number"
          name="cg"
          placeholder="Aircraft's cg value"
          onChange={this.updateInfo}
          value={cg}
        />
        <br />
        <input
          type="number"
          name="pitch"
          placeholder="Aircraft's pitch value"
          onChange={this.updateInfo}
          value={pitch}
        />
        <br />
        <input
          type="checkbox"
          name="unit"
          value="Metric"
          onChange={this.updateInfo}
          value={unit}
        />{" "}
        These values are in metric.
        <br />
        <input type="submit" value="submit" />
      </Form>
    )
  };

