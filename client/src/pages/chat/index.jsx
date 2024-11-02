import { useNavigate } from "react-router-dom"
import { useAppStore } from "../../store/index.js"
import { useEffect } from "react"
import { toast } from "sonner"
import EmptyChatContainer from "./components/empty-chat-container/index.jsx"
import ContactsContainer from "./components/contacts-container/index.jsx"
import ChatContainer from "./components/chat-container/index.jsx"

function Chat() {
  const { userInfo } = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    if(userInfo.profileSetup === false){
      toast("Please setup profile")
      navigate("/profile")
    }
  },[userInfo, navigate])
  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactsContainer/>
      {/* <EmptyChatContainer/> */}
      <ChatContainer/>
    </div>
  )
}

export default Chat