import React, { Component } from 'react';
import imageData from './Images';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

console.log(imageData);

const imgStyle = {
    height: '500px',
};

export class Eyes extends Component {
    static displayName = Eyes.name;

    constructor(props) {
        super(props);
        this.state = { currentCount: 0, imageId: 1};
        this.nextPerson = this.nextPerson.bind(this);
        this.previousPerson = this.previousPerson.bind(this);
        this.reveal = this.reveal.bind(this);
    }

    nextPerson() {
        this.setState({
            currentCount: this.state.currentCount + 1,
            imageId: 1
        });
    }

    previousPerson() {
        this.setState({
            currentCount: this.state.currentCount - 1,
            imageId: 1
        });
    }

    reveal() {
        if(this.state.imageId === 1)
        {
            this.setState({
                imageId: 0
            })
        }
        else{
            this.setState({
                imageId: 1
            })
        }
    }

    render() {
        return (
            <div>

                <div className="row text-center">
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <h1>Eyes on the prize</h1>
                        <p>Guess the celebrity/character</p>
                    </div>
                    <div className="col-sm"></div>
                </div>

                <div className="row text-center">
                    <div className="col-sm"><button disabled={this.state.currentCount === 0} className="btn btn-primary" onClick={this.previousPerson}>Previous</button></div>
                    <div className="col-sm">
                        <img src={images[imageData[this.state.currentCount].images[this.state.imageId].imageName]} style={imgStyle}></img>
                    </div>
                    <div className="col-sm"><button disabled={this.state.currentCount === 4} className="btn btn-primary" onClick={this.nextPerson}>Next</button></div>
                </div>

                <div className="row text-center">
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <button className="btn btn-primary" onClick={this.reveal}>Reveal</button>
                    </div>
                    <div className="col-sm"></div>
                </div>



            </div>
        );
    }
}
