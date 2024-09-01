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
    const [phraseText, setPhraseText] = useState("");
    const { toast } = useToast();

    const handleOnChanage = (e: ChangeEvent<HTMLInputElement>) => {
        if (mnemonic) return;

        const index = Number(e.target.name);
        const value = e.target.value;

        onChange(index, value);
    }

    const handleImportWallet = () => {
        if (phrases.some((x) => x === '' && !phraseText)) {
            toast({description: "Fill all the fields!"});
            return;
        }

        if (phraseText) {
            importWallet(phraseText);
        } else {
            importWallet(phrases.join(' '));
        }
        toast({ description: "Wallet imported successfully!"});
        setImportSecret(false);
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(mnemonic);
        toast({ description: "Copied!"});
    }

    return (
        <div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="px-6">
                        Secret phrase
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pt-4 pb-6">
                        <div className="flex justify-center items-center gap-6">
                            { (!mnemonic && !importSecret)  && (
                                <div>
                                    <Button
                                        onClick={createNewMnemonic}
                                    >
                                        Create a new secret recovery phrase?
                                    </Button>
                                </div>
                            )}

                            { (!mnemonic && !importSecret)  && (
                                <div>
                                    <Button
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
                                            placeholder={(i + 1).toString()}
                                            name={i.toString()}  
                                            value={phrase}
                                            className="disabled:text-white"
                                            onChange={handleOnChanage}
                                            autoComplete="off"
                                        />
                                    </div>
                                })
                            }
                        </div>
                            
                        {

                            ( mnemonic || importSecret) && phrases.some((x) => x !== "") && (
                                <div className="flex justify-center mt-5">
                                    <Button
                                        className="w-20"
                                        onClick={handleCopy}
                                    >
                                        Copy
                                    </Button>
                                </div>
                            )
                        }

                        { importSecret && <div>
                            <p className="text-center my-4">OR</p>

                            <Input 
                                type="text"
                                placeholder="Enter the phrase here"
                                value={phraseText}
                                onChange={(e) => setPhraseText(e.target.value)}
                            />

                            <div className="flex mt-5 justify-center">
                                <Button
                                    className="w-60"
                                    onClick={handleImportWallet}
                                >
                                    Import Wallet
                                </Button>
                            </div>
                        </div> }

                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
