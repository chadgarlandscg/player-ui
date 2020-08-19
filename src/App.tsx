import React from 'react';
import * as playerApi from './playerApi';
import { Form } from './Form';
import { FormSFC } from './FormSFC';
import { List } from './List';
import { PlayerForm } from './PlayerForm';
import { PlayerList } from './PlayerList';

interface IAppState {
    players: {name: string}[];
}

interface IAppProps {
}

export class App extends React.Component<IAppProps, IAppState> {
    constructor(props) {
        super(props);
        this.state = {
            players: []
        }
        this.loadPlayers = this.loadPlayers.bind(this);
    }

    componentDidMount() {
        this.loadPlayers();
    }

    async loadPlayers() {
        const players = await playerApi.loadPlayers();
        this.setState({players})
    }

    render() {
        return (
            <div>
                <h5>Hello, Sergio and Sebas</h5>
                <button onClick={this.loadPlayers}>Refresh</button>
                <PlayerForm />
                <PlayerList players={this.state.players}/>
            </div>
        );
    }
}

