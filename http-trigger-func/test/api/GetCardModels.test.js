/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const httpStatus = require('http-status');
const api = require('../../GetCarModels');
const apiTest = require('./apiTest');
const mocks = require('./mocks');

const should = chai.should();

const defaultRequest = {
    query: {},
};

describe('GetCarModels API', () => {
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
        mockCarService.expects('getModels')
            .returns([{ make: 'Ford', name: 'Edge', year: 2019 }]);

        await apiTest.run(api,
            mockContext,
            defaultRequest,
            (res) => {
                res.status.should.equal(httpStatus.OK);
                res.body.should.deep.equal([{ make: 'Ford', name: 'Edge', year: 2019 }]);
            });
    });

    it('returns BAD_REQUEST when take query param is not a number', async () => {
        const badRequest = {
            query: {
                take: 'foo',
            },
        };

        await apiTest.run(api,
            mockContext,
            badRequest,
            (res) => {
                res.status.should.equal(httpStatus.BAD_REQUEST);
            });
    });

    it('returns the number of models given by take query param', async () => {
        mockCarService.expects('getModels')
            .returns([
                { make: 'Ford', name: 'Edge', year: 2019 },
                { make: 'Ford', name: 'Edge', year: 2019 },
                { make: 'Ford', name: 'Edge', year: 2019 },
            ]);

        const request = apiTest.makeRequestWithTake(2);

        await apiTest.run(api,
            mockContext,
            request,
            (res) => {
                res.status.should.equal(httpStatus.OK);
                res.body.length.should.equal(2);
            });
    });

    it('returns the number of models given by the QueryOptions__MaxResultSize setting when take query param missing', async () => {
        mockCarService.expects('getModels')
            .returns([
                { make: 'Ford', name: 'Edge', year: 2019 },
                { make: 'Ford', name: 'Edge', year: 2019 },
                { make: 'Ford', name: 'Edge', year: 2019 },
                { make: 'Ford', name: 'Edge', year: 2019 },
                { make: 'Ford', name: 'Edge', year: 2019 },
            ]);

        process.env.QueryOptions__MaxResultSize = 3;

        await apiTest.run(api,
            mockContext,
            defaultRequest,
            (res) => {
                res.status.should.equal(httpStatus.OK);
                res.body.length.should.equal(3);
            });
    });

    it('returns the number of models given by the QueryOptions__MaxResultSize setting when take query param larger than QueryOptions__MaxResultSize', async () => {
        mockCarService.expects('getModels')
            .returns([
                { make: 'Ford', name: 'Edge', year: 2019 },
                { make: 'Ford', name: 'Edge', year: 2019 },
                { make: 'Ford', name: 'Edge', year: 2019 },
                { make: 'Ford', name: 'Edge', year: 2019 },
                { make: 'Ford', name: 'Edge', year: 2019 },
            ]);

        process.env.QueryOptions__MaxResultSize = 3;

        const request = apiTest.makeRequestWithTake(4);

        await apiTest.run(api,
            mockContext,
            request,
            (res) => {
                res.status.should.equal(httpStatus.OK);
                res.body.length.should.equal(3);
            });
    });
});
