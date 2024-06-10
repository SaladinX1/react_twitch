import { useState } from 'react'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Games from './components/Games/Games'
import TopStream from './components/TopStream/TopStream'
import Live from './components/Live/Live'
import { Routes, Route, Router} from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <Header/>
      <Sidebar/>
         

      

      <Routes>
          <Route path='/' element={<Games />}></Route>
          <Route path='/top-streams' element={<TopStream/>}></Route>
          <Route path='/live/:slug' element={<Live/>}></Route>

      </Routes>

           


      
      

    </>
  )
}

export default App
