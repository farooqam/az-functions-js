const sinon = require('sinon');
const carService = require('../../shared/carService');

const createMockContext = () => ({ log: sinon.spy() });

const createMockCarService = () => sinon.mock(carService);

module.exports = {
    createMockContext,
    createMockCarService,
};
