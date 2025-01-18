import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "../../../../../../store/index.js";
import moment from "moment";
import { apiClient } from "../../../../../../lib/api-client.js";
import {
  GET_ALL_MESSAGES_ROUTES,
  HOST,
} from "../../../../../../utils/constants.js";
import { MdFolderZip } from "react-icons/md";
import { IoArrowDownCircleSharp, IoCloseSharp } from "react-icons/io5";

const MessageContainer = () => {
  const scrollRef = useRef();
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    selectedChatMessages,
    setSelectedChatMessages,
    setIsDownloading,
    setFileDownloadProgress,
  } = useAppStore();
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_ALL_MESSAGES_ROUTES,
          { id: selectedChatData._id },
          { withCredentials: true }
        );
        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log({ error });
        console.log("Error in getting messages", error);
      }
    };
    if (selectedChatData._id) {
      if (selectedChatType === "contact") getMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [selectedChatMessages]);

  const checkIfImage = (filePath) => {
    const regImg = /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return regImg.test(filePath);
  };

  const downloadFile = async (url) => {
    setIsDownloading(true)
    setFileDownloadProgress(0)
    const response = await apiClient(`${HOST}/${url}`, {
      responseType: "blob",
      onDownloadProgress: (data) => {
        setFileDownloadProgress(Math.round((100 * data.loaded)/ data.total))
      }
    });
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
    setIsDownloading(false)
    setFileDownloadProgress(0)
  };

  const renderMessages = () => {
    let lastDate = null;

    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  const renderDMMessages = (message) => (
    <div
      className={`${
        message.sender === selectedChatData._id ? "text-left" : "text-right"
      }`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#17ff88]/5 text-white/80 border-gray-500 p-2"
              : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20 p-2"
          } border inline-block my-1 rounded max-w-[50%] break-words`}
        >
          {message.content}
        </div>
      )}
      {message.messageType === "file" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#17ff59]/5 text-[#17ff59]/90 border-[#17ff59]/50"
              : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
          } border inline-block my-1 rounded max-w-[50%] break-words`}
        >
          {checkIfImage(message.fileUrl) ? (
            <div className="cursor-pointer" onClick={() => {setShowImage(true); setImageUrl(message.fileUrl)}}>
              <img
                src={`${HOST}/${message.fileUrl}`}
                height={300}
                width={300}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <span className="text-white/80 text-3xl rounded-full bg-black/20 p-3">
                <MdFolderZip />
              </span>
              <span>{message.fileUrl.split("/").pop()}</span>
              <span
                className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
                onClick={() => downloadFile(message.fileUrl)}
              >
                <IoArrowDownCircleSharp />
              </span>
            </div>
          )}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef} />
      {
        showImage && <div className="fixed z-[1000] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-lg flex-col">
          <div>
            <img src={`${HOST}/${imageUrl}`} className="h-[80vh] w-full bg-cover"/>
          </div>
          <div className="flex gap-5 fixed top-0 mt-3">
            <button className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300" onClick={() => downloadFile(imageUrl)}>
              <IoArrowDownCircleSharp/>
            </button>
            <button className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300" onClick={() => {setShowImage(false); setImageUrl(null)}}>
              <IoCloseSharp/>
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default MessageContainer;
