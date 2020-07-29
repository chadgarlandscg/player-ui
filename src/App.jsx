import React from 'react';
import { addPlayer } from './playerApi';
import { Form } from './Form';

export class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h5>Hello, Sergio and Sebas</h5>
                <Form buttonTitle="Click me pretty please!" onSubmit={(state) => console.log(state)}/>
                <Form onSubmit={(state) => console.log(state)}/>
            </div>
        );
    }
}

