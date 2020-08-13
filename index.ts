interface IAttack {
    attacker: IAttacker;
    defender: IDefender;
    damage: number;
}

type HealthStatus = 'dead' | 'alive';

interface IHealthBar {
    status: HealthStatus;
    health: number;
}

interface IPlayerHealthBar extends IHealthBar {
    register: (attack: IAttack) => IHealthBar;
}

interface IAttacker {
    attack: (defender: IDefender) => IAttack;
    power: number;
}

interface IDefender {
    defend: (attack: IAttack) => IHealthBar;
    resistance: number;
}

interface IPlayer extends IAttacker, IDefender {

}

interface IWall extends IDefender {

}

class Attack implements IAttack {
    constructor(
        public readonly attacker: IAttacker,
        public readonly defender: IDefender
    ) {}

    get damage() {
        return this.attacker.power - this.defender.resistance;
    }
}

class Player implements IPlayer {
    private readonly healthBar: IPlayerHealthBar;
    constructor(attacks: IAttack[]) {
        this.healthBar = new PlayerHealthBar(attacks);
    }
    protected get basePower() { return 2.0 };
    protected get baseResistance() { return 1.0 };
    attack(defender: IDefender): IAttack {
        return new Attack(this, defender);
    }
    get power() {
        return this.basePower;
    }
    defend(attack: IAttack): IHealthBar {
        return this.healthBar.register(attack);
    }
    get resistance() {
        return this.baseResistance;
    }
}

abstract class HealthBar implements IHealthBar {
    get status(): HealthStatus {
        return this.health === 0 ? 'dead' : 'alive'
    }
    abstract get health(): number;
}

class PlayerHealthBar extends HealthBar implements IPlayerHealthBar {
    constructor(private attacks: IAttack[]) {
        super();
    }
    register(attack: IAttack) {
        this.attacks.push(attack);
        return this;
    }
    get health(): number {
        const damage = this.attacks.reduce((sum, attack) => sum += attack.damage, 0);
        return 100 - damage;
    }
}