import React, { Component } from "react";
// import ReactDOM from "react-dom";
import firebase from "../Firestore";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import EditAircraft from "./EditAircraft";
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
    this.select=[];
    this.state = {
      aircrafts: [],
      select: " ",
      showAdd: false,
      showEdit: false
    };
  }

  componentDidMount = () => {
    const db = firebase.firestore().collection("Aircrafts");
    this.gotData();
  };

  gotData = () => {
    let aircrafts = [];

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
  };

  showModal = () => {
    this.setState({
      show: !this.state.show
    });
  };

  closeModal = () => {
    this.setState({
      show: !this.state.show
    });
    this.handleUpdate();
  };

  handleOnSelect = (row, isSelect, rowKey) => {
    // ...this.state.selected,
    if (isSelect) {
      const craft = this.node.selectionContext.selected;
      this.setState(() => ({
        selected: [row.id]
      }));
    } else {
      this.setState(() => ({
        selected: this.state.selected.filter(x => x !== row.id)
      }));
    }
    this.setState(() => ({
      select: this.node.selectionContext.selected
    }));
    //console.log(this.state.select)
    //alert(db.table.getPageByRowKey(rowKey))
  };

  // find selected row key and delete that aircraft from database
  delAircraft = () => {
    alert(this.node.selectionContext.selected);
    const selections = [this.node.selectionContext.selected];
    const db = firebase.firestore().collection("Aircrafts");

    selections.forEach(key => {
      db.doc(key.toString())
        .delete()
        .then(function() {
          console.log("Deletion successful!");
        })
        .catch(function(error) {
          console.error("Something went wrong, document not removed");
        });
    });

  };

  // editAircraft = () => {
  //   // find selected row key and take user input to .set aircraft values for database
  //   console.log(this.state.show);
  // };

  render() {
    let closeAdd = () => this.setState({ showAdd: false });
    let closeEdit = () => this.setState({ showEdit: false });

    const airSelect = this.state.select
    const selectRowProp = {
      mode: "radio",
      bgColor: "lightblue",
      clickToEdit: true,
      clickToSelect: true, //enable click to select
      hideSelectColumn: true,
      //selected: this.state.selected,
      onSelect: this.handleOnSelect
    };

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
        text: "Aircraft Flaps Setting",
        editor: {
          type: Type.SELECT,
          options: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "2",
              label: "2"
            },
            {
              value: "3",
              label: "3"
            },
            {
              value: "4",
              label: "4"
            },
            {
              value: "5",
              label: "5"
            }
          ]
        }
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
          ref={n => (this.node = n)}
          id="airTable"
          keyField="name"
          data={this.state.aircrafts}
          columns={columns}
          selectRow={selectRowProp}
          cellEdit={cellEditFactory({ mode: "click" })}
        />

        <ButtonToolbar>
          <Button
            variant="primary"
            size="lg"
            onClick={() => this.setState({ showAdd: true })}
          >
            Add Aircraft
          </Button>
          <Button
            variant="success"
            size="lg"
            onClick={() => this.setState({ showEdit: true })}
          >
            Edit Aircraft
          </Button>
          <Button variant="danger" size="lg" onClick={this.delAircraft}>
            Delete Aircraft
          </Button>
        </ButtonToolbar>

        <Modal id="addAirModal" show={this.state.showAdd} onHide={closeAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Aircraft Editor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddAircraft id="airForm" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={closeAdd}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal id="editAirModal" show={this.state.showEdit} onHide={closeEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Aircraft Editor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditAircraft name={ airSelect } toggle={closeEdit}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={closeEdit}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default ManageAircrafts;
