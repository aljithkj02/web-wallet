import { Button } from "@/components/ui/button"
import { useState } from "react"
import { SolanaIcon, EthereumIcon } from '@/assets'

export const Accounts = () => {
    const [accounts, setAccounts] = useState([
        {
            privateKey: 'Private Key',
            publicKey: 'Public Key'
        },
        {
            privateKey: 'Private Key',
            publicKey: 'Public Key'
        },
    ])
    return (
        <div>
            <div className="flex items-center justify-between">
                <p className='text-white text-xl'>My Accounts</p>
                <Button variant="secondary">Add new account</Button>
            </div>

            <div className="my-5 flex flex-col gap-10">
                {
                    accounts.map((account, index) => {
                        return (
                            <div key={account.privateKey} >
                                <p className="text-white text-center mb-1 text-lg">Account {index + 1}</p>

                                <div className="border border-blue-500 px-4 py-2 rounded-lg">
                                    <div className="flex items-center gap-10 border-b border-slate-400 py-4 px-4 rounded-md">
                                        <div className="w-[5%]">
                                            <img src={SolanaIcon} alt="Solana" 
                                                className="w-10"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-5">
                                            <div>
                                                <p className="text-white">Public Key</p>
                                            </div>
                                            <div>
                                                <p className="text-white">Private Key</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-10 py-4 px-4">
                                        <div className="w-[5%]">
                                            <img src={EthereumIcon} alt="Solana" 
                                                className="w-10"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-5">
                                            <div>
                                                <p className="text-white">Public Key</p>
                                            </div>
                                            <div>
                                                <p className="text-white">Private Key</p>
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
