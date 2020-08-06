import React from 'react';
import { addPlayer } from './playerApi';
import { Form } from './Form';
import { FormSFC } from './FormSFC';
import { List } from './List';

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h5>Hello, Sergio and Sebas</h5>
                <List values={["Sebas", "Serge", "Chad"]}/>
                <List values={["Obed", "Mike"]}/>
            </div>
        );
    }
}

