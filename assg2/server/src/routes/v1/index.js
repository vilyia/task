const express = require('express');
const faucetRoute = require('./faucet.route');
const { faucet } = require('../../constants/routes');

const router = express.Router();

const defaultRoutes = [
    {
        path: faucet,
        route: faucetRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
