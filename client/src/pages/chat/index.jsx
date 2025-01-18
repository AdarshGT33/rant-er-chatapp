import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/index.js";
import { useEffect } from "react";
import { toast } from "sonner";
import EmptyChatContainer from "./components/empty-chat-container/index.jsx";
import ContactsContainer from "./components/contacts-container/index.jsx";
import ChatContainer from "./components/chat-container/index.jsx";

function Chat() {
  const {
    userInfo,
    selectedChatType,
    isUploading,
    isDownloading,
    fileUploadProgress,
    fileDownloadProgress,
  } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.profileSetup === false) {
      toast("Please setup profile");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      {
        isUploading && <div className="h-[100vh] w-[100vw] fixed top-0 left-0 z-10 flex items-center justify-center bg-black/80 flex-col gap-5 backdrop-blur-lg">
          <h5 className="text-5xl animate-pulse">Uploading File</h5>
          {fileUploadProgress}%
        </div>
      }
      {
        isDownloading && <div className="h-[100vh] w-[100vw] fixed top-0 left-0 z-10 flex items-center justify-center bg-black/80 flex-col gap-5 backdrop-blur-lg">
          <h5 className="text-5xl animate-pulse">Downloading File</h5>
          {fileDownloadProgress}%
        </div>
      }
      <ContactsContainer />
      {selectedChatType === undefined ? (
        <EmptyChatContainer />
      ) : (
        <ChatContainer />
      )}
    </div>
  );
}

export default Chat;
