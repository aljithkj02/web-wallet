import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { SolanaIcon, EthereumIcon } from '@/assets'
import { IAccount } from "@/App";

interface AccoutnsProps {
    mnemonic: string;
    index: number;
    accounts: IAccount[];
    generateNewAccount: () => Promise<void>;
}

export const Accounts = ( { mnemonic, index, accounts, generateNewAccount }: AccoutnsProps) => {
    const [showKey, setShowKey] = useState("");

    useEffect(() => {
        if (mnemonic && index === 0) {
            generateNewAccount();
        }
    }, [mnemonic])

    return (
        <div>
            <div className="flex items-center justify-between">
                <p className='text-white text-xl'>My Accounts</p>

                <Button variant="secondary"
                    onClick={generateNewAccount}
                >
                    Add new account
                </Button>
            </div>

            <div className="my-5 flex flex-col gap-10">
                {
                    accounts.map((account, i) => {
                        return (
                            <div key={account.ethPublicKey} >
                                <p className="text-white text-center mb-1 text-lg">Account {i + 1}</p>

                                <div className="border border-blue-500 px-4 py-2 rounded-lg">
                                    <div className="flex items-center gap-10 border-b border-slate-400 py-4 px-4 rounded-md">
                                        <div className="w-[5%]">
                                            <img src={SolanaIcon} alt="Solana" 
                                                className="w-10"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-5 w-full">
                                            <div className="flex items-center">
                                                <p className="text-gray-400 w-[15%]">Public Key</p>
                                                <p className="text-white w-[85%] text-sm">{ account.solPublicKey }</p>
                                            </div>
                                            
                                            <div className="flex items-center">
                                                <p className="text-gray-400 w-[15%]">Private Key</p>
                                                { showKey === `sol-${i}` ? (
                                                    <p className="text-white w-[85%] text-sm">{ account.solPrivateKey }</p>
                                                ) : (
                                                    <Button
                                                        className="w-[85%]"
                                                        onClick={() => setShowKey(`sol-${i}`)}
                                                    >
                                                        Show Private Key
                                                    </Button> 
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-10 py-4 px-4">
                                        <div className="w-[5%]">
                                            <img src={EthereumIcon} alt="Solana" 
                                                className="w-10"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-5 w-full">
                                            <div className="flex items-center">
                                                <p className="text-gray-400 w-[15%]">Public Key</p>
                                                <p className="text-white w-[85%] text-sm">{ account.ethPublicKey }</p>
                                            </div>
                                            
                                            <div className="flex items-center">
                                                <p className="text-gray-400 w-[15%]">Private Key</p>
                                                { showKey === `eth-${i}` ? (
                                                    <p className="text-white w-[85%] text-sm">{ account.ethPrivateKey }</p>
                                                ) : (
                                                    <Button
                                                        className="w-[85%]"
                                                        onClick={() => setShowKey(`eth-${i}`)}
                                                    >
                                                        Show Private Key
                                                    </Button> 
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
