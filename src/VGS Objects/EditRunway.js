import React from "react";
import { Form } from "react-bootstrap";
import ReactDOM from "react-dom";
import firebase from "../Firestore";
import { Formik, Field, ErrorMessage } from "formik";

class EditRunway extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.select = [props.select];
    this.closeEdit = props.closeEdit;
    this.selectName = props.name;
    this.state = {
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
      units: true
    };
    this.componentDidMount = this.componentDidMount.bind(this)
    this.loadCurrentValues = this.loadCurrentValues.bind(this)

  }

  componentDidMount() {
    this._isMounted = true;

    this.loadCurrentValues()
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadCurrentValues = () => {
    const select = this.props.name
    const selString = select[0].toString()

    const airRef = firebase.firestore().collection("Runways").doc(selString)

    airRef.get()
    .then(doc => {
      if (doc.exists) {
        this.setState({
          name: doc.id,
          icao: doc.data().icao,
          approachlights: doc.data().approachlights,
          dh: doc.data().dh,
          edgespacing: doc.data().edgespacing,
          gsx: doc.data().gsx,
          gsy: doc.data().gsy,
          glideslope: doc.data().glideslope,
          tch: doc.data().tch,
          width: doc.data().width,
          units: doc.data().units.toString()
        })
      } else {
        console.log("No such document!")
      }
    }).catch(function (error) {
      console.log("Error getting document: ", error)
    })
  }  

  updateAircraft = values => {
    const select = this.selectName
    const selString = select[0].toString()

    const db = firebase.firestore().collection("Runways");
    //const select = db.doc(selString) old name
    //const select = db.doc(values.acName) form edit name
    //compare old name to form name. If same update, if different 
    console.log("Current aircraft in Form: ", values.runName)
    console.log("Aircraft information from cloud: ", db.id.toString())
    
    if (db.doc(selString).id.toString() === values.acName) {
      db.doc(selString).update({
        ApproachLights: Number(values.approachlights),
        DH: Number(values.dh),
        EdgeSpacing: Number(values.edgespacing),
        GSOffsetX: Number(values.gsx),
        GSOffsetY: Number(values.gsy),
        GlideSlope: Number(values.glideslope),
        ICAO: Number(values.icao),
        TCH: Number(values.tch),
        Units: Boolean(values.units),
        Width: Number(values.width)
      });
    } else {
      db.doc(values.acName).set({
        ApproachLights: Number(values.approachlights),
        DH: Number(values.dh),
        EdgeSpacing: Number(values.edgespacing),
        GSOffsetX: Number(values.gsx),
        GSOffsetY: Number(values.gsy),
        GlideSlope: Number(values.glideslope),
        ICAO: Number(values.icao),
        TCH: Number(values.tch),
        Units: Boolean(values.units),
        Width: Number(values.width)
      })
      db.doc(selString).delete()
    }

    // db.collection("Aircrafts")
    //   .doc(String(select))
      
  };

  handleSubmit = (values, actions) => {
    setTimeout(() => {
      this.updateAircraft(values);
      //setSubmitting(false);
      }, 600);
    if (this._isMounted) {
      this.props.render();
      this.props.toggle();
    }
  }

  render() {
    //Need to find a way to save variable of the selected acName to pass 
    //on submission so the aircraft can be found even if the acName is changed in the edit form.

    //onSubmit is not calling the inside function so I think without the prop in the <Form> component
    //it doesn't seem to be calling to my onSubmit method.

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
                runName: this.state.runName,
                icao: this.state.icao,
                approachlights: this.state.approachlights,
                dh: this.state.dh,
                edgespacing: this.state.edgespacing,
                gsx: this.state.gsx,
                gsy: this.state.gsy,
                glideslope: this.state.glideslope,
                tch: this.state.tch,
                width: this.state.width,
                units: this.state.units
              }}
              // validate={values => {
              //   const errors = {};
              //   if (!values.acName) {
              //     errors.acName = "Required";
              //   } else if (values.acName.length > 15) {
              //     errors.acName = "Must be 15 characters or less";
              //   }

              //   return errors;
              // }}
              onSubmit={this.handleSubmit}
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
                  <Form.Group controlId="editRunwayForm">
                    <Form.Label>Runway Name</Form.Label>
                    <Field
                      value={values.runName}
                      //defaultValue={values.acName}
                      //onChange={this.setState({acName: values.acName})}
                      name="acName"
                      type="text"
                      placeholder={values.runName}
                      className={`form-control ${
                        touched.runName && errors.runName ? "is-invalid" : ""
                      }`}
                    />
                  <br />
                      <Form.Label>Runway ICAO</Form.Label>
                      <Field
                        value={values.icao}
                        id="icao"
                        name="icao"
                        type="text"
                        placeholder="Enter ICAO code"
                        className={`form-control ${
                          touched.icao && errors.icao ? "is-invalid" : ""
                          }`}
                      />
                    <br />
                    <Form.Label>Approach Lights type</Form.Label>
                      <Field
                        as="select"
                        value={values.approachlights}
                        id="approachlights"
                        name="approachlights"
                        type="select"
                      >
                        <option value="Lights1">Lights1</option>
                        <option value="Lights2">Lights2</option>
                      </Field>
                  <br />
                    <Form.Label>Decision Height</Form.Label>
                      <Field
                        value={values.dh}
                        id="dh"
                        name="dh"
                        type="number"
                        placeholder="Enter Decision Height"
                        className={`form-control ${
                          touched.dh && errors.dh ? "is-invalid" : ""
                          }`}
                      />
                  <br />
                    <Form.Label>Edge Light Spacing</Form.Label>
                      <Field
                        value={values.edgespacing}
                        id="edgespacing"
                        name="edgespacing"
                        type="number"
                        placeholder="Enter Edge Light spacing"
                        className={`form-control ${
                          touched.edgespacing && errors.edgespacing ? "is-invalid" : ""
                          }`}
                      />
                  <br />
                    <Form.Label>GS Offset X Value</Form.Label>
                      <Field
                        value={values.gsx}
                        id="gsx"
                        name="gsx"
                        type="number"
                        placeholder="Enter GS Offset X value"
                        className={`form-control ${
                          touched.gsx && errors.gsx ? "is-invalid" : ""
                          }`}
                      />
                  <br />
                    <Form.Label>GS Offset Y Value</Form.Label>
                      <Field
                        value={values.gsy}
                        id="gsy"
                        name="gsy"
                        type="number"
                        placeholder="Enter GS Offset Y value"
                        className={`form-control ${
                          touched.gsy && errors.gsy ? "is-invalid" : ""
                          }`}
                      />
                  <br />
                    <Form.Label>TCH</Form.Label>
                      <Field
                        value={values.tch}
                        id="tch"
                        name="tch"
                        type="number"
                        placeholder="Enter TCH value"
                        className={`form-control ${
                          touched.tch && errors.tch ? "is-invalid" : ""
                          }`}
                      />
                  <br />
                    <Form.Label>Runway Width</Form.Label>
                      <Field
                        value={values.width}
                        id="width"
                        name="width"
                        type="number"
                        placeholder="Enter Runway Width"
                        className={`form-control ${
                          touched.width && errors.width ? "is-invalid" : ""
                          }`}
                      />
                  <br />
                  <label htmlFor="unitsAir">
                    Unit of measurement for values
                  </label>
                  <br />
                      <Field as="select" id="unitsRun" name="unitsRun" type="select" value={values.units}>
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

export default EditRunway;
