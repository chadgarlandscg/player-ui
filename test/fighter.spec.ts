import { expect } from 'chai';
import * as moq from 'typemoq';

import { Fighter, Attack, IAttack, IDefender } from '../index'

describe('Fighter', () => {
    it('returns attacked defender after attacking', () => {
        const attacker = new Fighter();
        const defenderMock: moq.IMock<IDefender> = moq.Mock.ofType<IDefender>();
        const attackMock: moq.IMock<IAttack> = moq.Mock.ofType<IAttack>();
        defenderMock
            .setup(d => d.defend(moq.It.isObjectWith<IAttack>({attacker})))
            .returns(() => attackMock.object);
        const defender = attacker.attack(defenderMock.object);
        expect(defender).to.equal(defenderMock.object);
    });
    it('has attacked after attacking', () => {
        const attacker = new Fighter();
        const defenderMock: moq.IMock<IDefender> = moq.Mock.ofType<IDefender>();
        const attackMock: moq.IMock<IAttack> = moq.Mock.ofType<IAttack>();
        defenderMock
            .setup(d => d.defend(moq.It.isObjectWith<IAttack>({attacker})))
            .returns(() => attackMock.object);
        const _ = attacker.attack(defenderMock.object);
        expect(attacker.hasAttacked).to.be.true;
    });
    it('has health reduced by damage of attack after defending', () => {
        const defender = new Fighter();
        const attackMock: moq.IMock<IAttack> = moq.Mock.ofType<IAttack>();
        attackMock.setup(a => a.damage).returns(() => 10);
        const _ = defender.defend(attackMock.object);
        expect(defender.health.missing).to.equal(10);
    });
});