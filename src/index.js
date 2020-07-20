const axios = require("axios");

const button = document.getElementById("my-button");// way to get the button
console.log(button.innerText);

const playerListContainer = document.getElementById("player-list-container");

button.addEventListener('click', (event) => {
    addPlayer();
});

const input = document.getElementById("my-name-input");
input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        addPlayer();
      }
});

function addPlayer() {
    const nameInput = document.getElementById("my-name-input");
    axios.post("http://localhost:9999/players", {name: nameInput.value}).then(() => {
        loadPlayers();
    });
}

function loadPlayers() {
    axios.get("http://localhost:9999/players").then((response) => {
        const players = response.data;
        playerListContainer.innerHTML = "";
        players.forEach(player => {
            const paragraphElement = document.createElement('p');
            paragraphElement.innerText = player.name;
            playerListContainer.append(paragraphElement);
        });
    });
}

loadPlayers();