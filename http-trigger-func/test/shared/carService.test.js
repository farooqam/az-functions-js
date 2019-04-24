/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const carService = require('../../shared/carService');

const should = chai.should();

describe('Car Service tests', () => {
    describe('Get Models', () => {
        it('Returns all models', () => {
            const models = carService.getModels();
            models.length.should.equal(4);
        });
    });

    describe('Get Model', () => {
        it('Returns one model', () => {
            const model = carService.getModel('ford', 'edge');
            model.make.should.equal('Ford');
            model.name.should.equal('Edge');
            model.year.should.equal(2019);
        });
    });

    describe('Get Models for Make', () => {
        it('Returns all models for the make', () => {
            const models = carService.getModelsForMake('Ford');
            models.length.should.equal(2);
        });
    });
});
