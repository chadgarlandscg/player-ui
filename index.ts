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

interface IShopper {
    inventory: IInventory;
    wallet: IWallet;
}

interface IShop {
    accept: (currency: ICurrency) => {
        inExchangeFor: <I extends IItem>(itemType: ItemType) => I;
    };
    inquirePrice(itemType: string): number;
}

enum WeaponType {
    Stick = "Stick",
    Sword = "Sword",
}

enum ArmorType {
    Shirt = "Shirt",
    Shield = "Shield",
}

type ItemType = WeaponType | ArmorType;

interface IWeapon extends IItem {
    power: number;
}

interface IItem {
    price: number;
    type: ItemType;
}

abstract class Item implements IItem {
    constructor(public readonly price: number, public readonly type: ItemType) {}
}

abstract class Weapon extends Item implements IWeapon {
    constructor(public readonly power, public readonly price: number, public readonly type: ItemType) {
        super(price, type);
    }
}

class Stick extends Weapon implements IWeapon {
    constructor() {
        super(3, 1, WeaponType.Stick);
    }
}

class Sword extends Weapon implements IWeapon {
    constructor() {
        super(10, 100, WeaponType.Sword);
    }
}

interface IPlayer extends IFighter, IShopper {
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
    add: (item: IItem) => IInventory;
    items: IItem[];
}

class Inventory implements IInventory {
    constructor(public readonly items: IItem[] = []) {}
    add(item: IItem) {
        this.items.push(item);
        return this;
    }
}

interface IItemFactory {
    create<I extends IItem>(itemType: ItemType): I;
}

class ItemFactory implements IItemFactory {
    constructor(private readonly _weaponFactory: IWeaponFactory) {}
    create<I extends IItem>(itemType: ItemType): I {
        if (Object.values(WeaponType).find(t => t === itemType)) {
            return this._weaponFactory.create<I>(itemType);
        }
    }
}

interface IWeaponFactory {
    create<W extends IItem>(type: ItemType): W;
}

class WeaponFactory implements IWeaponFactory {
    create<W extends IItem>(type: WeaponType): W {
        switch(type) {
            case(WeaponType.Stick): return (new Stick() as unknown) as W;
            case(WeaponType.Sword): return (new Sword() as unknown) as W;
            default: return null;
        }
    }
}

class Shop implements IShop {
    private _customerMoney: ICurrency;
    constructor(private readonly _itemFactory: IItemFactory) {
        this.provideItem = this.provideItem.bind(this);
    }
    accept(money: ICurrency) {
        this._customerMoney = this._customerMoney?.plus(money) || money;
        return {
            inExchangeFor: this.provideItem
        }
    }
    provideItem<I extends IItem>(itemType: ItemType) {
        const item = this._itemFactory.create<I>(itemType);
        if (this._customerMoney.value < item.price) {
            throw new Error(`${this._customerMoney.value - item.price} more gold required`);
        }
        return item;
    }
    inquirePrice(itemType: ItemType) {
        const item = this._itemFactory.create<IItem>(itemType);
        return item.price;
    }
}

class Wallet implements IWallet {
    private _gold: IGold;
    constructor(private readonly initialGold: IGold) {
        this._gold = initialGold;
        this.canAfford = this.canAfford.bind(this);
        this.cannotAfford = this.cannotAfford.bind(this);
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
    constructor(public readonly name: string, public readonly inventory: IInventory, public readonly wallet: IWallet, attacksTaken: IAttack[] = [], attacksDealt: IAttack[] = []) {
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
    tryToPerform(): ITurnActionResult;
}

abstract class TurnAction<T> implements ITurnAction {
    constructor(context: T) {
        this._context = context;
    }
    protected _context: T;
    protected abstract isValid(): boolean;
    tryToPerform(): ITurnActionResult {
        if (this.isValid()) {
            return this.perform();
        }
    }
    protected abstract perform(): ITurnActionResult;
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
    protected isValid() {
        return !this._context.attacker.hasAttacked;
    }
    protected perform() {
        const damagedDefender = this._context.attacker.attack(this._context.defender);
        return new AttackActionResult(damagedDefender);
    }
}

interface IItemPurchaseAction extends ITurnAction {}

interface IItemPurchaseResultPayload {
    shopper: IShopper;
    shop: IShop;
}

interface IItemPurchaseResult extends ITurnActionResult {
    payload: IItemPurchaseResultPayload;
}

class ItemPurchaseResult extends TurnActionResult<IItemPurchaseResultPayload> implements IItemPurchaseResult {
    // constructor(payload: IDefender) {
    //     super(payload);
    // }
}

class ItemPurchaseRequest<I extends Item> {
    constructor(
        public itemType: ItemType,
        public shopper: IShopper,
        public shop: IShop,
    ) {}
}

class ItemPurchaseAction<I extends IItem> extends TurnAction<ItemPurchaseRequest<I>> implements IItemPurchaseAction {
    protected isValid() {
        const itemPrice = this._context.shop.inquirePrice(this._context.itemType);
        return !!this._context.shopper.wallet.can.afford(itemPrice);
    }
    perform() {
        const itemPrice = this._context.shop.inquirePrice(this._context.itemType);
        const money = this._context.shopper.wallet.take(itemPrice);
        const item = this._context.shop.accept(money).inExchangeFor(this._context.itemType);
        this._context.shopper.inventory.add(item);
        return new ItemPurchaseResult({shopper: this._context.shopper, shop: this._context.shop});
    }
}

interface ITurn {
    end: (actions?: ITurnAction[]) => ITurn;
    results: ITurnActionResult[];
}

class Turn implements ITurn {
    constructor(protected readonly actions: ITurnAction[] = [], public readonly results: ITurnActionResult[] = []) {}
    add(newActions: ITurnAction[] = []): ITurn {
        if (this.results.length) {
            throw new Error("Turn already played!");
        }
        this.actions.concat(newActions);
        return this;
    }
    end(newActions: ITurnAction[] = []): ITurn {
        this.add(newActions);
        const results = this.actions.map(action => action.tryToPerform());
        this.results.concat(results);
        return this;
    }
}

interface IBattle {
    playout: (turn: ITurn) => IBattle;
    readonly board: IGameBoard;
}

class Battle implements IBattle {
    constructor(public readonly board: IGameBoard, private readonly turns: ITurn[] = []) {}

    playout(turn: ITurn): IBattle {
        const completedTurn = turn.end();
        this.turns.push(completedTurn);
        return this;
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

// FACTORIES

interface IInventoryFactory { create(): IInventory }
class InventoryFactory implements IInventoryFactory {
    create(): IInventory {
        return new Inventory();
    }
}

interface IGoldFactory { create(howMuch: number): IGold }
class GoldFactory implements IGoldFactory {
    create(howMuch: number): IGold {
        return new Gold(howMuch);
    }
}

interface IPlayerFactory { create(name: string): IPlayer }
class PlayerFactory implements IPlayerFactory {
    constructor(private readonly _inventoryFactory: IInventoryFactory, private readonly _walletFactory: IWalletFactory) {}
    create(name: string): IPlayer {
        return new Player(name, this._inventoryFactory.create(), this._walletFactory.create());
    }
}

interface IWalletFactory { create(): IWallet }
class WalletFactory implements IWalletFactory {
    constructor(private readonly _goldFactory: IGoldFactory) {}
    create(): IWallet {
        return new Wallet(this._goldFactory.create(1000));
    }
}

interface ITurnFactory { create(actions: ITurnAction[]): ITurn }
class TurnFactory implements ITurnFactory {
    create(actions: ITurnAction[]): ITurn {
        return new Turn(actions);
    }
}

const weaponFactory = new WeaponFactory();
const itemFactory = new ItemFactory(weaponFactory);
const inventoryFactory = new InventoryFactory();

const goldFactory = new GoldFactory();
const walletFactory = new WalletFactory(goldFactory);
const playerFactory = new PlayerFactory(inventoryFactory, walletFactory);
const p1 = playerFactory.create("Sergio");
const p2 = playerFactory.create("Chad");

const shop = new Shop(itemFactory);

// const p1: IPlayer = new Player("Sergio", new Wallet(goldFactory.create(1000)));
// const p2: IPlayer = new Player("Chad", new Wallet(goldFactory.create(1000)));

const board = new GameBoard([p1, p2]);
const battle = new Battle(board);
const itemPurchaseAction = new ItemPurchaseAction(new ItemPurchaseRequest(WeaponType.Stick, p1, shop));
const attackAction = new AttackAction(new AttackActionRequest(p1, p2));
const nextTurn = new Turn([itemPurchaseAction, attackAction]);
const continuedBattle = battle.playout(nextTurn);
console.log(p2.health.missing);
console.log(p2.health.remaining);
console.log(board.status);