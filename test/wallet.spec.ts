import { expect } from 'chai';

import { WalletFactory, GoldFactory } from '../index'

describe('Wallet', () => {
    const goldFactory = new GoldFactory();
    const walletFactory = new WalletFactory(goldFactory, 0);
    it('starts with 0 gold', () => {
        const wallet = walletFactory.create();
        expect(wallet.gold).to.equal(0);
    });
    it('has N gold when N gold is added', () => {
        const wallet = walletFactory.create();
        const tenGold = goldFactory.create(10);
        wallet.add(tenGold);
        expect(wallet.gold).to.equal(10);
    });
    it('returns gold taken when there is enough to take', () => {
        const wallet = walletFactory.create();
        const tenGold = goldFactory.create(10);
        wallet.add(tenGold);
        const goldTaken = wallet.take(3);
        expect(goldTaken.value).to.equal(3);
    });
    it('loses gold taken when there is enough to take', () => {
        const wallet = walletFactory.create();
        const tenGold = goldFactory.create(10);
        wallet.add(tenGold);
        const _ = wallet.take(3);
        expect(wallet.gold).to.equal(7);
    });
    it('returns gold remaining when there is not enough to take', () => {
        const wallet = walletFactory.create();
        const tenGold = goldFactory.create(10);
        wallet.add(tenGold);
        const goldTaken = wallet.take(11);
        expect(goldTaken.value).to.equal(10);
    });
    it('loses gold remaining when there is not enough to take', () => {
        const wallet = walletFactory.create();
        const tenGold = goldFactory.create(10);
        wallet.add(tenGold);
        const _ = wallet.take(11);
        expect(wallet.gold).to.equal(0);
    });
});