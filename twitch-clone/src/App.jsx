import { useState } from 'react'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Games from './components/Games/Games'
import TopStream from './components/TopStream/TopStream'
import Live from './components/Live/Live'
import { Routes, Route } from 'react-router-dom'
import GameStreams from './components/GameStreams/GameStreams'
import Resultats from './components/Resultats/Resultats'
import Erreur from './components/Erreur/Erreur'
import './App.css'

function App() {
  return (
    <>
      <Header/>
      <Sidebar/>
         

      

      <Routes >
          <Route path='/' element={<Games />}></Route>
          <Route path='/top-streams' element={<TopStream/>}></Route>
          <Route path='/live/:slug' element={<Live/>}></Route>
          <Route path='/game/:slug' element={<GameStreams/>}></Route>
          <Route path='/resultats/:slug' element={<Resultats/>}></Route>
          <Route path='/resultats/' element={<Erreur/>}></Route>
      </Routes>

           


      
      

    </>
  )
}

export default App
