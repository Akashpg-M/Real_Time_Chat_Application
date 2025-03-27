// import Sidebar from "../components/Sidebar";
// import NoChatComponent from "../components/NoChatComponent";
// import {useChatStore} from "../store/useChatStore.js";

// const HomePage = (req, res) => {
//   const {selectedUser} = useChatStore();

//   return(
//     <div className = "h-screen pt-20 flex flex-col md:flex-row bg-gray-100" >
//       <div className="flex-1 flex items-center justify-center p-6">
//         <Sidebar/>
//         {/* {!selectedUser ? <NoChatSelected/> : <ChatContainer/>} */}
//         <NoChatComponent/>
//       </div>
//     </div>
//   )
// }

// export default HomePage;

import Sidebar from "../components/Sidebar";
import NoChatComponent from "../components/NoChatComponent";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200 flex items-center justify-center pt-20 px-4">
      <div className="bg-base-100 rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-8rem)]">
        <div className="flex h-full rounded-lg overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center p-6">
            {/* {!selectedUser ? <NoChatComponent /> : <ChatContainer />} */}
            <NoChatComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;