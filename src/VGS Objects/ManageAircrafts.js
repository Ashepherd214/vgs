import React, { Component } from "react";
// import ReactDOM from "react-dom";
import firestore from "../Firestore";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import EditAircraft from "../components/TableComponents/EditAircraft";
import AddAircraft from "../components/TableComponents/AddAircraft";
import {
  Button,
  ButtonToolbar,
  Col,
  Container,
  Modal,
  Row
} from "react-bootstrap";

export class ManageAircrafts extends Component {
  constructor(props) {
    super(props);
    //this.rerenderParent = this.rerenderParent.bind(this)
    this.gotData = this.gotData.bind(this)
    this.select=[];
    this.state = {
      aircrafts: [],
      select: " ",
      xa: "",
      xe: "",
      za: "",
      ze: "",
      cg: "",
      flaps: "",
      lookdown: "",
      pitch: "",
      speed: "",
      weight: "",
      unitsAir: "",
      showAdd: false,
      showEdit: false,
      rerender: false,
      itemSelected: false
    };

    
  }

  componentDidMount = () => {
    this.gotData();
  };

  gotData = () => {

    const db = firestore.collection("Aircrafts");

    db.get()
      .then(querySnapshot => {
        const aircrafts = [];

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
            unitsAir: doc.data().unitsAir
          });
        });

        this.setState({ aircrafts });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };

  async childFunction() {
    //let select = selected;
    //let selection = [this.node.selectionContext.selected]
    let selection = [this.state.select]
    
    console.log("Inside ChildFunction: ", selection[0])
    const db = await firestore.collection("Aircrafts").doc(selection[0].toString());
    const data = await firestore.collection("Aircrafts").doc(selection[0].toString()).get()

    // Check if values are metric or not. If metric convert to imperial for calculation purposes
    // through the callback function. Metric to Imperial conversion is x(Feet)/3.28(meters) or x(Feet) * 3.281(Meters). Weight from lbs into kg (x * 0.4536)
    // if(data.data().unitsAir == true) {
    //   let xaI = (data.data().Xa) * 3.281
    //   let xeI = (data.data().Xe) * 3.281
    //   let zaI = (data.data().Za) * 3.281
    //   let zeI = (data.data().Ze) * 3.281
    //   let weightI = (data.data().weight) * 2.205

    //   this.setState({
    //     xa: xaI,
    //     xe: xeI,
    //     za: zaI,
    //     ze: zeI,
    //     cg: data.data().cg,
    //     flaps: data.data().flaps,
    //     lookdown: data.data().lookdown,
    //     pitch: data.data().pitch,
    //     speed: data.data().speed,
    //     weight: weightI,
    //     unitsAir: false
    //   })
    // } else {
    //   console.log("Aircraft values already in Imperial")
      this.setState({
        xa: data.data().Xa,
        xe: data.data().Xe,
        za: data.data().Za,
        ze: data.data().Ze,
        cg: data.data().cg,
        flaps: data.data().flaps,
        lookdown: data.data().lookdown,
        pitch: data.data().pitch,
        speed: data.data().speed,
        weight: data.data().weight,
        unitsAir: data.data().unitsAir
      })
    //}
    db.get()
    .then(function(doc) {
        const data = doc.data()
        console.log(selection[0])
        console.log(data)
        
    })

    this.props.parentFunction(
      selection[0],
      this.state.xa,
      this.state.xe,
      this.state.za,
      this.state.ze,
      this.state.cg,
      this.state.flaps,
      this.state.lookdown,
      this.state.pitch,
      this.state.speed,
      this.state.weight,
      this.state.unitsAir
      )
}

  rerenderParent() {
    //this.forceUpdate()
    // this.setState({ 
    //   rerender: !this.state.rerender
    // });
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
    this.childFunction=this.childFunction.bind(this)
    setTimeout(() => {
    if (isSelect) {
      //const craft = this.node.selectionContext.selected;
      this.setState(() => ({
        selected: [row.id]
      }));
    } else {
      this.setState(() => ({
        selected: this.state.selected.filter((x) => x !== row.id)
      }));
    }
    this.setState(() => ({
      select: this.node.selectionContext.selected
    }));
    this.setState({ itemSelected: true })
  })
    console.log(this.state.select)
    setTimeout(() => {
      this.childFunction()
  })
  };

  // find selected row key and delete that aircraft from database
  delAircraft = () => {
    alert(this.node.selectionContext.selected);
    const selections = [this.node.selectionContext.selected];
    const db = firestore.collection("Aircrafts");

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
    //let rerenderParent = () => this.rerenderParent();

    const airSelect = this.state.select
    const selectRowProp = {
      mode: "radio",
      bgColor: "lightblue",
      clickToEdit: false,
      clickToSelect: true, //enable click to select
      hideSelectColumn: true,
      //selected: this.state.selected,
      onSelect: this.handleOnSelect
    };

    const columns = [
      {
        dataField: "name",
        text: "Aircraft Name",
        headerStyle: {
          backgroundColor: '#003E6A',
          color: '#FFFFFF'
        }
      },
      {
        dataField: "xa",
        text: "Aircraft Xa Value",
        headerStyle: {
          backgroundColor: '#003E6A',
          color: '#FFFFFF'
        }
      },
      {
        dataField: "xe",
        text: "Aircraft Xe Value",
        headerStyle: {
          backgroundColor: '#003E6A',
          color: '#FFFFFF'
        }
      },
      {
        dataField: "za",
        text: "Aircraft Za Value",
        headerStyle: {
          backgroundColor: '#003E6A',
          color: '#FFFFFF'
        }
      },
      {
        dataField: "ze",
        text: "Aircraft Ze Value",
        headerStyle: {
          backgroundColor: '#003E6A',
          color: '#FFFFFF'
        }
      },
      {
        dataField: "cg",
        text: "Aircraft's CG",
        headerStyle: {
          backgroundColor: '#003E6A',
          color: '#FFFFFF'
        }
      },
      {
        dataField: "flaps",
        text: "Aircraft Flaps Setting",
        headerStyle: {
          backgroundColor: '#003E6A',
          color: '#FFFFFF'
        },
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
        text: "Aircraft Lookdown Value",
        headerStyle: {
          backgroundColor: '#003E6A',
          color: '#FFFFFF'
        }
      },
      {
        dataField: "pitch",
        text: "Aircraft Pitch",
        headerStyle: {
          backgroundColor: '#003E6A',
          color: '#FFFFFF'
        }
      },
      {
        dataField: "speed",
        text: "Aircraft Speed",
        headerStyle: {
          backgroundColor: '#003E6A',
          color: '#FFFFFF'
        }
      },
      {
        dataField: "weight",
        text: "Aircraft Weight",
        headerStyle: {
          backgroundColor: '#003E6A',
          color: '#FFFFFF'
        }
      },
      {
        dataField: "unitsAir",
        text: "Metric?",
        headerStyle: {
          backgroundColor: '#003E6A',
          color: '#FFFFFF'
        }
      }
    ];

    return (
      <div style={{ padding: 25 }}>
        <h1 align='center'>Aircraft Table</h1>
        <BootstrapTable
          bootstrap4
          ref={n => (this.node = n)}
          id="airTable"
          keyField="name"
          data={this.state.aircrafts}
          columns={columns}
          selectRow={selectRowProp}
          cellEdit={cellEditFactory({ mode: "click" })}
          headerClasses="header-class"
        />

        <ButtonToolbar className='d-flex'>
          <Container>
            <Row>
              <Col sm align='left'>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => this.setState({ showAdd: true })}
                >
                  Add Aircraft
                </Button>
              </Col>
              <Col sm align='center'>
                <Button
                  variant="success"
                  size="lg"
                  onClick={() => this.setState({ showEdit: true })}
                  disabled={!this.state.itemSelected}
                >
                  Edit Aircraft
                </Button>
              </Col>
              <Col sm align='right'>
                <Button 
                  variant="danger" 
                  size="lg" 
                  onClick={this.delAircraft}
                >
                  Delete Aircraft
                </Button>
              </Col>
            </Row>
          </Container>
        </ButtonToolbar>

        <Modal id="addAirModal" show={this.state.showAdd} onHide={closeAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Aircraft Editor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddAircraft id="airForm" toggle={closeAdd}/>
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
            <EditAircraft name={ airSelect } toggle={closeEdit} render={this.gotData}/>
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
