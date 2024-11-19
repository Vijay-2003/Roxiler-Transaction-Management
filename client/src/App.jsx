import './App.css'
import TranscationsTable from './components/TranscationsTable'

function App() {

  return (
    <div>
       <h1 className='bg-black text-white text-4xl flex justify-center p-9'>Transactions Dashboard</h1>

      <TranscationsTable />
      

    </div>
  )
}

export default App
