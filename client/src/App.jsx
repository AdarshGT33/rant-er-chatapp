import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        /**we will use lazy suspense(not a stand) as currently loading on page will lead to loading all the pages */
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='*' element={<Navigate to={'/auth'}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App