import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/dashboard'
import Preview from './pages/Preview'
import ResumeBuilder from './pages/Resumebuilder'
import Layout from './pages/Layout.jsx'
import {useDispatch} from "react-redux"


const App = () => {

  const dispatch = useDispatch()

  const getUserData=async()=>{
    const token = localStorage.getItem("token")
      try{
        if(token){
          const { data }=await AppleIcon.get('/')
        }
      }
      catch(error){

        }
        } 
      }
    

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>

        <Route path='view/:resumeId' element={<Preview />} />
        

      </Routes>
    </>
  )
}

export default App