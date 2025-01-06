import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { animationDefaultOptions, getColor } from "../../../../../../lib/utils.js";
import Lottie from "react-lottie";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../../../components/ui/tooltip.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../../components/ui/dialog";
import { Input } from "../../../../../../components/ui/input.jsx";
import { apiClient } from "../../../../../../lib/api-client.js";
import { SEARCH_CONTACT_ROUTES } from "../../../../../../utils/constants.js";
import { ScrollArea } from "../../../../../../components/ui/scroll-area.jsx";
import { Avatar, AvatarImage } from "../../../../../../components/ui/avatar.jsx";
import { useAppStore } from "../../../../../../store/index.js";

const NewDM = () => {
  const [ setSelectedChatType, setSelectedChatData ] = useAppStore()
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACT_ROUTES,
          { searchTerm },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data.contacts) {
          setSearchedContacts(response.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const selectNewContacts = (contact) => {
    setOpenNewContactModel(false)
    setSelectedChatType("contact")
    setSelectedChatData(contact)
    setSearchedContacts([])
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-opacity-90 text-neutral-400 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="border-none text-white bg-[#2f303b]">
            Start New Chat
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="bg-[#2c2e3b] text-[#6c6d71] rounded-lg p-6 border-none"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[250px]">
            <div className="flex flex-col gap-5">
              {searchedContacts.map((contact) => (
                <div
                  key={contact._id}
                  className="flex gap-3 items-center cursor-pointer"
                  onClick={() => selectNewContacts(contact)}
                >
                  <div className="w-12 h-12 relative">
                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                      {contact.image ? (
                        <AvatarImage
                          src={`${HOST}/${contact.image}`}
                          alt="profile"
                          className="object-cover w-full h-full bg-black"
                        />
                      ) : (
                        <div
                          className={`uppercase h-12 w-12 text-2xl border rounded-full flex items-center justify-center 
                    ${getColor(contact.color)}`}
                        >
                          {contact.firstName
                            ? contact.firstName.split("").shift()
                            : contact.email.split("").shift()}
                        </div>
                      )}
                    </Avatar>
                  </div>
                  <div className="flex flex-col">
                    <span>
                      {contact.firstName
                        ? contact.firstName.split("").shift()
                        : contact.email.split("").shift()}
                    </span>
                    <span>{contact.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          {searchedContacts.length <= 0 && (
            <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col mt-5 justify-center items-center duration-1000 transition-all">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOptions}
              />
              <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl text-center duration-300">
                <h3 className="poppins-medium">
                  Hi<span className="text-emerald-400">!</span> Search New
                  <span className="text-emerald-400"> Contact.</span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
