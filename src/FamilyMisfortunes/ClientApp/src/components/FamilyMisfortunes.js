import React, { Component } from 'react';


export class Misfortunes extends Component {
    static displayName = Misfortunes.name;
    constructor(props) {
        super(props);
        this.state = { answers: [], loading: true };
    }

    componentDidMount() {
        this.populateAnswerData();
    }

    static renderAnswersTable(answers) {
        console.log(answers);
        return (
            <div>    
            <h3>{answers["question"]}</h3>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Phrase</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {answers.answers.map(answer =>
                        <tr key={answer.score}>
                            <td>{answer.phrase}</td>
                            <td>{answer.score}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Misfortunes.renderAnswersTable(this.state.answers);

        return (
            <div>
                <h1 id="tabelLabel" >Answers</h1>
                <p>Our Servey said...</p>
                {contents}
            </div>
        );
    }

    async populateAnswerData() {
        const response = await fetch('questionandanswers');
        const data = await response.json();
        this.setState({ answers: data, loading: false });
    }
}
