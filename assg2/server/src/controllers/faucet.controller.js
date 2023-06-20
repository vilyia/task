const { ethers } = require('ethers');
const EthereumAddress = require('ethereum-address');
const ABIJSON = require('../constants/abi.json');
const catchAsync = require('../utils/catchAsync');
const config = require('../config/config');
const { ethScanLink } = require('../constants/link');


const provider = new ethers.providers.JsonRpcProvider(config.apiUrl);

const contract = new ethers.Contract(config.contractAddress, ABIJSON, provider);

const transfer = catchAsync(async (req, res) => {
    try {
        const wallet = new ethers.Wallet(config.privateKey, provider);
        const tx = await contract.connect(wallet).faucet();
        await tx.wait();
        const link = `${ethScanLink}/${tx.hash}`;
        res.json({ status: true, message: link });
    } catch (error) {
        res.status(500).send('An error occurred.');
    }
});

const transferTo = catchAsync(async (req, res) => {
    try {
        const wallet = new ethers.Wallet(config.privateKey, provider);
        const to = req.params.wallet;
        if (!EthereumAddress.isAddress(to)) {
            return res.status(400).json({ status: false, message: 'Invalid Ethereum wallet address.' });
        }
        const tx = await contract.connect(wallet).transfer(to);

        await tx.wait();
        const link = `${ethScanLink}/${tx.hash}`;
        res.json({ status: true, message: link });
    } catch (error) {
        res.status(500).send('An error occurred.');
    }
});

module.exports = {
    transfer,
    transferTo,
};
