const ChatComponent = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
  } = useChatStore();

  const {authUser} = useAuthStore();
  

  return(
    <div>
      <ChatHeader/>
      
      <div>
        {messages.map((message) => (
          <div  
            key={message._id}
            className = {`chat ${message.senderId === authUser._id ? "chat-end":"chat-start"}`}
          >
            <img
              src = {
                message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || ".avatar.png"
              }
              alt="profile pic"
            />
          

            <div>
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.vreatedAt)}
              </time>
            </div>

          
            {message.image && (
              <img  
                src={message.image}
                alt="Attachment"
                className="sm:max-w-[200px] rounded-md mb-2"
              />
            )}
            {message.text && <p>{message.text}</p>}
          </div>
        ))}
      </div>

      <MessageInput/>
    </div>
  )
}