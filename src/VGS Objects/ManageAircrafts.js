import React from 'react'
import ReactDOM from 'react-dom'
import firebase from '../Firestore'
import ReactDataGrid from 'react-data-grid'
import { Table, Container } from 'reactstrap'

class Aircraft extends React.Component {
 constructor(props) {
     super(props);
     this.ref = firebase.firestore().collection('Aircrafts');

     this.state = {
         Aircrafts:[]
     };
 }

 readAircraft = event => {
  event.preventDefault();

  const db = firebase.firestore();

  db.collection("Aircrafts").get()
  .then(function(querySnapshot) {
   querySnapshot.forEach(function(doc){
    console.log(doc.id, " => ", doc.data())
   });
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

  const columns = [
   { key: 'acname', name: "Name"},
   { key: 'xa', name: "Xa"},
   { key: 'xe', name: "Xe"},
   { key: 'za', name: "Za"},
   { key: 'ze', name: "Ze"},
   { key: 'cg', name: "CG"},
   { key: 'flaps', name: "Flaps"},
   { key: 'lookdown', name: "Lookdown"},
   { key: 'pitch', name: "Pitch"},
   { key: 'speed', name: "Speed"},
   { key: 'weight', name: "Weight"},
   { key: 'unitsair', name: "Metric"},
  ];

  return(
   <ReactDataGrid
    columns={columns}
    rowGetter={rowGetter}
    rowsCount={rows.length}
    minHeight={500}
   />
   /*<Container>
     <Table dark>
       <thead>
         <tr>
           <th>Name</th>
           <th>Xa</th>
           <th>Xe</th>
           <th>Za</th>
           <th>Ze</th>
           <th>cg</th>
           <th>flaps</th>
           <th>lookdown</th>
           <th>pitch</th>
           <th>speed</th>
           <th>unitsAir</th>
           <th>weight</th>
         </tr>
       </thead>
     </Table>
   </Container> */
  )
 }
}
