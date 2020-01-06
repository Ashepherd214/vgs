import React, {
    useEffect,
    useState
} from 'react';
import firebase from 'firestore';
import BuildAircraftTable from './BuildAircraftTable';
import {
    Table,
    Container,
    Button,
    ButtonToolbar,
    Modal
} from 'react-bootstrap';


export const ManageAircraft = (props) => {

    let airCraftTable = [];

    useEffect(() => { // This will be a function to reload the aircraft array once we get data

    }, [airCraftTable]);

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
                <BuildAircraftTable/>
            </Table>
            <ButtonToolbar>
                <Button variant="primary" size="lg"
                    onClick={
                        () => {
                            console.log('button-big');
                        }
                }>
                    Add aircraft
                </Button>
            </ButtonToolbar>
        </div>

    );
}

export default ManagerV2
