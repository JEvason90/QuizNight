import React, { Component } from 'react';

const hide = {
    display: 'none',
};

export class Misfortunes extends Component {
    static displayName = Misfortunes.name;
    constructor(props) {
        super(props);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.previousQuestion = this.previousQuestion.bind(this);
        this.state = { response: {}, loading: true, pageNumber: 1 }
        this.populateAnswerData = this.populateAnswerData.bind(this);
    }

    nextQuestion() {
        this.setState({
            pageNumber: this.state.pageNumber + 1,
        });
        console.log(this.state.pageNumber);
    }

    previousQuestion() {
        this.setState({
            pageNumber: this.state.pageNumber - 1,
        });
        console.log(this.state.pageNumber)
    }

    componentDidMount()
    {
        this.populateAnswerData();
    }

    static renderAnswersTable(response) {
        console.log(response);
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Phrase</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {response["answers"].map(answer =>
                        <tr key={answer.answerId}>
                            <td>{answer.answerText}</td>
                            <td>{answer.score}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Misfortunes.renderAnswersTable(this.state.response);

        return (
            <div>
                <div className="row">
                <div className="col">
                    <div className="row">
                        <h1 className="text-center">Question</h1>
                    </div>
                    <div className="row">
                        <p className="text-center">{this.state.response["questionText"]}</p>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                    <button onClick={this.previousQuestion}>Previous</button>
                    <button onClick={this.nextQuestion}>Next</button>
                    </div>
                </div>
                </div>
                {contents}
            </div>
        );
    }

    async populateAnswerData() {
        const response = await fetch('questionandanswers/' + this.state.pageNumber);
        const data = await response.json();
        this.setState({ response: data, loading: false });
    }
}
