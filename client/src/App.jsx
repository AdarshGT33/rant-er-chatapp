import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import { useAppStore } from './store/index.js';
import { apiClient } from './lib/api-client'
import { GET_USER_INFO } from './utils/constants'


const PrivateRoutes = ({children}) => {
  const { userInfo } = useAppStore()
  const isAuthenticated = !!userInfo // turning isAuthenticated into a boolean value
  console.log("private wala",isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/auth" />
}

const AuthRoutes = ({children}) => {
  const { userInfo } = useAppStore()
  const isAuthenticated = !!userInfo
  console.log("auth wala", isAuthenticated)
  return isAuthenticated ? <Navigate to="/chat"/> : children
}

function App() {
  const { userInfo, setUserInfo } = useAppStore()
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await apiClient.get(
          GET_USER_INFO,
        )
        if( res.status === 200 && res.data.id ){
          setUserInfo(res.data)
        }
        console.log({res})
      } catch (error) {
        console.log("Error getting user info", error)
      } finally{
        setLoading(false)
      }
    }
    if(!userInfo){
      getUserInfo()
    }else {
      setLoading(false)
    }
  },[userInfo, setUserInfo])

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        /**we will use lazy suspense(not a stand) as currently loading on page will lead to loading all the pages */
        <Route 
        path="/auth" 
        element={
          <AuthRoutes>
            <Auth/>
          </AuthRoutes>
        }/>
        <Route 
        path="/chat" 
        element={
          <PrivateRoutes>
            <Chat/>
          </PrivateRoutes>
        }/>
        <Route 
        path="/profile" 
        element={
          <PrivateRoutes>
            <Profile/>
          </PrivateRoutes>
        }/>
        <Route path='*' element={<Navigate to={'/auth'}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App