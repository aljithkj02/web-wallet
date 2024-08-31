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

interface BalanceManagementProps {
    accounts: IAccount[];
    selectedAccount: string;
    handleSelectAccount: (accountNumber: string) => void;
}

export const BalanceManagement = ({ accounts, selectedAccount, handleSelectAccount }: BalanceManagementProps) => {

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className='flex justify-center'>
                        <Button variant="outline">Account {Number(selectedAccount) + 1}</Button>
                    </div>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Select accounts</DropdownMenuLabel>

                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup 
                        value={selectedAccount} 
                        onValueChange={handleSelectAccount}
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
        </div>
    )
}
