import '@/App.css'
import { Navbar } from "@/components/common/Navbar"
import { SeedPhrase } from '@/components/common/SeedPhrase'
import { Accounts } from '@/components/common/Accounts'
import { useState } from 'react'
import { generateMnemonic } from 'bip39'
import { Toaster } from '@/components/ui/toaster'

function App() {
    const [mnemonic, setMnemonic] = useState("");
    const [phrases, setPhrases] = useState<string[]>(new Array(12).fill(""))

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
                
                <Accounts />
            </div>

            <Toaster />
        </div>
    )
}

export default App
