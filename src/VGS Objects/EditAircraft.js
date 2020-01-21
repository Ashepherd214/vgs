import React from "react";
import { Form } from "react-bootstrap";
import ReactDOM from "react-dom";
import firebase from "../Firestore";
import { Formik, Field, ErrorMessage } from "formik";
import ManageAircrafts from "./ManageAircrafts";

class EditAircraft extends React.Component {

  constructor(props) {
    super(props);

    this.select = [props.select];
    this.state = {
      name: " ",
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
      units: false,
    };
    this.componentDidMount = this.componentDidMount.bind(this)
    this.loadCurrentValues = this.loadCurrentValues.bind(this)
  }

  async componentDidMount() {
    
    this.loadCurrentValues();
  }

  loadCurrentValues = () => {
    const select = this.props.name
    const selString = select[0].toString()
    console.log("Current bind: ", this.state.name)

    const airRef = firebase.firestore().collection("Aircrafts").doc(selString)

    airRef.get()
    .then(doc => {
      if (doc.exists) {
        console.log("state of values: ", this.state.name)
        this.setState({
          name: doc.id,
          ze: doc.data().Ze,
          xe: doc.data().Xe,
          lookdown: doc.data().lookdown,
          za: doc.data().Za,
          xa: doc.data().Xa,
          flaps: doc.data().flaps,
          speed: doc.data().speed,
          weight: doc.data().weight,
          cg: doc.data().cg,
          pitch: doc.data().pitch, 
          units: doc.data().unitsAir
        })
        console.log("Document Data Set: ", this.name )
      } else {
        console.log("No such document!")
      }
    }).catch(function (error) {
      console.log("Error getting document: ", error)
    })
  }  

  updateAircraft = values => {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    console.log(values);
    db.collection("Aircrafts")
      .doc(String(values.acName))
      .set({
        Ze: Number(values.ze),
        Xe: Number(values.xe),
        lookdown: Number(values.lookdown),
        Za: Number(values.za),
        Xa: Number(values.xa),
        flaps: Number(values.flaps),
        speed: Number(values.speed),
        weight: Number(values.weight),
        cg: Number(values.cg),
        pitch: Number(values.pitch),
        unitsAir: Boolean(values.unitsAir)
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Edit Aircraft</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">       
            <Formik
            enableReinitialize = {true}
              initialValues={{
                acName: this.state.name,
                ze: this.state.ze,
                xe: this.state.xe,
                lookdown: this.state.lookdown,
                za: this.state.za,
                xa: this.state.xa,
                flaps: this.state.flaps,
                speed: this.state.speed,
                weight: this.state.weight,
                cg: this.state.cg,
                pitch: this.state.pitch,
                unitsAir: this.state.units
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
                setTimeout(() => {
                  this.updateAircraft(values);
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({
                touched,
                errors,
                isSubmitting,
                handleSubmit,
                handleChange,
                values
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="editForm">
                    <Form.Label>Aircraft Name</Form.Label>
                    <Form.Control
                      value={values.acName}
                      //id="acName"
                      name="acName"
                      type="text"
                      //placeholder={aircraft.name}
                      className={`form-control ${
                        touched.acName && errors.acName ? "is-invalid" : ""
                      }`}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group controlId="editForm">
                    <Form.Label>Aircraft Ze</Form.Label>
                    <Field
                      value={values.ze}
                      id="ze"
                      name="ze"
                      type="number"
                      //placeholder="Enter Ze value"
                      className={`form-control ${
                        touched.ze && errors.ze ? "is-invalid" : ""
                      }`}
                    />
                    </Form.Group>
                  <br />
                  <Form.Group controlId="editForm">
                    <Form.Label>Aircraft Xe</Form.Label>
                    <Field
                      value={values.xe}
                      id="xe"
                      name="xe"
                      type="number"
                      //placeholder="Enter Xe value"
                      className={`form-control ${
                        touched.xe && errors.xe ? "is-invalid" : ""
                      }`}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group controlId="editForm">
                    <Form.Label>Aircraft Lookdown Value</Form.Label>
                    <Field
                      value={values.lookdown}
                      id="lookdown"
                      name="lookdown"
                      type="number"
                      //placeholder="Enter lookdown value"
                      className={`form-control ${
                        touched.lookdown && errors.Lookdown ? "is-invalid" : ""
                      }`}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group controlId="editForm">
                    <Form.Label>Aircraft Za</Form.Label>
                    <Field
                      value={values.za}
                      id="za"
                      name="za"
                      type="number"
                      //placeholder="Enter Za value"
                      className={`form-control ${
                        touched.za && errors.za ? "is-invalid" : ""
                      }`}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group controlId="editForm">
                    <Form.Label>Aircraft Xa</Form.Label>
                    <Field
                      value={values.xa}
                      id="xa"
                      name="xa"
                      type="number"
                      //placeholder="Enter Xa value"
                      className={`form-control ${
                        touched.xa && errors.xa ? "is-invalid" : ""
                      }`}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group controlId="editForm">
                    <Form.Label>Aircraft Flaps</Form.Label>
                    <Field
                      value={values.flaps}
                      id="flaps"
                      name="flaps"
                      type="number"
                      //placeholder="Enter Flaps setting"
                      className={`form-control ${
                        touched.flaps && errors.flaps ? "is-invalid" : ""
                      }`}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group controlId="editForm">
                    <Form.Label>Aircraft Speed</Form.Label>
                    <Field
                      value={values.speed}
                      id="speed"
                      name="speed"
                      type="number"
                      //placeholder="Enter Aircraft's speed"
                      className={`form-control ${
                        touched.speed && errors.speed ? "is-invalid" : ""
                      }`}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group controlId="editForm">
                    <Form.Label>Aircraft Weight</Form.Label>
                    <Field
                      value={values.weight}
                      id="weight"
                      name="weight"
                      type="number"
                      //placeholder="Enter Aircraft's weight"
                      className={`form-control ${
                        touched.weight && errors.weight ? "is-invalid" : ""
                      }`}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group controlId="editForm">
                    <Form.Label>Aircraft CG</Form.Label>
                    <Field
                      value={values.cg}
                      id="cg"
                      name="cg"
                      type="number"
                      //placeholder="Enter Aircraft's CG"
                      className={`form-control ${
                        touched.cg && errors.cg ? "is-invalid" : ""
                      }`}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group controlId="editForm">
                    <Form.Label>Aircraft Pitch</Form.Label>
                    <Field
                      value={values.pitch}
                      id="pitch"
                      name="pitch"
                      type="number"
                      //placeholder="Enter Aircraft's pitch angle"
                      className={`form-control ${
                        touched.pitch && errors.pitch ? "is-invalid" : ""
                      }`}
                    />
                  </Form.Group>
                  <br />
                  <label htmlFor="unitsAir">
                    Unit of measurement for values
                  </label>
                  <br />
                  <Field
                    as="select"
                    id="unitsAir"
                    name="unitsAir"
                    type="select"
                    value={values.units}
                  >
                    <option value="true">Metric</option>
                    <option value="false">Imperial</option>
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

export default EditAircraft;
