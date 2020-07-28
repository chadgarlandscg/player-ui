const axios = require("axios");

export function addPlayer() {
    const nameInput = document.getElementById("my-name-input");
    return axios.post("http://localhost:9999/players", {name: nameInput.value});
}

export function loadPlayers() {
    axios.get("http://localhost:9999/players").then((response) => {
        const players = response.data;
        return players;
    });
}