import React from 'react';
import { addPlayer } from './playerApi';
export class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h5>Hello, Sergio and Sebas</h5>
                <Form buttonTitle="Click me pretty please!"/>
                <Form/>
            </div>
        );
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        };
    }
    render() {
        return (
            <div>
                <input value={this.state.inputValue} onChange={(event) => {
                    const newState = {
                        inputValue: event.target.value
                    };
                    this.setState(newState);
                    console.log(event.target.value);
                }}/>
                <button onClick={() => {
                    console.log(this.state)
                }}>{this.props.buttonTitle || "Test!"}</button>
            </div>
        )
    }
}