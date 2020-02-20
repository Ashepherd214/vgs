import React, { Component } from "react";
// import ReactDOM from "react-dom";
import firebase from "../Firestore";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import EditRunway from "./EditRunway";
import AddRunway from "./AddRunway";
import {
    Button,
    ButtonToolbar,
    Container,
    Col,
    Modal,
    Row
} from "react-bootstrap";

export class ManageRunways extends Component {
    constructor(props) {
        super(props);
        //this.rerenderParent = this.rerenderParent.bind(this)
        this.gotData = this.gotData.bind(this)
        this.select = [];
        this.state = {
            runways: [],
            select: " ",
            showAdd: false,
            showEdit: false,
            rerender: false,
            itemSelected: false
        };


    }

    componentDidMount = () => {
        const db = firebase.firestore().collection("Runways");
        this.gotData();
    };

    gotData = () => {
        //let aircrafts = [];

        const db = firebase.firestore().collection("Runways");

        // db.onSnapshot(function(querySnapshot) {


        //   //.then(querySnapshot => {
        //     var aircrafts = [];

        //     querySnapshot.forEach(function (doc) {
        //       aircrafts.push({
        //         name: doc.id,
        //         xa: doc.data().Xa,
        //         xe: doc.data().Xe,
        //         za: doc.data().Za,
        //         ze: doc.data().Ze,
        //         cg: doc.data().cg,
        //         flaps: doc.data().flaps,
        //         lookdown: doc.data().lookdown,
        //         pitch: doc.data().pitch,
        //         speed: doc.data().speed,
        //         weight: doc.data().weight,
        //         unitsAir: doc.data().unitsAir.toString()
        //       });
        //     });
        //     console.log("Current Data: ", aircrafts )
        //     this.setState({ aircrafts })
        //   })
        // .catch(function (error) {
        //   console.log("Error getting documents: ", error);
        // });

        db.get()
            .then(querySnapshot => {
                const runways = [];

                querySnapshot.forEach(function (doc) {
                    runways.push({
                        name: doc.id,
                        icao: doc.data().ICAO,
                        approachlights: doc.data().ApproachLights,
                        dh: doc.data().DH,
                        edgespacing: doc.data().EdgeSpacing,
                        gsx: doc.data().GSOffsetX,
                        gsy: doc.data().GSOffsetY,
                        glideslope: doc.data().GlideSlope,
                        tch: doc.data().TCH,
                        width: doc.data().Width,
                        units: doc.data().Units
                    });
                });

                this.setState({ runways });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    };



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
        this.setState({ itemSelected: true })
        //console.log(this.state.select)
        //alert(db.table.getPageByRowKey(rowKey))
    };

    // find selected row key and delete that aircraft from database
    delRunway = () => {
        alert(this.node.selectionContext.selected);
        const selections = [this.node.selectionContext.selected];
        const db = firebase.firestore().collection("Runways");

        selections.forEach(key => {
            db.doc(key.toString())
                .delete()
                .then(function () {
                    console.log("Deletion successful!");
                })
                .catch(function (error) {
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

        const runSelect = this.state.select
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
                text: "Runway Name",
                headerStyle: {
                    backgroundColor: '#003E6A',
                    color: '#FFFFFF'
                }
            },
            {
                dataField: "icao",
                text: "ICAO",
                headerStyle: {
                    backgroundColor: '#003E6A',
                    color: '#FFFFFF'
                }
            },
            {
                dataField: "approachlights",
                text: "Approach Lights type",
                headerStyle: {
                    backgroundColor: '#003E6A',
                    color: '#FFFFFF'
                }
            },
            {
                dataField: "dh",
                text: "Runway Decision Height",
                headerStyle: {
                    backgroundColor: '#003E6A',
                    color: '#FFFFFF'
                }
            },
            {
                dataField: "edgespacing",
                text: "Runway Edge Light Spacing",
                headerStyle: {
                    backgroundColor: '#003E6A',
                    color: '#FFFFFF'
                }
            },
            {
                dataField: "gsx",
                text: "GSOffsetX",
                headerStyle: {
                    backgroundColor: '#003E6A',
                    color: '#FFFFFF'
                }
            },
            {
                dataField: "gsy",
                text: "GSOffsetY",
                headerStyle: {
                    backgroundColor: '#003E6A',
                    color: '#FFFFFF'
                }
            },
            {
                dataField: "glideslope",
                text: "Glide Slope Angle",
                headerStyle: {
                    backgroundColor: '#003E6A',
                    color: '#FFFFFF'
                }
            },
            {
                dataField: "tch",
                text: "Runway TCH",
                headerStyle: {
                    backgroundColor: '#003E6A',
                    color: '#FFFFFF'
                }
            },
            {
                dataField: "width",
                text: "Runway Width",
                headerStyle: {
                    backgroundColor: '#003E6A',
                    color: '#FFFFFF'
                }
            },
            {
                dataField: "units",
                text: "Metric?",
                headerStyle: {
                    backgroundColor: '#003E6A',
                    color: '#FFFFFF'
                }
            }
        ];

        return (
            <div style={{ padding: 25 }} >
                <h1 align='center'>Runway Table</h1>
                <BootstrapTable
                    bootstrap4
                    ref={n => (this.node = n)}
                    id="runTable"
                    keyField="name"
                    data={this.state.runways}
                    columns={columns}
                    selectRow={selectRowProp}
                    cellEdit={cellEditFactory({ mode: "click" })}
                    headerClasses="header-class"
                />

                <ButtonToolbar style={{ display: "flex" }}>
                    <Container>
                        <Row>
                            <Col sm align='left'>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => this.setState({ showAdd: true })}
                                >
                                    Add Runway
                                </Button>
                            </Col>
                            <Col sm align='center'>
                                <Button
                                    variant="success"
                                    size="lg"
                                    onClick={() => this.setState({ showEdit: true })}
                                    disabled={!this.state.itemSelected}
                                >
                                    Edit Runway
                                </Button>
                            </Col>
                            <Col sm align='right'>
                                <Button 
                                    variant="danger" 
                                    size="lg" 
                                    onClick={this.delRunway} 
                                >
                                    Delete Runway
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </ButtonToolbar>

                <Modal id="addRunModal" show={this.state.showAdd} onHide={closeAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Runway</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddRunway id="runForm" toggle={closeAdd} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={closeAdd}>
                            Close
            </Button>
                    </Modal.Footer>
                </Modal>
                <Modal id="editRunModal" show={this.state.showEdit} onHide={closeEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Runway Editor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditRunway name={runSelect} toggle={closeEdit} render={this.gotData} />
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
export default ManageRunways;
