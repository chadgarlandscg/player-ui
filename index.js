class Attack {
    constructor(attacker, defender) {
        this.attacker = attacker;
        this.defender = defender;
    }
    get damage() {
        return this.attacker.power - this.defender.resistance;
    }
}
class Fighter {
    constructor(attacks) {
        this._health = new FighterHealth(attacks);
    }
    get basePower() { return 2.0; }
    ;
    get baseResistance() { return 1.0; }
    ;
    attack(defender) {
        return new Attack(this, defender);
    }
    get power() {
        return this.basePower;
    }
    defend(attack) {
        return this.health.register(attack);
    }
    get resistance() {
        return this.baseResistance;
    }
    get health() {
        return this._health;
    }
}
class Inventory {
}
class Charge {
    constructor(price) {
        this.price = price;
    }
}
class Wallet {
    constructor(charges = []) {
        this.charges = charges;
    }
    add(charge) {
        this.charges.push(charge);
        return this;
    }
    get gold() {
        return this.charges.reduce((sum, charge) => sum += charge.price, 0);
    }
}
class Player extends Fighter {
    constructor(attacks = []) {
        super(attacks);
        this.wallet = new Wallet();
    }
}
class Health {
    constructor() {
        this.INITIAL_HEALTH = 100;
    }
    get status() {
        return this.remaining === 0 ? 'dead' : 'alive';
    }
    get missing() {
        return this.INITIAL_HEALTH - this.remaining;
    }
}
class FighterHealth extends Health {
    constructor(attacks = []) {
        super();
        this.attacks = attacks;
    }
    register(attack) {
        this.attacks.push(attack);
        return this;
    }
    get remaining() {
        const damage = this.attacks.reduce((sum, attack) => sum += attack.damage, 0);
        return this.INITIAL_HEALTH - damage;
    }
}
const p1 = new Player();
const p2 = new Player();
const attack = p1.attack(p2);
console.log(attack.damage === p2.health.missing);
