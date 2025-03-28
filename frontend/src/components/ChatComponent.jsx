// import ChatHeader from "./ChatHeader";
// import MessageInput from "./MessageInput";
// import {useChatStore} from "../store/useChatStore";
// import {useAuthStore} from "../store/useAuthStore";
// const ChatComponent = () => {
//   const {
//     messages,
//     getMessages,
//     isMessagesLoading,
//     selectedUser,
//   } = useChatStore();

//   const {authUser} = useAuthStore();
  

//   return(
//     <div>
//       <ChatHeader/>
      
//       <div>
//         {messages.map((message) => (
//           <div  
//             key={message._id}
//             className = {`chat ${message.senderId === authUser._id ? "chat-end":"chat-start"}`}
//           >
//             <img
//               src = {
//                 message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || ".avatar.png"
//               }
//               alt="profile pic"
//             />
          

//             <div>
//               <time className="text-xs opacity-50 ml-1">
//                 {formatMessageTime(message.vreatedAt)}
//               </time>
//             </div>

          
//             {message.image && (
//               <img  
//                 src={message.image}
//                 alt="Attachment"
//                 className="sm:max-w-[200px] rounded-md mb-2"
//               />
//             )}
//             {message.text && <p>{message.text}</p>}
//           </div>
//         ))}
//       </div>

//       <MessageInput/>
//     </div>
//   )
// }

// export default ChatComponent;

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatComponent = () => {
  const { messages, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  return (
    <div className="flex flex-col h-full bg-white shadow-md rounded-lg overflow-hidden">
      {/* Chat Header (Top) */}
      <ChatHeader />

      {/* Chat Messages (Middle Section) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-xs sm:max-w-md bg-white p-3 rounded-lg shadow-md">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p className="text-gray-800">{message.text}</p>}
              <time className="text-xs text-gray-500 block mt-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input (Bottom Section) */}
      <MessageInput />
    </div>
  );
};

export default ChatComponent;