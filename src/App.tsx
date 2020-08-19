import React from 'react';
import { addPlayer } from './playerApi';
import { Form } from './Form';
import { MovingList } from './MovingList';
import { PlayerForm } from './PlayerForm';
import { List } from './List';
import { PlayerList } from './PlayerList';

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h5>Hello, Sergio and Sebas</h5>
                <PlayerForm />
                <PlayerList />
            </div>
        );
    }
}

