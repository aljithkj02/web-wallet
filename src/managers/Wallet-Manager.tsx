import { Keypair } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { encodeBase58, HDNodeWallet, Wallet } from "ethers";
import * as nacl from "tweetnacl";

class WalletManager {
    static instance: WalletManager;

    private constructor() {}

    static getInstance() {
        if (!this.instance) {
            this.instance = new WalletManager();
        }
        return this.instance;
    }

    async generateEthAccount(mnemonic: string, index: number) {
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${index}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);

        return {
            ethPublicKey: wallet.address,
            ethPrivateKey: privateKey
        }
    }

    async generateSolAccount(mnemonic: string, index: number) {
        const seed = await mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${index}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);

        return {
            solPublicKey: keypair.publicKey.toBase58(),
            solPrivateKey: encodeBase58(keypair.secretKey)
        }
    }
}

export const walletManager = WalletManager.getInstance();