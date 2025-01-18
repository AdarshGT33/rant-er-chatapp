import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
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
} from "../../../../../../components/ui/dialog";
import { Input } from "../../../../../../components/ui/input.jsx";
import { apiClient } from "../../../../../../lib/api-client.js";
import {
    CREATE_CHANNEL_ROUTE,
    GET_ALL_LOGGED_IN_USERS_ROUTE,
} from "../../../../../../utils/constants.js";
import { useAppStore } from "../../../../../../store/index.js";
import { Button } from "../../../../../../components/ui/button.jsx";
import MultipleSelector from "../../../../../../components/ui/multiselect.jsx";


const CreateChannel = () => {
  const { setSelectedChatType, setSelectedChatData, addChannels } = useAppStore();
  const [newChannelModal, setNewChannelModal] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await apiClient.get(GET_ALL_LOGGED_IN_USERS_ROUTE, {
        withCredentials: true,
      });
      setAllContacts(response.data.contacts);
    };
    getData()
  }, []);

  const createChannel = async () => {
    try {
        if(channelName.length >0 && selectedContacts.length > 0){
            const response = await apiClient.post(
                CREATE_CHANNEL_ROUTE,
                {
                    name: channelName,
                    members: selectedContacts.map((contact) => contact.value)
                },
                {withCredentials: true}
            )

            if(response.status === 201){
                setChannelName("")
                setSelectedContacts([])
                setNewChannelModal(false)
                addChannels(response.data.channel)
            }
        }
    } catch (error) {
        console.log("Error creating channel", error)
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-opacity-90 text-neutral-400 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setNewChannelModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="border-none text-white bg-[#2f303b]">
            Create New Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Fill in details to create new Channel</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Enter Channel Name"
              className="bg-[#2c2e3b] text-[#6c6d71] rounded-lg p-6 border-none"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
            />
          </div>
          <div>
            <MultipleSelector className="bg-[#2e2e3b] rounded-lg border-none py-2 text-white"
            defaultOptions={allContacts}
            placeholder={"Search Contacts"}
            value={selectedContacts}
            onChange={setSelectedContacts}
            emptyIndicator={
                <p className="text-gray-600 text-lg bg-emerald-100 leading-10">No Result Found</p>
            }
            />
          </div>
          <div>
            <Button 
                className="w-full bg-emerald-600 text-white transition-all duration-300 hover:bg-emerald-700"
                onClick = {createChannel}
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateChannel;
