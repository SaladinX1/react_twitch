import { useState } from 'react'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Games from './components/Games/Games'
import TopStream from './components/TopStream/TopStream'
import {BrowserRouter, Routes, Route, Router} from 'react-router-dom'
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
// } from "react-router-dom";
import './App.css'

function App() {
  return (
    <>
      <Header/>
      <Sidebar/>
         

      <BrowserRouter>

      <Routes>
          <Route path='/' element={<Games />}></Route>
          <Route path='/top-streams' element={ <TopStream/>}></Route>

      </Routes>

           


      
      </BrowserRouter>

    </>
  )
}

export default App
