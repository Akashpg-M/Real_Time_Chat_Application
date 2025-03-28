// import { X } from "lucide-react";
// import {useAuthStore} from "../store/useAuthStore";
// import {useChatStore} from "../store/useChatStore";

// const ChatHeader = () => {
//   const {selectedUser, setSelectedUser} = useChatStore();
//   // const {onlineUsers} = useAuthStore();
//   const onlineUsers = [];

//   return(
//     <div>
//       <div>
//         {/* profile */}
//         <div>
//           <img src={selectedUser.profilePic || '/avatar.png'}
//                 alt = {selectedUser.fullName}/>
//         </div>

//         {/* user info */}
//         <div>
//           <h3>{selectedUser.fullName}</h3>
//           <p>{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</p>
//         </div>

//         {/* close button */}
//         <button onClick={() => setSelectedUser(null)}>
//           <X />
//         </button>
//       </div>
//     </div>
//   )
  
// }

// export default ChatHeader;

import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  return (
    <div className="flex items-center justify-between bg-gray-200 p-4 border-b border-gray-300">
      {/* Profile Picture */}
      <div className="flex items-center gap-3">
        <img
          src={selectedUser.profilePic || "/avatar.png"}
          alt={selectedUser.fullName}
          className="w-10 h-10 rounded-full object-cover border"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{selectedUser.fullName}</h3>
          <p className="text-sm text-gray-600">
            {true ? "Online" : "Offline"} {/* Replace with online status logic */}
          </p>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="text-gray-600 hover:text-gray-900"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default ChatHeader;
