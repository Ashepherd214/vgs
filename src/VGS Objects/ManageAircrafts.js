import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import firebase from "../Firestore";
import BuildAircraftTable from "./BuildAircraftTable";
import Aircraft from "./Aircraft";
import {
  Table,
  Container,
  Button,
  ButtonToolbar,
  Modal
} from "react-bootstrap";

export class ManageAircrafts extends Component {
  constructor(props) {
    super(props);
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
      units: null,
      show: false

      // viewAddForm: false
    };

    // this.addForm = null
  }

  componentDidMount = () => {
    console.log("Here");
  };

  addEvent = event => {
    // Logic: pop up form to be filled out and used to add new aircraft into table
  };

  showModal = () => {
    this.setState({
      show: !this.state.show
    });
    console.log(this.state.show);
  };

  /*.catch(function(error) {
  console.log("Error getting documents: ", error)
 });*/

  /*db.collection("Aircrafts").doc(String(this.state.acName)).set({
     ACName: String(this.state.acName),
     Ze: Number(this.state.ze),
     Xe: Number(this.state.xe),
     Lookdown: Number(this.state.lookdown),
     Za: Number(this.state.za),
     Xa: Number(this.state.xa),
     Flaps: Number(this.state.flaps),
     Speed: Number(this.state.speed),
     Weight: Number(this.state.weight),
     CG: Number(this.state.cg),
     Pitch: Number(this.state.pitch),
     Units: Boolean(this.state.unit)
 })
 // After submission values are cleared
 this.setState({
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
 })
 */

  render() {
    let aircraftTable = [];
    let { show } = this.state;
    return (
      <div>
        <Table bordered hover responsive striped>
          <thead>
            <tr>
              <th>NAME</th>
              <th>XA</th>
              <th>XE</th>
              <th>ZA</th>
              <th>ZE</th>
              <th>CG</th>
              <th>FLAPS</th>
              <th>LOOKDOWN</th>
              <th>PITCH</th>
              <th>SPEED</th>
              <th>WEIGHTS</th>
              <th>METRIC?</th>
            </tr>
          </thead>
          <BuildAircraftTable />
        </Table>
        <ButtonToolbar>
          <Button variant="primary" size="lg" onClick={this.showModal}>
            Add Aircraft
          </Button>
        </ButtonToolbar>

        <Modal show={show} onHide={this.showModal}>
          <Modal.Header closeButton>
            <Modal.Title>Aircraft Editor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Aircraft />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
export default ManageAircrafts;
