const express = require('express');
const faucetController = require('../../controllers/faucet.controller');
const { transferTo, transfer } = require('../../constants/routes');

const router = express.Router();

router.route(transfer).get(faucetController.transfer);
router.route(transferTo).get(faucetController.transferTo);

module.exports = router;
