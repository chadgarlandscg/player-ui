import { expect } from 'chai';

describe('True', () => {
    const ourValue = true;
    it('is true', () => {
        expect(ourValue).to.be.true;
    });
    it('is not false', () => {
        expect(ourValue).to.not.be.false;
    });
});