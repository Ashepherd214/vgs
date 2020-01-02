import React from 'react'
import ReactDOM from 'react-dom'
import firebase from '../Firestore'
import { Table, Container } from 'react-bootstrap'

class BuildAircraftTable extends React.Component {
    render() {
    const db = firebase.firestore().collection("Aircrafts");
        return(
            db.get().then(function(querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let data = doc.data()
                    console.log("Document data: ", data)
                    console.log(doc.id, " => ", doc.data())
                    console.log(doc.get("weight"))
                    return data.map((data, i) => {

                    
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
        )
    }
}

export default BuildAircraftTable