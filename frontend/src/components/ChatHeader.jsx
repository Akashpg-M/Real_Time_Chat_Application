import { X } from "lucide-react";
import {useAuthStore} from "../store/useAuthStore";
import {useChatStore} from "../store/useChatStore";

const ChatHeader = () => {
  const {selectedUser, setSelectedUser} = useChatStore();
  const {onlineUsers} = useAuthStore();
  return(
    <div>
      <div>
        {/* profile */}
        <div>
          <img src={selectedUser.profilePic || '/avatar.png'}
                alt = {selectedUser.fullName}/>
        </div>

        {/* user info */}
        <div>
          <h3>{selectedUser.fullName}</h3>
          <p>{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</p>
        </div>

        {/* close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  )
  
}

export default ChatHeader;