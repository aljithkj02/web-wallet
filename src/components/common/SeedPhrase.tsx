import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { useToast } from "@/hooks/use-toast"

interface SeedPhraseProps {
    phrases: string[];
    mnemonic: string;
    onChange: (index: number, value: string) => void;
    createNewMnemonic: () => void;
    importWallet: (text: string) => void;
}

export const SeedPhrase = ( { phrases, mnemonic, onChange, createNewMnemonic, importWallet }: SeedPhraseProps) => {
    const [importSecret, setImportSecret] = useState(false);
    const { toast } = useToast();

    const handleOnChanage = (e: ChangeEvent<HTMLInputElement>) => {
        if (mnemonic) return;
        
        const index = Number(e.target.name);
        const value = e.target.value;

        onChange(index, value);
    }

    const handleImportWallet = () => {
        if (phrases.some((x) => x === '')) {
            toast({description: "Fill all the fields!"});
            return;
        }
        importWallet(phrases.join(' '));
        toast({ description: "Wallet imported successfully!"});
        setImportSecret(false);
    }

    return (
        <div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="px-6 text-white">
                        Secret phrase
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pt-4 pb-6 text-white">
                        <div className="flex justify-center items-center gap-6">
                            { (!mnemonic && !importSecret)  && (
                                <div>
                                    <Button variant="secondary"
                                        onClick={createNewMnemonic}
                                    >
                                        Create a new secret recovery phrase?
                                    </Button>
                                </div>
                            )}

                            { (!mnemonic && !importSecret)  && (
                                <div>
                                    <Button variant="secondary"
                                        onClick={() => setImportSecret(true)}
                                    >
                                        Import secret recovery phrase?
                                    </Button>
                                </div> 
                            )}
                        </div>

                        <div className="grid grid-cols-4 mt-5">
                            {
                                ( mnemonic || importSecret ) && phrases.map((phrase, i) => {
                                    return <div key={i}
                                        className="p-4 text-center text-[15px]"
                                    >
                                        <Input type="text"
                                            name={i.toString()}  
                                            value={phrase}
                                            className="bg-black border-none outline-none disabled:text-white"
                                            onChange={handleOnChanage}
                                            autoComplete="off"
                                        />
                                    </div>
                                })
                            }
                        </div>

                        <div>
                            { importSecret && (
                                <div className="flex mt-5 justify-center">
                                    <Button variant="secondary"
                                        className="w-60"
                                        onClick={handleImportWallet}
                                    >
                                        Import Wallet
                                    </Button>
                                </div>
                            )}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
