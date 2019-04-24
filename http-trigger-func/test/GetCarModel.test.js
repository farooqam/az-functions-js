/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const sinon = require('sinon');
const httpStatus = require('http-status');
const api = require('../GetCarModel/index');
const carService = require('../shared/carService');

const should = chai.should();

const context = {
    log: sinon.spy(),
};

describe('GetCarModel', () => {
    it('returns OK with car models', async () => {
        const request = {
            params: {
                make: 'Ford',
                name: 'Edge',
            },
        };

        const carServiceMock = sinon.mock(carService);

        carServiceMock.expects('getModel')
            .withArgs(request.params.make, request.params.name)
            .returns({ make: request.params.make, name: request.params.name });

        await api(context, request);

        context.res.status.should.equal(httpStatus.OK);
        context.res.body.should.deep.equal({ make: 'Ford', name: 'Edge' });

        carServiceMock.restore();
        carServiceMock.verify();
    });
});
