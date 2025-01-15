import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JeepCodes from './Components/JeepCodes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <JeepCodes/>
      </>
  )
}

export default App
