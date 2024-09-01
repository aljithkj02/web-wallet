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
import { useEffect, useState } from "react"
import { walletManager } from "@/managers/Wallet-Manager"
interface BalanceManagementProps {
    accounts: IAccount[];
    selectedAccountId: string;
    selectedAccount: IAccount;
    handleSelectAccountId: (accountNumber: string) => void;
}

export const BalanceManagement = ({ accounts, handleSelectAccountId, selectedAccountId, selectedAccount }: BalanceManagementProps) => {
    const [solBalance, setSolBalance] = useState(0);

    useEffect(() => {
        getBalance();
    }, [selectedAccount])

    const getBalance = async () => {
        const balance = await walletManager.getSolBalance(selectedAccount.solPublicKey);
        setSolBalance(balance);
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
                                            { solBalance === 0 ? 0 : (solBalance/10 ** 9)} SOL
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
                                        className="mt-5"
                                        placeholder="Recipient's Solana address"
                                    />

                                    <Input
                                        className="mt-2"
                                        placeholder="Amount"
                                    />
                                </div>
                            </CardContent>

                            <CardFooter className="flex justify-center">
                                <Button className="w-full">Send</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="eth">
                        <Card>
                            <CardHeader>
                                <CardTitle>Ethereum</CardTitle>
                                <CardDescription>
                                    <div className="mt-5">
                                        <p className="text-4xl text-black text-center font-bold">$10.00</p>
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
                                        className="mt-5"
                                        placeholder="Recipient's Ethereum address"
                                    />

                                    <Input
                                        className="mt-2"
                                        placeholder="Amount"
                                    />
                                </div>
                            </CardContent>

                            <CardFooter className="flex justify-center">
                                <Button className="w-full">Send</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
