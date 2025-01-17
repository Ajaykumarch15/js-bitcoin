const crypto = require('crypto');

class Transaction {
    constructor(timestamp, payerAddress, payeeAddress, amount) {
        this.timestamp = timestamp;
        this.payerAddress = payerAddress;
        this.payeeAddress = payeeAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto
            .createHash('sha256')
            .update(
                this.previousHash +
                this.timestamp +
                JSON.stringify(this.transactions) +
                this.nonce
            )
            .digest('hex');
    }

    mineBlock(difficulty) {
        const target = Array(difficulty + 1).join('0');
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(`Block mined: ${this.hash}`);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.difficulty = 3;
        this.miningReward = 50;
    }

    createGenesisBlock() {
        return new Block(Date.now(), [new Transaction(Date.now(), null, null, 0)], '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(minerAddress) {
        const validTransactions = this.pendingTransactions.filter(txn =>
            txn.payerAddress === null || this.isTransactionValid(txn)
        );

        if (validTransactions.length === 0) {
            console.log('No transactions to mine.');
            return;
        }

        const block = new Block(Date.now(), validTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(Date.now(), null, minerAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        if (transaction.payerAddress !== null && !this.isTransactionValid(transaction)) {
            console.log('Invalid transaction: Insufficient balance.');
            return;
        }
        this.pendingTransactions.push(transaction);
    }

    isTransactionValid(transaction) {
        const balance = this.getBalanceOfAddress(transaction.payerAddress);
        return balance >= transaction.amount;
    }

    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const txn of block.transactions) {
                if (txn.payerAddress === address) {
                    balance -= txn.amount;
                }
                if (txn.payeeAddress === address) {
                    balance += txn.amount;
                }
            }
        }
        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    airdropToAddresses(addresses, amount) {
        for (const address of addresses) {
            this.createTransaction(new Transaction(Date.now(), null, address, amount));
        }
    }
}

// Example usage
const blockchain = new Blockchain();
const registeredAddresses = ['wallet-Alice', 'wallet-Block', 'wallet-Charlie', 'miner49r-wallet'];

blockchain.airdropToAddresses(registeredAddresses, 100);
blockchain.minePendingTransactions('miner49r-wallet');

console.log(`Balance of Alice: ${blockchain.getBalanceOfAddress('wallet-Alice')}`);
console.log(`Balance of Block: ${blockchain.getBalanceOfAddress('wallet-Block')}`);
console.log(`Balance of miner49r-wallet: ${blockchain.getBalanceOfAddress('miner49r-wallet')}`);

blockchain.createTransaction(new Transaction(Date.now(), 'wallet-Alice', 'wallet-Block', 50));
blockchain.createTransaction(new Transaction(Date.now(), 'wallet-Block', 'wallet-Alice', 25));

console.log('Starting mining...');
blockchain.minePendingTransactions('miner49r-wallet');

console.log(`Balance of Alice: ${blockchain.getBalanceOfAddress('wallet-Alice')}`);
console.log(`Balance of Block: ${blockchain.getBalanceOfAddress('wallet-Block')}`);
console.log(`Balance of miner49r-wallet: ${blockchain.getBalanceOfAddress('miner49r-wallet')}`);
