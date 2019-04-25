/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const carService = require('../../shared/carService');

const should = chai.should();

describe('carService', () => {
    describe('getModels', () => {
        it('returns all models', () => {
            const models = carService.getModels();
            models.length.should.equal(4);
        });
    });

    describe('getModel', () => {
        it('returns one model', () => {
            const model = carService.getModel('ford', 'edge');
            model.should.deep.equal({ make: 'Ford', name: 'Edge', year: 2019 });
        });

        it('is case insensitive', () => {
            const model = carService.getModel('FORD', 'EDGE');
            model.should.deep.equal({ make: 'Ford', name: 'Edge', year: 2019 });
        });
    });

    describe('getModelsForMake', () => {
        it('returns all models for the make', () => {
            const models = carService.getModelsForMake('Ford');
            models.length.should.equal(2);
        });

        it('is case insensitive', () => {
            const models = carService.getModelsForMake('FORD');
            models.length.should.equal(2);
        });
    });
});
