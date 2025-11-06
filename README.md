# Encrypted Identity Authentication

A fully homomorphic encryption (FHE) based identity authentication system built with FHEVM, Hardhat, and Next.js.

## Overview

This project implements an encrypted identity authentication system where users can:
1. Register their identity (encrypted locally)
2. Verify their identity without exposing plaintext
3. All operations use FHE encryption for privacy

## Features

- **Encrypted Identity Registration**: Users register their identity using FHE encryption
- **Privacy-Preserving Verification**: Identity verification without exposing plaintext
- **Rainbow Wallet Integration**: Modern wallet connection using RainbowKit
- **FHEVM Integration**: Full support for FHE operations on blockchain
- **Beautiful UI**: Modern, client-ready interface

## Prerequisites

- Node.js >= 20
- npm >= 7.0.0
- A Web3 wallet (Rainbow recommended)

## Installation

### 1. Install Backend Dependencies

```bash
cd pro15
npm install
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Set Up Environment Variables

```bash
# In the root directory (pro15)
npx hardhat vars set MNEMONIC
npx hardhat vars set INFURA_API_KEY
npx hardhat vars set ETHERSCAN_API_KEY  # Optional
```

### 4. Copy FHEVM Internal Files

The FHEVM internal files need to be copied from the template. Copy the following directories from `fhevm-hardhat-template旧/frontend/fhevm/internal/` to `pro15/frontend/fhevm/internal/`:

- `fhevm.ts`
- `constants.ts`
- `fhevmTypes.ts`
- `PublicKeyStorage.ts`
- `RelayerSDKLoader.ts`
- `mock/fhevmMock.ts`

Also copy:
- `fhevm/FhevmDecryptionSignature.ts` from the template

## Usage

### Compile Contracts

```bash
npm run compile
```

### Run Tests

```bash
# Local tests
npm run test

# Sepolia tests (requires deployment)
npm run test:sepolia
```

### Deploy Contracts

```bash
# Deploy to local network
npx hardhat node  # In one terminal
npx hardhat deploy --network localhost  # In another terminal

# Deploy to Sepolia Testnet
npx hardhat deploy --network sepolia
```

### Deploy Frontend to Vercel

The frontend is configured for Vercel deployment with automatic builds.

#### Prerequisites
1. [Create a Vercel account](https://vercel.com/signup)
2. [Get a WalletConnect Project ID](https://cloud.walletconnect.com/)

#### Deployment Steps
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Next.js project
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: Your WalletConnect Project ID

#### Vercel Configuration
The `frontend/vercel.json` file contains:
- Custom build command that ensures ABI files are generated
- Required CORS headers for FHEVM operations
- Next.js framework configuration

### Network Switching

The frontend supports both **Hardhat Local** (Chain ID: 31337) and **Sepolia Testnet** (Chain ID: 11155111).

- **Hardhat Local**: For local development with Hardhat node
- **Sepolia**: For testing on public testnet

You can switch networks using the Rainbow wallet connection button in the top right corner. The UI will automatically detect which network you're connected to and show the appropriate contract address.

### Run Frontend

```bash
cd frontend

# Generate ABI files
npm run genabi

# Start development server
npm run dev
```

## Project Structure

```
pro15/
├── contracts/
│   └── EncryptedIdentityAuth.sol    # Main contract
├── test/
│   ├── EncryptedIdentityAuth.ts     # Local tests
│   └── EncryptedIdentityAuthSepolia.ts  # Sepolia tests
├── deploy/
│   └── deploy.ts                    # Deployment script
├── tasks/
│   └── EncryptedIdentityAuth.ts     # Hardhat tasks
├── frontend/
│   ├── app/
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Main page
│   │   └── providers.tsx           # Rainbow wallet providers
│   ├── components/
│   │   └── IdentityAuth.tsx         # Main UI component
│   ├── hooks/
│   │   ├── useEthersSigner.ts       # Ethers signer hook
│   │   └── useZamaInstance.ts       # FHEVM instance hook
│   └── fhevm/                       # FHEVM integration
└── README.md
```

## Contract Functions

### `register(externalEuint32 encryptedIdentity, bytes calldata inputProof)`
Registers an encrypted user identity. Can only be called once per address.

### `verify(externalEuint32 encryptedIdentity, bytes calldata inputProof) returns (ebool)`
Verifies if the provided encrypted identity matches the stored one. Returns encrypted boolean result.

### `getEncryptedIdentity(address user) returns (euint32)`
Gets the encrypted identity for a user (for debugging).

## Testing

The test suite includes:
- Registration tests
- Verification tests (correct and incorrect identities)
- Double registration prevention
- Unregistered user verification prevention

## Frontend Features

- **Rainbow Wallet Connection**: Connect using Rainbow wallet in the top right
- **Identity Registration**: Register your encrypted identity
- **Identity Verification**: Verify your identity without exposing plaintext
- **Real-time Status**: See registration and verification status
- **Encrypted Data Display**: View encrypted handles and decrypted results

## Customization

### Logo

Replace the logo files:
- `frontend/app/icon.png` - Browser favicon
- `frontend/public/logo.svg` - Main logo

### WalletConnect Project ID

Set `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` in your environment or update `frontend/app/providers.tsx`.

## License

BSD-3-Clause-Clear

## Support

For issues and questions:
- Check FHEVM documentation: https://docs.zama.ai/fhevm
- Zama Discord: https://discord.gg/zama

## Security

This project uses Fully Homomorphic Encryption (FHE) to ensure that user identities remain private throughout the authentication process. The encryption is performed client-side before any data is sent to the blockchain.

## Troubleshooting

### Common Issues

1. **FHEVM Node Connection**: Ensure your local Hardhat node is running with FHEVM support
2. **Wallet Connection**: Make sure your wallet is connected to the correct network
3. **Gas Estimation**: FHE operations may require higher gas limits than standard transactions

