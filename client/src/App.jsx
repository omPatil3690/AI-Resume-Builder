import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/dashboard'
import Preview from './pages/Preview'
import ResumeBuilder from './pages/Resumebuilder'
import Layout from './pages/Layout.jsx'

const App = ()=>{
  return (
    <>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='app' element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="builder/:resumeID" element={<ResumeBuilder/>}/>
      </Route>

      <Route path='view/:resumeID' element={<Preview/>}/>
      <Route path='login' element={<Login/>}/>

      </Routes>
    </>
  )
}

export default App