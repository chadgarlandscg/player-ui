const axios = require("axios");

export function addPlayer() {
    const nameInput = document.getElementById("my-name-input");
    axios.post("http://localhost:9999/players", {name: nameInput.value}).then(() => {
        loadPlayers();
    });
}

export function loadPlayers() {
    axios.get("http://localhost:9999/players").then((response) => {
        const players = response.data;
        const playerListContainer = document.getElementById("player-list-container");
        playerListContainer.innerHTML = "";
        players.forEach(player => {
            const paragraphElement = document.createElement('p');
            paragraphElement.innerText = player.name;
            playerListContainer.append(paragraphElement);
        });
    });
}