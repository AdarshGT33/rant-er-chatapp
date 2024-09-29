import { useNavigate } from "react-router-dom"
import { useAppStore } from "../../store/index.js"
import { useEffect } from "react"
import { toast } from "sonner"

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
    <div>Chat</div>
  )
}

export default Chat