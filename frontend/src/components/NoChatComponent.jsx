// import {MessageSquare} from "lucide-react";

// const NoChatComponent = () => {
//   return (
//     <div className="flex flex-col items-center text-center text-gray-600 p-6 bg-white shadow-md rounded-lg">
//       <MessageSquare className='w-8 h-8 text-primary'/>
//       <h2 className="text-xl font-semibold mt-3">Welcome to ChatApp</h2>
//       <p className="text-sm mt-1">Selecte a User from SideBar</p>
//     </div>
//   )
// };

// export default NoChatComponent;


import { MessageSquare } from "lucide-react";

const NoChatComponent = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center"
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Welcome to ChatApp</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
};

export default NoChatComponent;
