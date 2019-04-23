const _ = require('lodash');

const isNumber = (val) => {
    if (!val) return false;

    return !_.isNaN(_.toNumber(val));
};

module.exports = {
    isNumber,
};
