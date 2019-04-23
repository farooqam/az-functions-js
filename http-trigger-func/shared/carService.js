const _ = require('lodash');

const models = [
    { make: 'Ford', name: 'Edge', year: 2019 },
    { make: 'Ford', name: 'Explorer', year: 2019 },
    { make: 'BMW', name: 'X7', year: 2019 },
    { make: 'Audi', name: 'S7', year: 2019 },
];

const getModels = () => models;

const getModelsForMake = (make) => {
    if (!make) {
        throw new Error('A make is required.');
    }

    return _.filter(models, m => (m.make.toLowerCase() === make.toLowerCase()));
};

const getModel = (make, name) => {
    if (!make || !name) {
        throw new Error('A make and model name is required.');
    }

    return _.find(models, m => (m.make.toLowerCase() === make.toLowerCase())
        && (m.name.toLowerCase() === name.toLowerCase()));
};

module.exports = {
    getModels,
    getModelsForMake,
    getModel,
};
