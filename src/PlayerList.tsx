import React from 'react';
import { List } from './List';

export type PlayerListProps = {
    players: {name: string}[];
}

export const PlayerList = (props: PlayerListProps) => <List values={props.players.map(p => p.name)}/>;