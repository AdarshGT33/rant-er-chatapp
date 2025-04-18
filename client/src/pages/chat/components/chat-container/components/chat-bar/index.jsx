import { apiClient } from "../../../../../../lib/api-client.js";
import { useSocket } from "../../../../../../context/socketContext.jsx";
import { useAppStore } from "../../../../../../store/index.js";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { UPLOAD_FILES_ROUTE } from "../../../../../../utils/constants.js";

const ChatBar = () => {
  const emojiRef = useRef();
  const fileInputRef = useRef();
  const { selectedChatType, selectedChatData, userInfo, setIsUploading, setFileUploadProgress } = useAppStore();
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  useEffect(() => {
    function handleEmojiClose(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleEmojiClose);
    return () => {
      document.removeEventListener("mousedown", handleEmojiClose);
    };
  }, [emojiPickerOpen]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: message,
        recepient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
      });
    }
    setMessage("");
  };

  const handleAttachementClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAttachementChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        setIsUploading(true)
        const response = await apiClient.post(UPLOAD_FILES_ROUTE, formData, {
          withCredentials: true,
          onUploadProgress: (data) => {
            setFileUploadProgress(Math.round((100 * data.loaded)/ data.total))
          }
        });

        if (response.status === 200 && response.data) {
          setIsUploading(false)
          if(selectedChatType === "contact"){
            socket.emit("sendMessage", {
              sender: userInfo.id,
              content: undefined,
              recepient: selectedChatData._id,
              messageType: "file",
              fileUrl: response.data.filePath,
            });
          }
        }
      }
      console.log({ file });
    } catch (error) {
      setIsUploading(false)
      console.log("Error in handling file attachement", error);
    }
  };

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex items-center justify-center px-8 mb-6 gap-6">
      <div className="flex flex-1 bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="text-neutral-500 focus:border-none focus:outline-none hover:text-white"
          onClick={handleAttachementClick}
        >
          <GrAttachment className="text-xl" />
        </button>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleAttachementChange}
        />
        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none hover:text-white"
            onClick={() => setEmojiPickerOpen(true)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              theme="dark"
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button
        className="bg-emerald-700 rounded-lg flex items-center justify-center p-5 hover:bg-emerald-900 focus:border-none focus:outline-none hover:text-white"
        onClick={handleSendMessage}
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default ChatBar;
