import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Input } from '../../components/ui/input'
import { Button } from '../..//components/ui/button'

import Victory from '../../assets/victory.svg'
import Background from '../../assets/login2.png'

function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleLogin = async () => {}

  const handleSignup = async () => {}

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[90vh] w-[90vw] bg-white border-2 border-white shadow-2xl shadow-emerald-950 text-opacity-90 md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
           <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <h1 className="text-4xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="victory emoji" className='h-[100px]' />
            </div>
            <p className='font-medium text-center'>rant with us...</p>
           </div>
           <div className='flex items-center justify-center w-full'>
            <Tabs className='w-3/4'>
              <TabsList className='bg-transparent rounded-none w-full'>
                <TabsTrigger value='Login' className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-emerald-500 transition-all duration-300' >
                  Login
                </TabsTrigger>
                <TabsTrigger value='Signup' className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-emerald-500 transition-all duration-300'>
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Login" className="flex flex-col gap-5 mt-10" >
                <Input 
                placeholder='Email' 
                type='email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} className='rounded-full p-6'
                />
                <Input 
                placeholder='Password' 
                type='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} className='rounded-full p-6'
                />
                <Button className='rounded-full p-6 bg-emerald-200' onSubmit={handleLogin}>Login</Button>
              </TabsContent>
              <TabsContent value="Signup" className="flex flex-col gap-5">
              <Input 
                placeholder='Email' 
                type='email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} className='rounded-full p-6'
                />
                <Input 
                placeholder='Password' 
                type='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} className='rounded-full p-6'
                />
                <Input 
                placeholder='Confirm Password' 
                type='password' 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className='rounded-full p-6'
                />
                <Button className='rounded-full p-6 bg-emerald-200' onSubmit={handleSignup}>Signup</Button>
              </TabsContent>
            </Tabs>
           </div>
        </div>
        <div className='hidden xl:flex justify-center items-center'>
          <img src={Background} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Auth