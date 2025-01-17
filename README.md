 ## Blockchain Implementation

This repository contains a basic implementation of a blockchain and cryptocurrency system using JavaScript. The system supports the creation of transactions, mining blocks, and validating the chain. It is designed for educational purposes to understand the core concepts of blockchain technology.



 Features

- **Genesis Block Creation**: Automatically creates the initial block in the blockchain.
- **Transaction Management**:
  - Create transactions with payer and payee addresses.
  - Validate transactions to ensure sufficient balance.
- **Mining Blocks**:
  - Uses Proof-of-Work (PoW) for block mining with adjustable difficulty.
  - Miner rewards for successfully mining blocks.
- **Balance Tracking**: Track the balance of any address based on transaction history.
- **Chain Validation**: Ensure the blockchain's integrity with a validation function.
- **Airdrop Support**: Distribute an initial amount of cryptocurrency to registered addresses.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blockchain-implementation.git
   ```

2. Navigate to the project directory:
   ```bash
   cd blockchain-implementation
   ```

3. Install dependencies (Node.js required):
   ```bash
   npm install
   ```

---

## Usage

1. Run the main script:
   ```bash
   node index.js
   ```

2. Example Output:
   - Starting with an airdrop.
   - Mining pending transactions.
   - Displaying balances of all registered addresses.

3. Modify the script to:
   - Add new transactions.
   - Adjust mining difficulty or reward.
   - Experiment with chain validation.

---

## Code Overview

### `Transaction`
Represents a transaction with a timestamp, payer address, payee address, and amount.

### `Block`
Represents a block containing transactions, a timestamp, and a hash linking it to the previous block. Implements mining logic for Proof-of-Work.

### `Blockchain`
Manages the chain of blocks, pending transactions, and mining rewards. Includes methods to:
- Validate transactions.
- Distribute initial balances.
- Mine pending transactions.
- Validate the integrity of the blockchain.

---

## Example

### Airdrop Example:
```javascript
const registeredAddresses = ['wallet-Alice', 'wallet-Block', 'wallet-Charlie', 'miner49r-wallet'];
blockchain.airdropToAddresses(registeredAddresses, 100);
blockchain.minePendingTransactions('miner49r-wallet');
```

### Create Transactions:
```javascript
blockchain.createTransaction(new Transaction(Date.now(), 'wallet-Alice', 'wallet-Block', 50));
blockchain.createTransaction(new Transaction(Date.now(), 'wallet-Block', 'wallet-Alice', 25));
blockchain.minePendingTransactions('miner49r-wallet');
```

### Check Balances:
```javascript
console.log(`Balance of Alice: ${blockchain.getBalanceOfAddress('wallet-Alice')}`);
```

---

## Roadmap
- Add support for digital signatures for transaction authentication.
- Implement a peer-to-peer network for decentralized mining.
- Optimize block structure for scalability.

---

## License
This project is licensed under the MIT License.

---

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to improve the code or add new features.

---

## Contact
For questions or suggestions, please contact:
- **Your Name**: [your.email@example.com](mailto:your.email@example.com)
- GitHub: [your-username](https://github.com/your-username)

