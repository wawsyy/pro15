# Setup Instructions

## Important: Copy FHEVM Internal Files

Before running the frontend, you need to copy the FHEVM internal files from the template:

### Copy these files/directories:

1. From `fhevm-hardhat-template旧/frontend/fhevm/internal/` to `pro15/frontend/fhevm/internal/`:
   - `fhevm.ts`
   - `constants.ts`
   - `fhevmTypes.ts`
   - `PublicKeyStorage.ts`
   - `RelayerSDKLoader.ts`
   - `mock/fhevmMock.ts`

### Quick Copy Command (Linux/Mac):

```bash
# From the demo15 directory
cp -r "fhevm-hardhat-template旧/frontend/fhevm/internal" "pro15/frontend/fhevm/"
```

### Windows PowerShell:

```powershell
# From the demo15 directory
Copy-Item -Path "fhevm-hardhat-template旧\frontend\fhevm\internal" -Destination "pro15\frontend\fhevm\" -Recurse
```

## Logo Files

Create or copy logo files:
- `frontend/app/icon.png` - Browser favicon (recommended: 32x32 or 64x64 PNG)
- `frontend/public/logo.svg` - Main logo (SVG format recommended)

You can use any logo design tool or find free icons online.

## WalletConnect Project ID

For production, get a WalletConnect Project ID from https://cloud.walletconnect.com and set it as an environment variable:

```bash
# In frontend directory
echo "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here" > .env.local
```

For development, the default placeholder will work but may have limitations.

## Next Steps

1. Copy the FHEVM internal files (see above)
2. Install dependencies (see main README.md)
3. Deploy contracts
4. Generate ABI files
5. Run the frontend

See README.md for detailed instructions.

