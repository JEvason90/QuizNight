import React, { Component } from 'react';
import familyMisfortunes from '../images/familyFortunes.jpg'

const imgStyle = {
  width: '1000px',
  height: '500px',
};

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div className="container">
        <div className="row text-center">
          <div className="col-sm"></div>
          <div className="col-sm">
            <img src={familyMisfortunes} style={imgStyle}></img>
          </div>
          <div className="col-sm"></div>
        </div>
        <br />
      </div>
    );
  }
}
