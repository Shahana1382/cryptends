'use strict';
const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
const myKey = ec.keyFromPrivate(
  '9d237eb528d5b94175cf38b456385dad5174f68401d5d260aa4c4573e264a755'
);

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
const cryptCoin = new Blockchain();

// Mine first block
cryptCoin.minePendingTransactions(myWalletAddress);

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 10);
tx1.signTransaction(myKey);
cryptCoin.addTransaction(tx1);

// Mine block
cryptCoin.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
cryptCoin.addTransaction(tx2);

// Mine block
cryptCoin.minePendingTransactions(myWalletAddress);

console.log();

console.log(
  `Balance of crypt-ends is ${cryptCoin.getBalanceOfAddress(myWalletAddress)}`
);

// Uncomment this line if you want to test tampering with the chain
// savjeeCoin.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', cryptCoin.isChainValid() ? 'Yes' : 'No');
