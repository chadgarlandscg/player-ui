const axios = require("axios");

const button = document.getElementById("my-button");// way to get the button
console.log(button.innerText);

const playerListContainer = document.getElementById("player-list-container");

button.addEventListener('click', (event) => {
    const nameInput = document.getElementById("my-name-input");
    axios.post("http://localhost:9999/players", {name: nameInput.value});
});

axios.get("http://localhost:9999/players").then((response) => {
    const players = response.data;
    players.forEach(player => {
        const paragraphElement = document.createElement('p');
        paragraphElement.innerText = player.name;
        playerListContainer.append(paragraphElement);
    });
});