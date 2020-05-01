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
        this.state = { questions: [], answers: [], loading: true, loadingQuestion: true, pageNumber: 1, showAnswers: false }
        this.getAnswersForQuestion = this.getAnswersForQuestion.bind(this);
        this.revealAnswers = this.revealAnswers.bind(this);
    }

    nextQuestion() {
        var newPageNumber = this.state.pageNumber + 1;
        this.getAnswersForQuestion(newPageNumber)
        this.setState({
            pageNumber: newPageNumber,
            showAnswers: false
        });
    }

    previousQuestion() {
        var newPageNumber = this.state.pageNumber - 1;
        this.getAnswersForQuestion(newPageNumber)
        this.setState({
            pageNumber: newPageNumber,
            showAnswers: false
        });
    }

    componentDidMount() {
        this.getQuestions();
        this.getAnswersForQuestion(this.state.pageNumber);
    }

    static renderQuestionText(questions, pageNumber) {
        console.log("Render Question");
        console.log(questions);

        if(questions === undefined)
        {
            return (
                <div className="alert alert-danger">
                    No Questions have been loaded
                </div>
            )
        }
        else{
        return (
            <div className="row">
                <p className="text-center">{questions[pageNumber-1]["questionText"]}</p>
            </div>
        )
    }
    }

    static renderAnswersTable(answers, pageNumber) {
        console.log("Render Table");
        console.log(answers);

        if (answers.length === 0) {
            return (<div className="alert alert-danger">
                <p> No Answers have been loaded for quesiton {pageNumber}</p>
            </div>)
        }

        else {
            return (
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Phrase</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {answers.map(answer =>
                            <tr key={answer.answerId}>
                                <td>{answer.answerText}</td>
                                <td>{answer.score}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            );
        }

    }

    revealAnswers(){
        if (this.state.showAnswers === true) {
            this.setState({
                showAnswers: false
            })
        }
        else {
            this.setState({
                showAnswers: true
            })
        }
    }
    render() {

        let contents = <div className="row">
            <button className="btn btn-success" onClick={this.revealAnswers} >Answers</button>
        </div>

        if(this.state.showAnswers === true)
        {
            contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Misfortunes.renderAnswersTable(this.state.answers, this.state.pageNumber);
        }

        let question = this.state.loadingQuestion 
            ? <p><em>Loading...</em></p> 
            : Misfortunes.renderQuestionText(this.state.questions, this.state.pageNumber);

        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            <h1 className="text-center">Question</h1>
                        </div>
                        {question}
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-sm-6"><button className ="btn btn-primary" disabled={this.state.pageNumber === 1} onClick={this.previousQuestion}>Previous</button></div>
                            <div className="col-sm-6"><button className ="btn btn-primary" disabled={this.state.pageNumber === 5} onClick={this.nextQuestion}>Next</button></div>
                        </div>
                    </div>
                </div>
                {contents}
            </div>
        );
    }

    async getAnswersForQuestion(questionId) {
        const response = await fetch('/api/questions/' + questionId + '/answers');
        console.log(response);
        const data = await response.json();
        console.log(data);
        this.setState({ answers: data, loading: false });
    }

    async getQuestions() {
        const response = await fetch('/api/questions/');
        console.log(response);
        const data = await response.json();
        console.log(data);
        this.setState({ questions: data, loadingQuestion: false })
    }
}
