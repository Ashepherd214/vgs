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
       units: null
     };
 }


 buildAircraftTable() {
  const db = firebase.firestore().collection("Aircrafts");

  db.get().then(function(querySnapshot) {
   querySnapshot.forEach(function(doc){
    let data = doc.data()
    console.log("Document data: ", data)
    console.log(doc.id, " => ", doc.data())
    console.log(doc.get("weight"))
    return (
      <tr key={doc.id}>
        <th>{doc.id}</th>
        <th>{doc.get("Xa").toString()}</th>
        <td>{doc.get("Xe")}</td>
        <td>{doc.get("Za")}</td>
        <td>{doc.get("Ze")}</td>
        <td>{doc.get("cg")}</td>
        <td>{doc.get("flaps")}</td>
        <td>{doc.get("lookdown")}</td>
        <td>{doc.get("pitch")}</td>
        <td>{doc.get("speed")}</td>
        <td>{doc.get("weight")}</td>
        <td>{doc.get("unitsAir")}</td>
      </tr>
    )
   })
  })
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
 }

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
        <tbody>
            <BuildAircraftTable />
        </tbody>
      </Table>
    </div>
  )
 }
}

export default ManageAircrafts
