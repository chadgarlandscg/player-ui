console.log("Hello, world!");

var x: string = "test";

function addNumbers(x: number, y: number): number {
    return x + y;
}

const y = addNumbers(2, 3);

function addNames(n1: string, n2: string) {
    console.log(n1 + n2);
    return n1 + n2;
}

const z = addNames("sergio", "chad");

console.log(z);

type P = {
    name: string;
    health: number;
    power: number;
    attack: (player: P) => void;
}

const p1: P = {
    name: "Chad",
    health: 100,
    power: 1,
    attack: (player: P) => {
        player.health = player.health - this.power
    }
}

const p2: P = {
    name: "Chad",
    health: 100,
    power: 1,
    attack: (player: P) => {
        player.health = player.health - this.power
    }
}


interface IAttacker {
    attack: (player: Player) => void;
}

class Player implements IAttacker {
    health: number;
    name: string;
    power: number;
    constructor(initialName: string, initialPower: number) {
        this.health = 100;
        this.name = initialName;
        this.power = initialPower;
    }
    attack(player: Player) {
        player.health = player.health - this.power;
    }
}

class Barbarian extends Player implements IAttacker {
    attack(player: Player) {
        player.health = player.health - this.power * 2;
    }
}

var fighters: IAttacker[] = [new Barbarian("Steve", 10), new Player("Test", 10)]

handleWar(fighters);

function handleWar(attackers: IAttacker[]) {
    attackers.forEach(p => {
        p.attack(playerOne);
    })
}

var playerOne = new Player("Sergio", 100);
var playerTwo = new Player("Chad", 10);

playerOne.attack(playerTwo);

console.log(playerTwo);

// playerOne.attack(playerTwo);

// console.log("Player two has " + playerTwo.health + " health remaining");