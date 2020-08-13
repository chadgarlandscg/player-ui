import React from 'react';
import { addPlayer } from './playerApi';
import { Form } from './Form';
import { FormSFC } from './FormSFC';
import { MovingList } from './MovingList';

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h5>Hello, Sergio and Sebas</h5>
                <MovingList/>
            </div>
        );
    }
}

