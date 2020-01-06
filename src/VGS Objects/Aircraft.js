import React from "react";
import ReactDOM from "react-dom";
import firebase from "../Firestore";

class Aircraft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ACName: " ",
      Ze: " ",
      Xe: " ",
      Lookdown: " ",
      Za: " ",
      Xa: " ",
      Flaps: " ",
      Speed: " ",
      Weight: " ",
      CG: " ",
      Pitch: " ",
      Units: false
    };
  }

  updateInfo = event => {
    this.setState({
      [event.target.acName]: event.target.value
      /*Ze: 0.0,
                Xe: 0.0,
                Lookdown: 0.0,
                Za: 0.0,
                Xa: 0.0,
                Flaps: 0,
                Speed: 0,
                Weight: 0.0,
                CG: 0.0,
                Pitch: 0.0,
                Units: true */
    });
  };

  addAircraft = event => {
    event.preventDefault();

    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("Aircrafts")
      .doc(String(this.state.acName))
      .set({
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
      });
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
    });
  };

  /*
  renderAircraftTableHeader() {
    return (
      <tr>
        <th>NAME</th>
        <th>ZE</th>
        <th>XE</th>
        <th>LOOKDOWN</th>
        <th>ZA</th>
        <th>XA</th>
        <th>FLAPS</th>
        <th>SPEED</th>
        <th>WEIGHT</th>
        <th>CG</th>
        <th>PITCH</th>
        <th>METRIC?</th>
      </tr>
    );
  }

  renderAircraftTable() {
    return this.state.aircrafts.map((aircraft, index) => {
      const {
        acName,
        ze,
        xe,
        lookdown,
        za,
        xa,
        flaps,
        speed,
        weight,
        cg,
        pitch,
        unit
      } = aircraft;

      return (
        <tr key={acName}>
          <td>{acName}</td>
          <td>{ze}</td>
          <td>{xe}</td>
          <td>{lookdown}</td>
          <td>{za}</td>
          <td>{xa}</td>
          <td>{flaps}</td>
          <td>{speed}</td>
          <td>{weight}</td>
          <td>{cg}</td>
          <td>{pitch}</td>
          <td>{unit}</td>
        </tr>
      );
    });
  } */

  render() {
    const {
      acName,
      ze,
      xe,
      lookdown,
      za,
      xa,
      flaps,
      speed,
      weight,
      cg,
      pitch,
      unit
    } = this.state;
    return (
      /*<div>
                <h1 id='title'>Aircraft Dynamic Table</h1>
                <table id='aircrafts'>
                    <tbody>
                        <tr>{this.renderAircraftTableHeader()}</tr>
                        {this.renderAircraftTable()}
                    </tbody>
                </table>
            </div>*/
      <form onSubmit={this.addAircraft}>
        <input
          type="text"
          name="acName"
          placeholder="Aircraft name"
          onChange={this.updateInfo}
          value={acName}
        />
        <br />
        <input
          type="number"
          name="ze"
          placeholder="Aircrat's Ze value"
          onChange={this.updateInfo}
          value={ze}
        />
        <br />
        <input
          type="number"
          name="xe"
          placeholder="Aircraft's Xe value"
          onChange={this.updateInfo}
          value={xe}
        />
        <br />
        <input
          type="number"
          name="lookdown"
          placeholder="Aircraft's lookdown value"
          onChange={this.updateInfo}
          value={lookdown}
        />
        <br />
        <input
          type="number"
          name="za"
          placeholder="Aircraft's Za value"
          onChange={this.updateInfo}
          value={za}
        />
        <br />
        <input
          type="number"
          name="xa"
          placeholder="Aircraft's Xa value"
          onChange={this.updateInfo}
          value={xa}
        />
        <br />
        <input
          type="number"
          name="flaps"
          placeholder="Aircraft's flaps value"
          onChange={this.updateInfo}
          value={flaps}
        />
        <br />
        <input
          type="number"
          name="speed"
          placeholder="Aircraft's speed value"
          onChange={this.updateInfo}
          value={speed}
        />
        <br />
        <input
          type="number"
          name="weight"
          placeholder="Aircraft's weight value"
          onChange={this.updateInfo}
          value={weight}
        />
        <br />
        <input
          type="number"
          name="cg"
          placeholder="Aircraft's cg value"
          onChange={this.updateInfo}
          value={cg}
        />
        <br />
        <input
          type="number"
          name="pitch"
          placeholder="Aircraft's pitch value"
          onChange={this.updateInfo}
          value={pitch}
        />
        <br />
        <input
          type="checkbox"
          name="unit"
          value="Metric"
          onChange={this.updateInfo}
          value={unit}
        />{" "}
        These values are in metric.
        <br />
        <input type="submit" value="submit" />
      </form>
    );
  }
}

export default Aircraft;
