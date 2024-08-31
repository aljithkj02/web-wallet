import '@/App.css'
import { Navbar } from "@/components/common/Navbar"
import { SeedPhrase } from '@/components/common/SeedPhrase'
import { Accounts } from '@/components/common/Accounts'
import { useState } from 'react'
import { generateMnemonic } from 'bip39'
import { Toaster } from '@/components/ui/toaster'
import { walletManager } from '@/managers/Wallet-Manager'
import { BalanceManagement } from '@/components/common/BalanceManagement'

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
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [selectedAccount, setSelectedAccount] = useState("0");

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
        setPhrases(mnemonicText.split(' '));
    }

    const generateNewAccount = async () => {
        const ethAccount = await walletManager.generateEthAccount(mnemonic, currentIndex);
        const solAccount = await walletManager.generateSolAccount(mnemonic, currentIndex);
        
        setAccounts([...accounts, {
            ...ethAccount,
            ...solAccount
        }])

        setCurrentIndex(currentIndex + 1);
    }

    const handleSelectAccount = (accountNo: string) => {
        setSelectedAccount(accountNo);
    }

    return (
        <div className='bg-[#09090b] min-h-screen'>
            <Navbar />

            <div className='grid grid-cols-4 px-10 md:px-14 pt-24 pb-10 gap-6'>
                <div className='flex flex-col gap-10 col-span-3'>
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

                <div className='col-span-1 select-none'>
                    <BalanceManagement 
                        accounts={accounts}
                        selectedAccount={selectedAccount}
                        handleSelectAccount={handleSelectAccount}
                    />
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default App
