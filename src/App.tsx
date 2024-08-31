import '@/App.css'
import { Navbar } from "@/components/common/Navbar"
import { SeedPhrase } from '@/components/common/SeedPhrase'
import { Accounts } from '@/components/common/Accounts'
import { useState } from 'react'

function App() {
  const [phrases, setPhrases] = useState<string[]>([
      // "question", "question", "question", "question",
      // "question", "question", "question", "question",
      // "question", "question", "question", "question"
  ])

  const handleOnChanage = (index: number, value: string) => {
    phrases[index] = value;
    setPhrases([...phrases]);
  }

  return (
    <div className='bg-[#09090b] min-h-screen select-none'>
      <Navbar />

      <div className='pt-24 pb-10 px-10 md:px-40 flex flex-col gap-10'>
        <SeedPhrase phrases={phrases} onChange={handleOnChanage} />
        
        <Accounts />
      </div>
    </div>
  )
}

export default App
