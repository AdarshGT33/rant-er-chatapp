import { HOST } from "../../../../../../utils/constants.js";
import {
  Avatar,
  AvatarImage,
} from "../../../../../../components/ui/avatar.jsx";
import { useAppStore } from "../../../../../../store/index.js";
import React from "react";
import { RiCloseFill } from "react-icons/ri";
import { getColor } from "../../../../../../lib/utils.js";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex items-center gap-3 justify-center">
          <div className="w-12 h-12 relative">
            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
              {selectedChatData.image ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.image}`}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-12 w-12 text-2xl border rounded-full flex items-center justify-center 
                              ${getColor(selectedChatData.color)}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.split("").shift()
                    : selectedChatData.email.split("").shift()}
                </div>
              )}
            </Avatar>
          </div>
          <div>
          {selectedChatType === "contact" && selectedChatData.firstName ? `${selectedChatData.firstName + selectedChatData.lastName}` : selectedChatData.email.split("").shift()}
          </div>
        </div>
        <div className="flex gap-5 items-center justify-center">
          <button
            onClick={closeChat}
            className="text-neutral-500 focus:border-none focus:outline-none hover:text-white"
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
