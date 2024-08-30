import '@/App.css'
import { Navbar } from "@/components/common/Navbar"
import { SeedPhrase } from '@/components/common/SeedPhrase'

function App() {

  return (
    <div className='bg-[#09090b] h-screen w-screen select-none'>
      <Navbar />

      <div className='py-5 px-10 md:px-40'>
        <SeedPhrase />
      </div>
    </div>
  )
}

export default App
