import axios from "axios";

export type Player = {
    name: string;
}

export function addPlayer(newPlayerName: string) {
    const newPlayer: Player = {
        name: newPlayerName
    };
    return axios.post("http://localhost:9999/players", newPlayer);
}

export function loadPlayers(): Promise<Player[]> {
    return axios.get("http://localhost:9999/players").then((response) => {
        const players = response.data;
        return players;
    });
}