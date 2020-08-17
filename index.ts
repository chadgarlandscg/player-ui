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

interface IMortal {
    health: IHealth;
}

interface IDefender {
    defend: (attack: IAttack) => IAttack;
    resistance: number;
}

interface IFighter extends IAttacker, IDefender, IMortal {
    health: IFighterHealth;
}

interface IWall extends IDefender {

}

interface ICharge {
    price: number;
}

interface ICurrency {
    readonly value: number;
    minus(amount: number): ICurrency;
    plus(more: ICurrency): ICurrency;
}

class Currency implements ICurrency {
    constructor(private _value: number) {

    }
    minus(amount: number) {
        const available = this._value - amount < 0 ? this._value : amount;
        this._value -= available;
        return new Currency(available);
    }
    plus(more: ICurrency) {
        this._value += more.value;
        return this;
    }
    get value(): number {
        return this._value;
    }
}

interface IGold extends ICurrency {
}

class Gold extends Currency implements IGold {}

interface IWallet {
    add(gold: IGold): IWallet;
    take(howMany: number): IGold;
    readonly can: {afford: (howMany: number) => boolean, readonly not: {afford: (howMany: number) => boolean}}
    readonly gold: number;
}

interface IBuyer {
    wallet: IWallet;
}

interface IItemStore {
    process: (request: IItemPurchaseRequest) => {buyer: IBuyer, item: IItem};
}

interface IItemPurchaseRequest {
    item: IItem;
    buyer: IBuyer;
}

interface IItem extends ICharge {
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
    add: (items: IItem[]) => IInventory;
}

class Inventory {
    items: IItem[];
}

class ItemStore implements IItemStore {
    process({buyer, item}: IItemPurchaseRequest) {
        if (buyer.wallet.can.not.afford(item.value)) {
            throw new Error(`${buyer.wallet.gold - item.value} more gold required`);
        }
        buyer.wallet.take(item.value);
        return {buyer, item};
    }
}

class Charge implements ICharge {
    constructor(public readonly price: number) {}
}

class Wallet implements IWallet {
    private _gold: IGold;
    constructor(private readonly initialGold: IGold) {
        this._gold = initialGold;
    }
    add(gold: IGold): IWallet {
        this._gold.plus(gold);
        return this;
    }
    take(howMany: number): IGold {
        return this._gold.minus(howMany);
    }
    get gold(): number {
        return this._gold.value;
    }
    get can(): {afford: (howMany: number) => boolean, not: {afford: (howMany: number) => boolean}} {
        return {
            afford: this.canAfford,
            not: {
                afford: this.cannotAfford
            }
        }
    }
    canAfford(howMany: number): boolean {
        return this._gold.value > howMany;    
    }
    cannotAfford(howMany: number) {
        return !this.canAfford(howMany);
    };
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


interface IGoldFactory { create(howMuch: number): IGold }
class GoldFactory implements IGoldFactory {
    create(howMuch: number): IGold {
        return new Gold(howMuch);
    }
}
const goldFactory = new GoldFactory();

const p1: IPlayer = new Player("Sergio", new Wallet(goldFactory.create(1000)));
const p2: IPlayer = new Player("Chad", new Wallet(goldFactory.create(1000)));

const board = new GameBoard([p1, p2]);
const battle = new Battle(board);
const attackAction = new AttackAction(new AttackActionRequest(p1, p2));
const nextTurn = new Turn([attackAction]);
battle.proceedTo(nextTurn);
console.log(p2.health.missing);
console.log(p2.health.remaining);
console.log(board.status);