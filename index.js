var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _this = this;
console.log("Hello, world!");
var x = "test";
function addNumbers(x, y) {
    return x + y;
}
var y = addNumbers(2, 3);
function addNames(n1, n2) {
    console.log(n1 + n2);
    return n1 + n2;
}
var z = addNames("sergio", "chad");
console.log(z);
var p1 = {
    name: "Chad",
    health: 100,
    power: 1,
    attack: function (player) {
        player.health = player.health - _this.power;
    }
};
var p2 = {
    name: "Chad",
    health: 100,
    power: 1,
    attack: function (player) {
        player.health = player.health - _this.power;
    }
};
var Player = /** @class */ (function () {
    function Player(initialName, initialPower) {
        this.health = 100;
        this.name = initialName;
        this.power = initialPower;
    }
    Player.prototype.attack = function (player) {
        player.health = player.health - this.power;
    };
    return Player;
}());
var Barbarian = /** @class */ (function (_super) {
    __extends(Barbarian, _super);
    function Barbarian() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Barbarian.prototype.attack = function (player) {
        player.health = player.health - this.power * 2;
    };
    return Barbarian;
}(Player));
var fighters = [new Barbarian("Steve", 10), new Player("Test", 10)];
handleWar(fighters);
function handleWar(attackers) {
    attackers.forEach(function (p) {
        p.attack(playerOne);
    });
}
var playerOne = new Player("Sergio", 100);
var playerTwo = new Player("Chad", 10);
playerOne.attack(playerTwo);
console.log(playerTwo);
// playerOne.attack(playerTwo);
// console.log("Player two has " + playerTwo.health + " health remaining");
