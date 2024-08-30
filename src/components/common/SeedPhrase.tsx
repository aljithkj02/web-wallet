import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { useState } from "react"
  
export const SeedPhrase = () => {
    const [phrases, setPhrases] = useState([
        "question", "question", "question", "question",
        "question", "question", "question", "question",
        "question", "question", "question", "question"
    ])

    return (
        <div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="px-6 text-white">
                        Seed phrase
                    </AccordionTrigger>

                    <AccordionContent className="px-6 py-10 text-white">
                        <div className="flex justify-center">
                            <Button variant="secondary">Create a new Seed phrase?</Button>
                        </div>

                        <div className="grid grid-cols-4 mt-5">
                            {
                                phrases.map((phrase, i) => {
                                    return <div key={i}
                                        className="p-4 text-center text-[15px]"
                                    >
                                        {phrase}
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
