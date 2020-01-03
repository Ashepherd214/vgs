import React from 'react'
import ReactDOM from 'react-dom'
import firebase from '../Firestore'
import BuildAircraftTable from './BuildAircraftTable'
import { Table, Container } from 'react-bootstrap'

class ManageAircrafts extends React.Component {
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
       //viewAddForm: false
     };

     //this.addForm = null
 }

 addEvent = event => {
   //Logic: pop up form to be filled out and used to add new aircraft into table
 }

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
   let aircraftTable = []
  return(
    <div>
      <Table striped bordered hover responsive>
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
        <Button variant="primary" size="lg" onClick={this.addEvent}>Add Aircraft</Button>
      </ButtonToolbar>
    </div>
  )
 }
}

export default ManageAircrafts
