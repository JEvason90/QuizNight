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
      <div class="container">
        <div class="row">
          <div class="col-sm"></div>
          <div class="col-sm">
            <img src={familyMisfortunes} style={imgStyle}></img>
          </div>
          <div class="col-sm"></div>
        </div>
        <br />
      </div>
    );
  }
}
