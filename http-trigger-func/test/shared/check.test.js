/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const check = require('../../shared/check');

const should = chai.should();

describe('isNumber', () => {
    it('when given number returns true', () => {
        check.isNumber(100).should.equal(true);
    });

    it('when given string that is a number returns true', () => {
        check.isNumber('100').should.equal(true);
    });

    it('when given string that is not a number returns false', () => {
        check.isNumber('foo').should.equal(false);
    });
});
