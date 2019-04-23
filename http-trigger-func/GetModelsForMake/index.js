/* eslint-disable func-names */
const httpStatus = require('http-status');
const carService = require('../shared/carService');

module.exports = async function (functionContext, req) {
    functionContext.log('JavaScript HTTP trigger function processed a request.');
    const context = functionContext;

    const { make } = req.params;

    const models = carService.getModelsForMake(make);

    if (models.length === 0) {
        context.res = {
            status: httpStatus.NOT_FOUND,
        };

        return;
    }

    context.res = {
        status: httpStatus.OK,
        body: models,
    };
};
