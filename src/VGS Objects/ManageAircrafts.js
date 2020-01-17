import React, { Component } from "react";
// import ReactDOM from "react-dom";
import firebase from "../Firestore";
import BootstrapTable from 'react-bootstrap-table-next'
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
             selected: [],
             show: false
           };

         }

         componentDidMount = () => {
           console.log("Component mounted")
           //const db = firebase.firestore().collection("Aircrafts")
           this.gotData()
         };

         gotData = () => {
           console.log("Getting Data")
           let aircrafts =[]

            const db = firebase.firestore().collection("Aircrafts");

            db.get()
              .then(querySnapshot => {
                //const aircraft = [];

                querySnapshot.forEach(function(doc) {
                  aircrafts.push({
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
                    unitsAir: doc.data().unitsAir.toString()
                  });
                });

                this.setState({ aircrafts });
              })
              .catch(function(error) {
                console.log("Error getting documents: ", error);
              });
              console.log(this.state.aircrafts)
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

          handleOnSelect = (row, isSelect, rowKey) => {
            if (isSelect) {
              const craft = this.node.selectionContext.selected
              console.log(craft)
              this.setState(() => ({
                selected: [...this.state.selected, row.id]
              }))
            } else {
              this.setState(() => ({
                selected: this.state.selected.filter(x => x !== row.id)
              }))
            }
            console.log(this.node.selectionContext.selected)
            //alert(db.table.getPageByRowKey(rowKey))
          }

          // find selected row key and delete that aircraft from database
         delAircraft = () => {
           alert(this.node.selectionContext.selected)
            const selections = [this.node.selectionContext.selected]
           const db = firebase.firestore().collection("Aircrafts")

            selections.forEach(key => {
              console.log(db.doc(key.toString()).get().then(function(doc) { console.log(doc.data())}))
              db.doc(key.toString()).delete().then(function() {
                console.log("Deletion successful!")
              }).catch(function(error) {
                console.error("Something went wrong, document not removed")
              })
            })

           
           console.log(this.state.show)
         };

         editAircraft = () => {
           // find selected row key and take user input to .set aircraft values for database
           console.log(this.state.show)
         };

         render() {
           let { show } = this.state;

           const selectRowProp = {
             mode: 'checkbox',
             bgColor: 'lightblue',
             clickToSelect: true, //enable click to select 
             hideSelectColumn: true,
             //selected: this.state.selected,
             onSelect: this.handleOnSelect
           }

           const columns = [
             {
               dataField: "name",
               text: "Aircraft Name"
             },
             {
               dataField: "xa",
               text: "Aircraft Xa Value"
             },
             {
               dataField: "xe",
               text: "Aircraft Xe Value"
             },
             {
               dataField: "za",
               text: "Aircraft Za Value"
             },
             {
               dataField: "ze",
               text: "Aircraft Ze Value"
             },
             {
               dataField: "cg",
               text: "Aircraft's CG"
             },
             {
               dataField: "flaps",
               text: "Aircraft Flaps Setting"
             },
             {
               dataField: "lookdown",
               text: "Aircraft Lookdown Value"
             },
             {
               dataField: "pitch",
               text: "Aircraft Pitch"
             },
             {
               dataField: "speed",
               text: "Aircraft Speed"
             },
             {
               dataField: "weight",
               text: "Aircraft Weight"
             },
             {
               dataField: "unitAir",
               text: "Metric?"
             }
           ];

           return (
             <div>
               <BootstrapTable
                  bootstrap4
                  ref={ n => this.node = n }
                  id="airTable"
                  keyField='name'
                  data={ this.state.aircrafts }
                  columns={ columns }
                  selectRow={ selectRowProp }
               />
                
               <ButtonToolbar>
                 <Button variant="primary" size="lg" onClick={this.showModal}>
                   Add Aircraft
                 </Button>
                 <Button variant="success" size="lg" onClick={this.editAircraft}>
                   Edit Aircraft
                 </Button>
                 <Button variant="danger" size="lg" onClick={this.delAircraft}>
                   Delete Aircraft
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
