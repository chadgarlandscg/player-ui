interface IAttack {
    attacker: IAttacker;
    defender: IDefender;
    damage: number;
}

type HealthStatus = 'dead' | 'alive';

interface IHealth {
    status: HealthStatus;
    remaining: number;
    missing: number;
}

interface IFighterHealth extends IHealth {
    register: (attack: IAttack) => IHealth;
}

interface IAttacker {
    attack: (defender: IDefender) => IDefender;
    power: number;
}

interface IDefender {
    defend: (attack: IAttack) => IHealth;
    health: IHealth;
    resistance: number;
}

interface IFighter extends IAttacker, IDefender {

}

interface IWall extends IDefender {

}

interface ICharge {
    price: number;
}

interface IWallet {
    add(charge: Charge): IWallet;
    gold: number;
}

interface IBuyer {
    wallet: IWallet;
}

interface IItemStore {
    transact: (request: IItemPurchaseRequest) => IItem | false;
}

interface IItemPurchaseRequest {
    item: IItem;
    buyer: IBuyer;
}

interface IItem {
    value: number;
    type: string;
}

interface IPlayer extends IFighter, IBuyer {

}

class Attack implements IAttack {
    constructor(public readonly attacker: IAttacker, public defender: IDefender) {}
    get damage() {
        return this.attacker.power - this.defender.resistance;
    }
}

class Fighter implements IFighter {
    private readonly _health: IFighterHealth;
    constructor(attacks: IAttack[]) {
        this._health = new FighterHealth(attacks);
    }
    protected get basePower() { return 2.0 };
    protected get baseResistance() { return 1.0 };
    attack(defender: IDefender): IDefender {
        const attack = new Attack(this, defender);
        defender.defend(attack);
        return defender;
    }
    get power() {
        return this.basePower;
    }
    defend(attack: IAttack): IHealth {
        return this.health.register(attack);
    }
    get resistance() {
        return this.baseResistance;
    }
    get health() {
        return this._health;
    }
}

interface IInventory {

}

class Inventory {
    items: IItem[];
    wallet: IWallet;
}

class Charge implements ICharge {
    constructor(public readonly price: number) {}
}

class Wallet implements IWallet {
    constructor(private readonly charges: ICharge[] = []) {}
    add(charge: ICharge) {
        this.charges.push(charge);
        return this;
    }
    get gold(): number {
        return this.charges.reduce((sum, charge) => sum += charge.price, 0);
    }
}

class Player extends Fighter implements IPlayer {
    public readonly wallet: IWallet;
    constructor(attacks: IAttack[] = []) {
        super(attacks);
        this.wallet = new Wallet();
    }
}

abstract class Health implements IHealth {
    protected readonly INITIAL_HEALTH = 100;
    get status(): HealthStatus {
        return this.remaining === 0 ? 'dead' : 'alive'
    }
    abstract get remaining(): number;
    get missing(): number {
        return this.INITIAL_HEALTH - this.remaining;
    }
}

class FighterHealth extends Health implements IFighterHealth {
    constructor(private attacks: IAttack[] = []) {
        super();
    }
    register(attack: IAttack): IHealth {
        this.attacks.push(attack);
        return this;
    }
    get remaining(): number {
        const damage = this.attacks.reduce((sum, attack) => sum += attack.damage, 0);
        return this.INITIAL_HEALTH - damage;
    }
}

interface ITurn {
    
}

interface IBattle {
    next: (turn: ITurn) => ITurn[];
}

const p1: IPlayer = new Player();
const p2: IPlayer = new Player();

const defender = p1.attack(p2);
console.log(defender.health.missing);