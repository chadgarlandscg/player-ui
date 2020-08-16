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
    register: (attack: IAttack) => IFighterHealth;
}

interface IAttacker {
    attack: (defender: IDefender) => IDefender;
    hasAttacked: boolean;
    power: number;
}

interface IDefender {
    defend: (attack: IAttack) => IAttack;
    health: IHealth;
    resistance: number;
}

interface IFighter extends IAttacker, IDefender {
    health: IFighterHealth;
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
    name: string;
}

class Attack implements IAttack {
    constructor(public readonly attacker: IAttacker, public defender: IDefender = null) {}
    get damage() {
        if (!this.defender) { return NaN; }
        return this.attacker.power - this.defender.resistance;
    }
}

class Fighter implements IFighter {
    protected _health: IFighterHealth;
    constructor(attacksTaken: IAttack[] = [], private readonly attacksDealt: IAttack[]) {
        this._health = new FighterHealth(this, attacksTaken);
    }
    protected get basePower() { return 2.0 };
    protected get baseResistance() { return 1.0 };
    attack(defender: IDefender): IDefender {
        const attack = new Attack(this);
        const defendedAttack = defender.defend(attack);
        this.attacksDealt.push(defendedAttack);
        return defender;
    }
    get power() {
        return this.basePower;
    }
    defend(attack: IAttack): IAttack {
        attack.defender = this;
        this.health.register(attack);
        return attack;
    }
    get resistance() {
        return this.baseResistance;
    }
    get health() {
        return this._health;
    }
    get hasAttacked() {
        return !!(this.attacksDealt && this.attacksDealt.length);
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
    constructor(private readonly initialGold: number, private readonly charges: ICharge[] = []) {}
    add(charge: ICharge) {
        if (this.gold < charge.price) throw new Error("Not enough gold!");
        this.charges.push(charge);
        return this;
    }
    get gold(): number {
        return this.initialGold - this.charges.reduce((sum, charge) => sum += charge.price, 0);
    }
}

class Player extends Fighter implements IPlayer {
    constructor(public readonly name: string, public readonly wallet: IWallet, attacksTaken: IAttack[] = [], attacksDealt: IAttack[] = []) {
        super(attacksTaken, attacksDealt);
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
    constructor(public readonly owner: IFighter, protected attacksTaken: IAttack[] = []) {
        super();
    }
    register(attack: IAttack): IFighterHealth {
        this.attacksTaken.push(attack);
        return this;
    }
    get remaining(): number {
        const damage = this.attacksTaken.reduce((sum, attack) => sum += attack.damage, 0);
        return this.INITIAL_HEALTH - damage;
    }
}

class PlayerHealth extends FighterHealth {
    constructor(public readonly owner: IPlayer, protected attacksTaken: IAttack[] = []) {
        super(owner, attacksTaken);
    }
}

interface ITurnActionResult {
    payload: any;
}

class TurnActionResult<T> implements ITurnActionResult {
    constructor(public readonly _payload: T) {

    }
    get payload(): T {
        return this._payload;
    }
    set payload(val: T) {
        this._payload;
    }
}

interface ITurnAction {
    perform(): ITurnActionResult;
}

abstract class TurnAction<T> implements ITurnAction {
    constructor(context: T) {
        this._context = context;
    }
    protected _context: T;
    protected abstract isValid(): boolean;
    abstract perform(): ITurnActionResult;
}

class AttackActionRequest {
    constructor(
        public attacker: IAttacker,
        public defender: IDefender,
    ) {}
}

interface IAttackAction extends ITurnAction {}

interface IAttackActionResult extends ITurnActionResult {
    payload: IDefender;
}

class AttackActionResult extends TurnActionResult<IDefender> implements IAttackActionResult {
    // constructor(payload: IDefender) {
    //     super(payload);
    // }
}

class AttackAction extends TurnAction<AttackActionRequest> implements IAttackAction {
    constructor(_context: AttackActionRequest) {
        super(_context);
    }
    protected isValid() {
        return !this._context.attacker.hasAttacked;
    }
    perform() {
        if (this.isValid()) {
            const damagedDefender = this._context.attacker.attack(this._context.defender);
            return new AttackActionResult(damagedDefender);
        }
    }
}

interface ITurn {
    playout: (actions?: ITurnAction[]) => ITurnActionResult[];
}

class Turn implements ITurn {
    constructor(protected readonly actions: ITurnAction[]) {}
    playout(actions?: ITurnAction[]): ITurnActionResult[] {
        const actionsToPlay = actions || this.actions;
        const results = actionsToPlay.map(action => action.perform());
        return results;
    }
}

interface IBattle {
    proceedTo: (turn: ITurn) => ITurn[];
}

class Battle implements IBattle {
    constructor(private readonly board: IGameBoard, private readonly turns: ITurn[] = []) {}

    proceedTo(turn: ITurn): ITurn[] {
        turn.playout();
        return 
    }
}

interface IGameBoard {
    add: (player: IPlayer) => IGameBoard;
}

class GameBoard {
    constructor(private readonly players: IPlayer[]) {}

    add(player: IPlayer): IGameBoard {
        this.players.push(player);
        return this;
    }
    get status(): IHealth[] {
        return this.players.map(p => p.health);
    }
}

const p1: IPlayer = new Player("Sergio", new Wallet(1000));
const p2: IPlayer = new Player("Chad", new Wallet(1000));

const board = new GameBoard([p1, p2]);
const battle = new Battle(board);
const attackAction = new AttackAction(new AttackActionRequest(p1, p2));
const nextTurn = new Turn([attackAction]);
battle.proceedTo(nextTurn);
console.log(p2.health.missing);
console.log(p2.health.remaining);
console.log(board.status);