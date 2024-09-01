import { Keypair, Connection, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { encodeBase58, HDNodeWallet, Wallet, JsonRpcProvider } from "ethers";
import * as nacl from "tweetnacl";

class WalletManager {
    static instance: WalletManager;
    private solConnection: Connection;
    private ethConnection: JsonRpcProvider;

    private constructor() {
        this.solConnection = new Connection(import.meta.env.VITE_SOL_RPC_URL);
        this.ethConnection = new JsonRpcProvider(import.meta.env.VITE_ETH_RPC_URL)
    }

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
            solPrivateKey: keypair.secretKey,
            solPrivateKeyB58: encodeBase58(keypair.secretKey)
        }
    }

    async getSolBalance(address: string) {
        return await this.solConnection.getBalance(new PublicKey(address));
    }

    async getEthBalance(address: string) {
        return await this.ethConnection.getBalance(address);
    }

    async sendSOL(privateKey: Uint8Array, publicKey: string, to: string, amount: number) {
        try {
            const from = Keypair.fromSecretKey(privateKey);

            const data = {
                fromPubkey: new PublicKey(publicKey),
                toPubkey: new PublicKey(to),
                lamports: amount
            }

            const transaction = new Transaction().add(
                SystemProgram.transfer(data)
            )

            const signature = await sendAndConfirmTransaction(
                this.solConnection,
                transaction,
                [from]
            )
            console.log("SIGNATURE", signature);
            return true;
        } catch (error) {
            console.log((error as Error).message);
            return false;
        }
    }
}

export const walletManager = WalletManager.getInstance();