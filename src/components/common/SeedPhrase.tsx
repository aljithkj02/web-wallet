import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

interface SeedPhraseProps {
    phrases: string[];
    onChange: (index: number, value: string) => void;
}

export const SeedPhrase = ( { phrases, onChange }: SeedPhraseProps) => {

    const handleOnChanage = (e: ChangeEvent<HTMLInputElement>) => {
        const index = Number(e.target.name);
        const value = e.target.value;

        onChange(index, value);
    }

    return (
        <div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="px-6 text-white">
                        Secret phrase
                    </AccordionTrigger>

                    <AccordionContent className="px-6 py-6 text-white">
                        <div className="flex justify-center items-center gap-6">
                            { !phrases.length  && (
                                <div><Button variant="secondary">Create a new secret recovery phrase?</Button></div>
                            )}

                            { !phrases.length  && (
                                <div><Button variant="secondary">Import secret recovery phrase?</Button></div> 
                            )}
                        </div>

                        <div className="grid grid-cols-4 mt-5">
                            {
                                phrases.map((phrase, i) => {
                                    return <div key={i}
                                        className="p-4 text-center text-[15px]"
                                    >
                                        <Input type="text"
                                            name={i.toString()}  
                                            value={phrase}
                                            className="bg-black border-none outline-none"
                                            onChange={handleOnChanage}
                                        />
                                    </div>
                                })
                            }
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
