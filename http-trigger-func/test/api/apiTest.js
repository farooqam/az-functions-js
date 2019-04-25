const run = async (api, context, request, verifyCb) => {
    await api(context, request);
    verifyCb(context.res);
};

const makeRequestWithParams = params => ({
    params,
});

const makeRequestWithTake = takeCount => ({
    query: {
        take: takeCount,
    },
});

const makeRequestWithMake = make => ({
    params: {
        make,
    },
});

module.exports = {
    run,
    makeRequestWithParams,
    makeRequestWithTake,
    makeRequestWithMake,
};
