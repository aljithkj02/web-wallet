import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { IAccount } from "@/App"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { EthereumIcon, SolanaIcon } from "@/assets"
import { ChangeEvent, useEffect, useState } from "react"
import { walletManager } from "@/managers/Wallet-Manager"
import { toast } from "@/hooks/use-toast"
import { isValidSolanaAddress } from "@/lib/utils"

interface BalanceManagementProps {
    accounts: IAccount[];
    selectedAccountId: string;
    selectedAccount: IAccount;
    handleSelectAccountId: (accountNumber: string) => void;
    handleLoading: (val: boolean) => void;
}

const initTxData = {
    solRecipientAddress: '',
    ethRecipientAddress: '',
    solAmount: '',
    ethAmount: ''
}

export const BalanceManagement = ({ accounts, handleSelectAccountId, selectedAccountId, selectedAccount, handleLoading }: BalanceManagementProps) => {
    const [solBalance, setSolBalance] = useState(0);
    const [ethBalance, setEthBalance] = useState(0);
    const [txData, setTxData] = useState(initTxData);
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        getBalance();
        setTxData(initTxData);
    }, [selectedAccount, refetch])

    const getBalance = async () => {
        const balanceSol = await walletManager.getSolBalance(selectedAccount.solPublicKey);
        setSolBalance(balanceSol);

        const balanceEth = await walletManager.getEthBalance(selectedAccount.ethPublicKey);
        setEthBalance(Number(balanceEth));
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setTxData({
            ...txData,
            [name]: value
        })
    }

    const handleSendSol = async () => {
        if ((+txData.solAmount * 10 ** 9) > solBalance) {
            toast({ description: "Insufficient balance!"});
            return;
        }

        if (!isValidSolanaAddress(txData.solRecipientAddress)) {
            toast({ description: "Invalid recipient address!"});
            return;
        }

        handleLoading(true);
        await walletManager.sendSOL(selectedAccount.solPrivateKey, selectedAccount.solPublicKey, txData.solRecipientAddress, (+txData.solAmount * 10 ** 9));
        handleLoading(false);

        toast({ description: "Transaction Successful!"});
        setRefetch(!refetch);
    }

    return (
        <div className="border-l border-gray-500 fixed px-6 shadow-lg w-[25%]">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className='flex justify-center'>
                        <Button variant="outline">Account {Number(selectedAccountId) + 1}</Button>
                    </div>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Select accounts</DropdownMenuLabel>

                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup 
                        value={selectedAccountId} 
                        onValueChange={handleSelectAccountId}
                    >
                        {
                            accounts.map((_, i) => {
                                return (
                                    <DropdownMenuRadioItem key={i} value={i.toString()}>Account { i+1 }</DropdownMenuRadioItem>
                                )
                            })
                        }
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="my-4">
                <Tabs defaultValue="sol" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="sol">SOL</TabsTrigger>
                        <TabsTrigger value="eth">ETH</TabsTrigger>
                    </TabsList>

                    <TabsContent value="sol" >
                        <Card>
                            <CardHeader>
                                <CardTitle>Solana</CardTitle>
                                <CardDescription>
                                    <div className="mt-5">
                                        <p className="text-4xl text-black text-center font-bold">
                                            { solBalance === 0 ? 0 : (solBalance/10 ** 9).toFixed(4)} SOL
                                        </p>
                                    </div>
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-2">
                                <div className="flex flex-col gap-2">
                                    <p className="text-xl font-semibold text-center">Send SOL</p>
                                    <img src={SolanaIcon} alt="solana icon" 
                                        className="w-10 mx-auto h-16"
                                    />
                                    <Input
                                        name="solRecipientAddress"
                                        value={txData.solRecipientAddress}
                                        onChange={handleOnChange}
                                        className="mt-5"
                                        placeholder="Recipient's Solana address"
                                        autoComplete="off"
                                    />

                                    <Input
                                        name="solAmount"
                                        value={txData.solAmount}
                                        onChange={handleOnChange}
                                        className="mt-2"
                                        placeholder="Amount"
                                        autoComplete="off"
                                    />
                                </div>
                            </CardContent>

                            <CardFooter className="flex justify-center">
                                <Button className="w-full"
                                    onClick={handleSendSol}
                                    disabled={!txData.solAmount || !txData.solRecipientAddress}
                                >Send</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="eth">
                        <Card>
                            <CardHeader>
                                <CardTitle>Ethereum</CardTitle>
                                <CardDescription>
                                    <div className="mt-5">
                                        <p className="text-4xl text-black text-center font-bold">
                                            { ethBalance } ETH
                                        </p>
                                    </div>
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-2">
                                <div className="flex flex-col gap-2">
                                    <p className="text-xl font-semibold text-center">Send ETH</p>
                                    <img src={EthereumIcon} alt="solana icon" 
                                        className="w-10 mx-auto"
                                    />
                                    <Input
                                        name="ethRecipientAddress"
                                        value={txData.ethRecipientAddress}
                                        onChange={handleOnChange}
                                        className="mt-5"
                                        placeholder="Recipient's Ethereum address"
                                        autoComplete="off"
                                    />

                                    <Input
                                        name="ethAmount"
                                        value={txData.ethAmount}
                                        onChange={handleOnChange}
                                        className="mt-2"
                                        placeholder="Amount"
                                        autoComplete="off"
                                    />
                                </div>
                            </CardContent>

                            <CardFooter className="flex justify-center">
                                <Button className="w-full"
                                    disabled={!txData.ethAmount || !txData.ethRecipientAddress}
                                >Send</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
