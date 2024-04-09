// import { useState } from 'react'
import DashBoard from './components/DashBoard';
import TextEditor from './components/TextEditor';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'



function App() {
  return (
    <div>
      <DashBoard/>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/signUp" element={<SignUp/>} />
            <Route path="/textEditor" element={<TextEditor/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
