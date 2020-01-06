import React from "react";
import { Form } from 'react-bootstrap'
import ReactDOM from "react-dom";
import firebase from "../Firestore";
import { Formik, Field, ErrorMessage } from'formik'

class Aircraft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ACName: " ",
      Ze: " ",
      Xe: " ",
      Lookdown: " ",
      Za: " ",
      Xa: " ",
      Flaps: " ",
      Speed: " ",
      Weight: " ",
      CG: " ",
      Pitch: " ",
      Units: false
    };
  }

  /*updateInfo = event => {
    this.setState({
      [event.target.acName]: event.target.value
      Ze: 0.0,
                Xe: 0.0,
                Lookdown: 0.0,
                Za: 0.0,
                Xa: 0.0,
                Flaps: 0,
                Speed: 0,
                Weight: 0.0,
                CG: 0.0,
                Pitch: 0.0,
                Units: true 
    });
  }; */

  addAircraft = (values) => {

    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    console.log(values)
    db.collection("Aircrafts")
      .doc(String(values.acName))
      .set({
        ACName: String(values.acName),
        Ze: Number(values.ze),
        Xe: Number(values.xe),
        Lookdown: Number(values.lookdown),
        Za: Number(values.za),
        Xa: Number(values.xa),
        Flaps: Number(values.flaps),
        Speed: Number(values.speed),
        Weight: Number(values.weight),
        CG: Number(values.cg),
        Pitch: Number(values.pitch),
        Units: Boolean(values.unit)
      });
    // After submission values are cleared
    /*this.setState({
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
      units: true
    });*/
  };

 /* AddAirForm = () => {
    
    const formik = useFormik({
      
      onSubmit: values => {
        this.addAircraft();
      }
    })
  } */

  

  render() {
    return (
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Add Aircraft</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Formik
              initialValues={{
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
                pitch: " "
              }}
              validate={values => {
                const errors = {};
                if (!values.acName) {
                  errors.acName = "Required";
                } else if (values.acName.length > 15) {
                  errors.acName = "Must be 15 characters or less";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                alert("stuff happened: " + values);
                this.addAircraft(values);
                setSubmitting(false);
              }}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <label htmlFor="aircraft">Aircraft Name</label>
                  <Field
                    id="acName"
                    name="acName"
                    type="text"
                    placeholder="ex. A320"
                    className={`form-control ${
                      touched.acName && errors.acName ? "is-invalid" : ""
                    }`}
                  />
                  <br />
                  <Field
                    id="ze"
                    name="ze"
                    type="number"
                    placeholder="Enter Ze value"
                    className={`form-control ${
                      touched.ze && errors.ze ? "is-invalid" : ""
                    }`}
                  />
                  <br />
                  <Field
                    id="xe"
                    name="xe"
                    type="number"
                    placeholder="Enter Xe value"
                    className={`form-control ${
                      touched.xe && errors.xe ? "is-invalid" : ""
                    }`}
                  />
                  <br />
                  <Field
                    id="lookdown"
                    name="lookdown"
                    type="number"
                    placeholder="Enter lookdown value"
                    className={`form-control ${
                      touched.lookdown && errors.Lookdown ? "is-invalid" : ""
                    }`}
                  />
                  <br />
                  <Field
                    id="za"
                    name="za"
                    type="number"
                    placeholder="Enter Za value"
                    className={`form-control ${
                      touched.za && errors.za ? "is-invalid" : ""
                    }`}
                  />
                  <br />
                  <Field
                    id="xa"
                    name="xa"
                    type="number"
                    placeholder="Enter Xa value"
                    className={`form-control ${
                      touched.xa && errors.xa ? "is-invalid" : ""
                    }`}
                  />
                  <br />
                  <Field
                    id="flaps"
                    name="flaps"
                    type="number"
                    placeholder="Enter Flaps setting"
                    className={`form-control ${
                      touched.flaps && errors.flaps ? "is-invalid" : ""
                    }`}
                  />
                  <br />
                  <Field
                    id="speed"
                    name="speed"
                    type="number"
                    placeholder="Enter Aircraft's speed"
                    className={`form-control ${
                      touched.speed && errors.speed ? "is-invalid" : ""
                    }`}
                  />
                  <br />
                  <Field
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="Enter Aircraft's weight"
                    className={`form-control ${
                      touched.weight && errors.weight ? "is-invalid" : ""
                    }`}
                  />
                  <br />
                  <Field
                    id="cg"
                    name="cg"
                    type="number"
                    placeholder="Enter Aircraft's CG"
                    className={`form-control ${
                      touched.cg && errors.cg ? "is-invalid" : ""
                    }`}
                  />
                  <br />
                  <Field
                    id="pitch"
                    name="pitch"
                    type="number"
                    placeholder="Enter Aircraft's pitch angle"
                    className={`form-control ${
                      touched.pitch && errors.pitch ? "is-invalid" : ""
                    }`}
                  />
                  <br />
                  <label htmlFor="unit">Unit of measurement for values</label>
                  <br />
                  <Field as="select" id="unit" name="unit" type="select">
                    <option value="metric">Metric</option>
                    <option value="imperial">Imperial</option>
                  </Field>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Submit"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default Aircraft;
