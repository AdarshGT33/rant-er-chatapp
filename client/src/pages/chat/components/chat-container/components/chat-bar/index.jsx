import { useState } from "react"
import { GrAttachment } from "react-icons/gr"
import { IoSend } from "react-icons/io5"
import { RiEmojiStickerLine } from "react-icons/ri"

const ChatBar = () => {
  const [message, setMessage] = useState("")
  return (
    <div className='h-[10vh] bg-[#1c1d25] flex items-center justify-center px-8 mb-6 gap-6'>
      <div className="flex flex-1 bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input 
        type='text' 
        className='flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none' 
        placeholder='Type a message'
        value={message}
        onChange={e => setMessage(e.target.value)} />
        <button className='text-neutral-500 focus:border-none focus:outline-none hover:text-white'>
          <GrAttachment className="text-xl"/>
        </button>
        <div className='relative'>
          <button className='text-neutral-500 focus:border-none focus:outline-none hover:text-white'>
            <RiEmojiStickerLine className='text-2xl'/>
          </button>
        </div>
      </div>
      <button className='bg-emerald-700 rounded-lg flex items-center justify-center p-5 hover:bg-emerald-900 focus:border-none focus:outline-none hover:text-white'>
          <IoSend className="text-2xl"/>
      </button>
    </div>
  )
}

export default ChatBar