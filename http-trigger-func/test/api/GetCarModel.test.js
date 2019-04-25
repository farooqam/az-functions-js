/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const sinon = require('sinon');
const httpStatus = require('http-status');
const api = require('../../GetCarModel/index');
const carService = require('../../shared/carService');
const apiTest = require('./apiTest');
const mocks = require('./mocks');

const should = chai.should();

const defaultRequest = apiTest.makeRequestWithParams({
    make: 'Ford',
    name: 'Edge',
});

describe('GetCarModel API', () => {
    let mockContext = null;
    let mockCarService = null;

    beforeEach(() => {
        mockContext = mocks.createMockContext();
        mockCarService = mocks.createMockCarService();
    });

    afterEach(() => {
        mockCarService.restore();
        mockCarService.verify();

        mockContext = null;
        mockCarService = null;
    });

    it('returns OK with car models', async () => {
        mockCarService.expects('getModel')
            .withArgs(defaultRequest.params.make, defaultRequest.params.name)
            .returns({ make: defaultRequest.params.make, name: defaultRequest.params.name });

        await apiTest.run(api,
            mockContext,
            defaultRequest,
            (res) => {
                res.status.should.equal(httpStatus.OK);
                res.body.should.deep.equal({ make: 'Ford', name: 'Edge' });
            });
    });

    it('returns NOT_FOUND when model and make not found', async () => {
        mockCarService.expects('getModel')
            .withArgs(sinon.match.any, sinon.match.any)
            .returns(null);

        await apiTest.run(api,
            mockContext,
            defaultRequest,
            (res) => {
                res.status.should.equal(404);
            });
    });
});
