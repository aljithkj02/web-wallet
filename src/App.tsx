import '@/App.css'
import { Navbar } from "@/components/common/Navbar"
import { SeedPhrase } from '@/components/common/SeedPhrase'
import { Accounts } from '@/components/common/Accounts'

function App() {

  return (
    <div className='bg-[#09090b] min-h-screen select-none'>
      <Navbar />

      <div className='pt-24 pb-10 px-10 md:px-40 flex flex-col gap-10'>
        <SeedPhrase />
        
        <Accounts />
      </div>
    </div>
  )
}

export default App
