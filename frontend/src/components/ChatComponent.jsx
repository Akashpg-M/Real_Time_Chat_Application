// import ChatHeader from "./ChatHeader";
// import MessageInput from "./MessageInput";
// import {useEffect } from "react";
// import { useChatStore } from "../store/useChatStore";
// import { useAuthStore } from "../store/useAuthStore";
// import { Loader } from "lucide-react";

// // import { formatMessageTime } from "../lib/utils";

// const ChatComponent = () => {
//   const { messages, selectedUser, getMessages, isMessagesLoading } = useChatStore();
//   const { authUser } = useAuthStore();

//   if (!authUser || !selectedUser) {
//     console.warn("⚠️ authUser or selectedUser is null. Showing Loader...");
//     return <Loader />;
//   }
//   console.log("✅ authUser & selectedUser are ready:", authUser, selectedUser);

//   useEffect(() => {
//     console.log("🟡 useEffect triggered - Checking selectedUser...");
  
//     if (selectedUser?._id) {
//       console.log(`📩 Fetching messages for user: ${selectedUser._id}`);
//       getMessages(selectedUser._id);
//     } else {
//       console.warn("⚠️ No selectedUser found. Skipping message fetch.");
//     }
//   }, [selectedUser, getMessages]);

//   return (
//     <div className="flex flex-col h-full bg-white shadow-md rounded-lg overflow-hidden w-full ">
//       {/* Chat Header (Top) */}
//       <ChatHeader />

//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
//         {messages.length === 0 && <p className="text-center text-gray-500">No messages yet</p>}
//         {messages.map((message, index) => {
//           console.log("📩 Rendering message:", message); // ✅ Debugging UI updates

//           return (
//             <div
//               key={message._id || index}
//               className={`flex w-full ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`max-w-xs sm:max-w-md p-3 rounded-lg shadow-md ${
//                   message.senderId === authUser._id ? "bg-white text-gray-800" : "bg-blue-500 text-white"
//                 }`}
//               >
//                 {message.image && (
//                   <img src={message.image} alt="Attachment" className="sm:max-w-[200px] rounded-md mb-2" />
//                 )}
//                 {message.text && <p>{message.text}</p>}
//                 <time className="text-xs opacity-50 block mt-1">
//                   {message.createdAt}
//                 </time>
//               </div>
//             </div>
//           );
//         })}
//       </div>


//       {/* Message Input (Bottom Section) */}
//       <MessageInput />
//     </div>
//   );
// };

// export default ChatComponent;


import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatComponent = () => {
  const { messages, selectedUser, getMessages, connectToMessages, disconnectToMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageRef = useRef(null); //for automatic scrool

  useEffect(() => {
    getMessages(selectedUser._id);
    connectToMessages();

    return () => disconnectToMessages(); //for permormance reson
  }, [selectedUser._id, getMessages, connectToMessages, disconnectToMessages]);

  useEffect(() => {
    if(messageRef.current && messages.length > 0){
      messageRef.current.scrollIntoView({behavior : "smooth"});
    }
  },[messages]);

  return (
    <div className="flex flex-col h-full bg-white shadow-md rounded-lg overflow-hidden w-full">
      {/* Chat Header */}
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100"
            ref={messageRef}
      >
        {messages.map((message) => (

            <div key={message._id} className={`flex w-full ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}>
            <div  className={`max-w-xs sm:max-w-md p-3 rounded-lg shadow-md ${message.senderId === authUser._id ? "bg-white text-gray-800" : "bg-blue-500 text-white"}`}>
              {message.image && (<img src={message.image} alt="Attachment" className="sm:max-w-[200px] rounded-md mb-2" />)}
              {message.text && <p>{message.text}</p>}
              <time className="text-xs opacity-50 block mt-1">
                {new Date(message.createdAt).toLocaleTimeString()}
              </time>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <MessageInput />
    </div>
  );
};

export default ChatComponent;
