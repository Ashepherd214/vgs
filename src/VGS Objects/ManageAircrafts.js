import React, { Component } from "react";
// import ReactDOM from "react-dom";
import firebase from "../Firestore";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import BuildAircraftTable from "./BuildAircraftTable";
import AddAircraft from "./AddAircraft";
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
             aircrafts: [],
            //  name: " ",
            //  ze: " ",
            //  xe: " ",
            //  lookdown: " ",
            //  za: " ",
            //  xa: " ",
            //  flaps: " ",
            //  speed: " ",
            //  weight: " ",
            //  cg: " ",
            //  pitch: " ",
            //  units: null,
             show: false

             // viewAddForm: false
           };
           this.db = firebase.firestore().collection("Aircrafts")
           // this.addForm = null
         }

         componentDidMount = () => {
           this.db.onSnapshot(this.gotData, this.errData)
         };

         componentDidUpdate (prevProps, prevState) {
           if(prevState !== this.state.name) {
             this.gotData()
           }
         }

        //  handleUpdate = () => {
        //    const db = firebase.firestore().collection("Aircrafts");

        //    let aircraft = db.get().then(querySnapshot)
        //    this.setState({
        //      name: aircraft.name,
        //      xa: doc.data().Xa,
        //      xe: doc.data().Xe,
        //      za: doc.data().Za,
        //      ze: doc.data().Ze,
        //      cg: doc.data().cg,
        //      flaps: doc.data().flaps,
        //      lookdown: doc.data().lookdown,
        //      pitch: doc.data().pitch,
        //      speed: doc.data().speed,
        //      weight: doc.data().weight,
        //      unitsAir: doc.data().unitsAir
        //    });
        //  }

         gotData = () => {
           let aircraft =[]
          //  console.log(data)
          //  console.log(data.data())
          //  const planedata = data.doc.data();
          //  const keys = Object.keys(planedata)

            const db = firebase.firestore().collection("Aircrafts");

            db.get()
              .then(querySnapshot => {
                //const aircraft = [];

                querySnapshot.forEach(function(doc) {
                  aircraft.push({
                    name: doc.id,
                    xa: doc.data().Xa,
                    xe: doc.data().Xe,
                    za: doc.data().Za,
                    ze: doc.data().Ze,
                    cg: doc.data().cg,
                    flaps: doc.data().flaps,
                    lookdown: doc.data().lookdown,
                    pitch: doc.data().pitch,
                    speed: doc.data().speed,
                    weight: doc.data().weight,
                    unitsAir: doc.data().unitsAir
                  });
                });

                this.setState({ aircraft });
              })
              .catch(function(error) {
                console.log("Error getting documents: ", error);
              });
          }

        //    for (let i = 0; i < keys.length; i++) {
        //      const k = keys[i];
        //      newPlanes.push({
        //        name: planedata[k].name,
        //        ze: planedata[k].ze,
        //        xe: planedata[k].xe,
        //        lookdown: planedata[k].lookdown,
        //        za: planedata[k].za,
        //        xa: planedata[k].xa,
        //        flaps: planedata[k].flaps,
        //        speed: planedata[k].speed,
        //        weight: planedata[k].weight,
        //        cg: planedata[k].cg,
        //        pitch: planedata[k].pitch,
        //        unitsAir: null
        //      });
        //    }
        //    this.setState({aircrafts: newPlanes})
        //  }

        //  errData = (err) => {
        //    console.log(err)
        //  }

         handleClick = (rowKey) => {
           alert(this.db.table.getPageByRowKey(rowKey))
         }

         showModal = () => {
           this.setState({
             show: !this.state.show
           });
           console.log(this.state.show);
         };

         closeModal = () => {
           this.setState({
             show: !this.state.show
           })
           this.handleUpdate()
         }

              // <Table bordered hover responsive striped>
              //    <thead>
              //      <tr>
              //        <th>NAME</th>
              //        <th>XA</th>
              //        <th>XE</th>
              //        <th>ZA</th>
              //        <th>ZE</th>
              //        <th>CG</th>
              //        <th>FLAPS</th>
              //        <th>LOOKDOWN</th>
              //        <th>PITCH</th>
              //        <th>SPEED</th>
              //        <th>WEIGHTS</th>
              //        <th>METRIC?</th>
              //      </tr>
              //    </thead>
              //    <BuildAircraftTable />
              //  </Table>

         render() {
           let { show } = this.state;
           return (
             <div>
               <BootstrapTable
                 ref="table"
                 data={ this.state.aircrafts }
                 pagination={false}
                 search={true}
               >
                 <TableHeaderColumn
                   dataField="name"
                   isKey={true}
                   dataSort={true}
                 >
                   Aircraft Name
                 </TableHeaderColumn>
                 <TableHeaderColumn 
                    dataField="xa" 
                    dataSort={true}
                  >
                   Aircraft Xa Value
                 </TableHeaderColumn>
                 <TableHeaderColumn   
                    dataField="xe" 
                    dataSort={true}
                  >
                   Aircraft Xe Value
                 </TableHeaderColumn>
                 <TableHeaderColumn 
                    dataField="za" 
                    dataSort={true}
                  >
                   Aircraft Za Value
                 </TableHeaderColumn>
                 <TableHeaderColumn 
                    dataField="ze" 
                    dataSort={true}
                  >
                   Aircraft Ze Value
                 </TableHeaderColumn>
                 <TableHeaderColumn 
                    dataField="cg" 
                    dataSort={true}
                  >
                   Aircraft's CG
                 </TableHeaderColumn>
                 <TableHeaderColumn
                   dataField="flaps"
                   dataSort={true}
                  >
                   Aircraft Flaps Setting
                 </TableHeaderColumn>
                 <TableHeaderColumn
                   dataField="lookdown"
                   dataSort={true}
                  >
                   Aircraft Lookdown Value
                 </TableHeaderColumn>
                 <TableHeaderColumn
                   dataField="pitch"
                   dataSort={true}
                  >
                   Aircraft Pitch
                 </TableHeaderColumn>
                 <TableHeaderColumn
                   dataField="speed"
                   dataSort={true}
                  >
                   Aircraft Speed
                 </TableHeaderColumn>
                 <TableHeaderColumn
                   dataField="weight"
                   dataSort={true}
                  >
                   Aircraft Weight
                 </TableHeaderColumn>
                 <TableHeaderColumn
                   dataField="unitAir"
                   dataSort={true}
                  >
                   Metric?
                 </TableHeaderColumn>
               </BootstrapTable>
               
               <ButtonToolbar>
                 <Button variant="primary" size="lg" onClick={this.showModal}>
                   Add Aircraft
                 </Button>
               </ButtonToolbar>

               <Modal id="addAirModal" show={show} onHide={this.showModal}>
                 <Modal.Header closeButton>
                   <Modal.Title>Aircraft Editor</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                   <AddAircraft id="airForm" />
                 </Modal.Body>
                 <Modal.Footer>
                   <Button variant="danger" onClick={this.showModal}>
                     Close
                   </Button>
                 </Modal.Footer>
               </Modal>
             </div>
           );
         }
       }
export default ManageAircrafts;
