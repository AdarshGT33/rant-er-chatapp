import React from 'react'
import ChatHeader from './components/chat-header'
import MessageContainer from './components/message-container'
import ChatBar from './components/chat-bar'

const ChatContainer = () => {
  return (
    <div className='fixed top-0 h-[100vh] w-[100vw] flex flex-col bg-[#1c1d25] md:static md:flex-1'>
      <ChatHeader/>
      <MessageContainer/>
      <ChatBar/>
    </div>
  )
}

export default ChatContainer