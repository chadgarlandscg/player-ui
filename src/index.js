const playerApi = require("./playerApi");

const button = document.getElementById("my-button");// way to get the button
console.log(button.innerText);

button.addEventListener('click', (event) => {
    playerApi.addPlayer();
});

const input = document.getElementById("my-name-input");
input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        playerApi.addPlayer();
      }
});

playerApi.loadPlayers();