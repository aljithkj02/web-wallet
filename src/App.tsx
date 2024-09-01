import '@/App.css'
import { Navbar } from "@/components/common/Navbar"
import { SeedPhrase } from '@/components/common/SeedPhrase'
import { Accounts } from '@/components/common/Accounts'
import { useState } from 'react'
import { generateMnemonic } from 'bip39'
import { Toaster } from '@/components/ui/toaster'
import { walletManager } from '@/managers/Wallet-Manager'
import { BalanceManagement } from '@/components/common/BalanceManagement'
import { Loader } from '@/components/common/Loader'

export interface IAccount {
    ethPrivateKey: string;
    ethPublicKey: string;
    solPrivateKey: Uint8Array;
    solPublicKey: string;
    solPrivateKeyB58: string;
}

function App() {
    const [mnemonic, setMnemonic] = useState("");
    const [phrases, setPhrases] = useState<string[]>(new Array(12).fill(""))
    const [currentIndex, setCurrentIndex] = useState(0);
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [selectedAccountId, setSelectedAccountId] = useState<string>("0");
    const [selectedAccount, setSelectedAccount] = useState<IAccount | null>(null);
    const [loading, setLoading] = useState(true);

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
        
        const newAccount = {
            ...ethAccount,
            ...solAccount
        };

        setAccounts([...accounts, newAccount])

        if (currentIndex === 0) {
            setSelectedAccount(newAccount);
        }
        setCurrentIndex(currentIndex + 1);
    }

    const handleSelectAccountId = (accountId: string) => {
        setSelectedAccountId(accountId);
        setSelectedAccount(accounts[+accountId]);
    }

    return (
        <div className='min-h-screen'>
            <Navbar />

            <div className='flex px-10 md:px-14 pt-24 pb-10 gap-6'>
                <div className='flex flex-col gap-10 w-[75%]'>
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
                        selectedAccountId={selectedAccount ? selectedAccountId : null}
                        handleSelectAccountId={handleSelectAccountId}
                    />
                </div>

                <div className='w-[25%] select-none'>
                    { 
                        (selectedAccount !== null) ? (
                            <BalanceManagement 
                                accounts={accounts}
                                selectedAccountId={selectedAccountId}
                                handleSelectAccountId={handleSelectAccountId}
                                selectedAccount={selectedAccount}
                            />
                        ) : (
                            <p className='text-lg text-center mt-6'>No account selected!</p>
                        ) 
                    }
                </div>
            </div>
            <Toaster />
            { loading && <Loader /> }
        </div>
    )
}

export default App
