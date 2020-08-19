import axios from "axios";

export function addPlayer(newPlayerName: string) {
    return axios.post("http://localhost:9999/players", {name: newPlayerName});
}

export function loadPlayers() {
    return axios.get("http://localhost:9999/players").then((response) => {
        const players = response.data;
        return players;
    });
}