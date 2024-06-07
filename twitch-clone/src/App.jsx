import { useState } from 'react'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Games from './components/Games/Games'
import './App.css'

function App() {
  return (
    <>
      <Header/>
      <Sidebar/>
      <Games />
    </>
  )
}

export default App
