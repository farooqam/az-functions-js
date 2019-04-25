/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const httpStatus = require('http-status');
const sinon = require('sinon');
const api = require('../../GetModelsForMake');
const apiTest = require('./apiTest');
const mocks = require('./mocks');

const should = chai.should();

const defaultRequest = {
    query: {},
};

describe('GetCarModelsForMake API', () => {
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
        mockCarService.expects('getModelsForMake')
            .withArgs('Ford')
            .returns([{ make: 'Ford', name: 'Edge', year: 2019 }]);

        const request = apiTest.makeRequestWithMake('Ford');

        await apiTest.run(api,
            mockContext,
            request,
            (res) => {
                res.status.should.equal(httpStatus.OK);
                res.body.should.deep.equal([{ make: 'Ford', name: 'Edge', year: 2019 }]);
            });
    });

    it('returns NOT_FOUND when no models for the make are found', async () => {
        mockCarService.expects('getModelsForMake')
            .withArgs(sinon.match.any)
            .returns([]);

        const request = apiTest.makeRequestWithMake('Foo');

        await apiTest.run(api,
            mockContext,
            request,
            (res) => {
                res.status.should.equal(httpStatus.NOT_FOUND);
            });
    });
});
