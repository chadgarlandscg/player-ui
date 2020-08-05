import React from 'react';
import { addPlayer } from './playerApi';
import { Form } from './Form';
import { FormSFC } from './FormSFC';

export class App extends React.Component<any, {inputValue: string;}> {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newState = {
            inputValue: event.target.value
        };
        this.setState(newState);
        console.log(event.target.value);
    }

    onButtonClick() {
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h5>Hello, Sergio and Sebas</h5>
                <Form buttonTitle={"Bob"} />
                <Form buttonTitle={"Tom"}/>

                <FormSFC 
                    inputValue={this.state.inputValue}
                    onInputChange={this.onInputChange}
                    onButtonClick={this.onButtonClick}
                    buttonTitle="Click me!"
                />

            </div>
        );
    }
}

