import EmojiPicker from "emoji-picker-react"
import { useEffect, useRef, useState } from "react"
import { GrAttachment } from "react-icons/gr"
import { IoSend } from "react-icons/io5"
import { RiEmojiStickerLine } from "react-icons/ri"

const ChatBar = () => {
  const emojiRef = useRef()
  const [message, setMessage] = useState("")
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)

  useEffect(()=>{
    function handleEmojiClose(e){
      if(emojiRef.current && !emojiRef.current.contains(e.target)){
        setEmojiPickerOpen(false)
      }
    }
    document.addEventListener("mousedown", handleEmojiClose)
    return () => {
      document.removeEventListener("mousedown", handleEmojiClose)
    }
  },[emojiPickerOpen])

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji)
  }

  const handleSendMessage = async () => {}

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
          <button className='text-neutral-500 focus:border-none focus:outline-none hover:text-white' onClick={() => setEmojiPickerOpen(true)}>
            <RiEmojiStickerLine className='text-2xl'/>
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker theme="dark" open={emojiPickerOpen} onEmojiClick={handleAddEmoji} autoFocusSearch={false} />
          </div>
        </div>
      </div>
      <button className='bg-emerald-700 rounded-lg flex items-center justify-center p-5 hover:bg-emerald-900 focus:border-none focus:outline-none hover:text-white' onClick={handleSendMessage}>
          <IoSend className="text-2xl"/>
      </button>
    </div>
  )
}

export default ChatBar