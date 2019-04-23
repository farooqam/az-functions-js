/* eslint-disable func-names */
const httpStatus = require('http-status');
const carService = require('../shared/carService');

module.exports = async function (functionContext, req) {
    functionContext.log('JavaScript HTTP trigger function processed a request.');
    const context = functionContext;

    const { make, name } = req.params;

    const model = carService.getModel(make, name);

    if (!model) {
        context.res = {
            status: httpStatus.NOT_FOUND,
        };

        return;
    }

    context.res = {
        status: httpStatus.OK,
        body: model,
    };
};
