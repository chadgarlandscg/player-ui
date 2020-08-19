import React from 'react';
import { List } from './List';
import * as playerApi from './playerApi'
import {Player} from './playerApi'

type PlayerListState = {
    players: Player[];
    isLoading: boolean;
}

type PlayerListProps = {

}

export class PlayerList extends React.Component<PlayerListProps, PlayerListState> {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            isLoading: true
        }
    }

    componentDidMount() {
        playerApi.loadPlayers().then((playersFromServer) => {
            console.log(playersFromServer);
            const newState = {
                isLoading: false,
                players: playersFromServer
            };
            this.setState(newState);
        });
    }

    render() {
        const playerNames: string[] = this.state.players.map(p => p.name);
        return this.state.isLoading ? <Spinner/> : <List values={playerNames}/>
    }
}

function Spinner() {
    return <h1>
        Loading players...
    </h1>
}