/* eslint-disable func-names */
const _ = require('lodash');
const httpStatus = require('http-status');
const check = require('./check');
const carService = require('./carService');

module.exports = async function (functionContext, req) {
    functionContext.log('JavaScript HTTP trigger function processed a request.');
    const context = functionContext;

    const { take } = req.query;

    if (take && !check.isNumber(take)) {
        context.res = {
            status: httpStatus.BAD_REQUEST,
            body: '[take] query parameter must be a number.',
        };

        return;
    }

    let resultSize = process.env.QueryOptions__MaxResultSize || 100;

    if (take && (take < resultSize)) {
        resultSize = take;
    }

    const models = _.take(carService.getModels(), resultSize);

    context.res = {
        status: httpStatus.OK,
        body: models,
    };
};
