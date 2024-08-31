import '@/App.css'
import { Navbar } from "@/components/common/Navbar"
import { SeedPhrase } from '@/components/common/SeedPhrase'
import { Accounts } from '@/components/common/Accounts'
import { useState } from 'react'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { Toaster } from '@/components/ui/toaster'
import { encodeBase58, HDNodeWallet, Wallet } from 'ethers'
import { derivePath } from 'ed25519-hd-key'
import * as nacl from 'tweetnacl'
import { Keypair } from '@solana/web3.js'

export interface IAccount {
    ethPrivateKey: string;
    ethPublicKey: string;
    solPrivateKey: string;
    solPublicKey: string;
}

function App() {
    const [mnemonic, setMnemonic] = useState("");
    const [phrases, setPhrases] = useState<string[]>(new Array(12).fill(""))
    const [currentIndex, setCurrentIndex] = useState(0);
    const [accounts, setAccounts] = useState<IAccount[]>([])

    const handleOnChanage = (index: number, value: string) => {
        phrases[index] = value;
        setPhrases([...phrases]);
    }

    const createNewMnemonic = () => {
        const newMnemonic = generateMnemonic();
        setMnemonic(newMnemonic);
        setPhrases(newMnemonic.split(' '));
    }

    const handleImportWallet = (mnemonicText: string) => {
        setMnemonic(mnemonicText);
    }

    const generateNewAccount = async () => {
        const ethAccount = await generateEthAccount();
        const solAccount = await generateSolAccount();

        
        setAccounts([...accounts, {
            ...ethAccount,
            ...solAccount
        }])

        setCurrentIndex(currentIndex + 1);
    }

    const generateEthAccount = async () => {
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);

        return {
            ethPublicKey: wallet.address,
            ethPrivateKey: privateKey
        }
    }

    const generateSolAccount = async () => {
        const seed = await mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);

        return {
            solPublicKey: keypair.publicKey.toBase58(),
            solPrivateKey: encodeBase58(keypair.secretKey)
        }
    }

    return (
        <div className='bg-[#09090b] min-h-screen select-none'>
            <Navbar />

            <div className='pt-24 pb-10 px-10 md:px-40 flex flex-col gap-10'>
                <SeedPhrase 
                    phrases={phrases} 
                    onChange={handleOnChanage} 
                    createNewMnemonic={createNewMnemonic}
                    mnemonic={mnemonic}
                    importWallet={handleImportWallet}
                />
                
                <Accounts 
                    mnemonic={mnemonic} 
                    accounts={accounts}
                    index={currentIndex}
                    generateNewAccount={generateNewAccount}
                />
            </div>

            <Toaster />
        </div>
    )
}

export default App
