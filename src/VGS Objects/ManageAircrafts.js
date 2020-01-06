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

         componentDidUpdate (prevProps, prevState) {
           if(prevState !== this.state.name) {
             this.handleUpdate()
           }
         }

         handleUpdate = () => {
           this.setState()
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

               <Modal id="addAirModal" show={show} onHide={this.showModal}>
                 <Modal.Header closeButton>
                   <Modal.Title>Aircraft Editor</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                   <Aircraft id="airForm"/>
                 </Modal.Body>
                 <Modal.Footer>
                   <Button variant="danger" onClick={this.closeModal}>
                     Close
                   </Button>
                 </Modal.Footer>
               </Modal>
             </div>
           );
         }
       }
export default ManageAircrafts;
