import { io } from "socket.io-client";
import { useAppStore } from "../store/index.js";
import { createContext, useContext, useEffect, useRef } from "react";
import { HOST } from "../utils/constants.js";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
      socket.current.on("connect", () => {
        console.log("Connected to Socket Server");
      });

      const handleRecieveMessages = (message) => {
        const { selectedChatData, selectedChatType, addMessage } =
          useAppStore.getState();

        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recepient._id)
        ) {
          console.log("mesg rev", message);
          addMessage(message);
        }
      };

      socket.current.on("recieveMessage", handleRecieveMessages);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
