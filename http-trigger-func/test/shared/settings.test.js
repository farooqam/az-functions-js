/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const settings = require('../../shared/settings');

const should = chai.should();

describe('settings', () => {
    it('returns the setting', () => {
        process.env.FOO = 'bar';
        settings('FOO').should.equal('bar');
    });

    it('return null when the setting does not exist', () => {
        (typeof settings('BLAH')).should.equal('undefined');
    });
});
