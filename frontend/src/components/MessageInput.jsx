// import {useRef, useState} from "react";
// import {Send, Image, X} from 'lucide-react';
// import {useChatStore} from "../store/useChatStore";

// const MessageInput = () => {
//   const [text, setText] = useState("");
//   const [image, setImage] = useState("");
//   const fileInput = useRef(null);
//   const {sendMessage} = useChatStore();
  
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if(!file.type.startsWith("image/")){
//       toast.error("Please select an image file");
//       return;
//     }
    
//     const imageUrl = URL.createObjectURL(file);
//     setImage(imageUrl);
//   }

//   const removeImage = () => {
//     setImage(null);
//     if(fileInput.current) fileInput.current.value="";
//   }

//   const handleSendMessage = async(e) => {
//     e.preventDefault();
//     if(!text.trim() && !image) return;

//     try{
//       await sendMessage({
//         text: text.trim(),
//         image: imagePreview,
//       });

//       //clearing after input is send
//       setText("");
//       setImage(null);
//       if(fileInput.current) fileInput.current.value = "";
//     }catch(error){
//       console.log('Faild to send Message');
//     }
//   };

//   return (
//     <div>
//       {image && (
//         <div>
//           <img src={image} alt="Preview" className="w-20 h-20 object-cover rounded-lg border"/>
//           <button 
//             onClick={removeImage}
//             className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
//             type='button'
//           >
//             <X className="size-3"/>
//           </button>
//         </div>
//       )}

//       <form onSubmit={handleSendMessage} className="flex items-center gap-2">
//         <div>
//           <input  type="text" className="w-full input input-boardered rounded-lg input-sm"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />
//         </div>
      
//         <div>
//           <input  
//             type="file"
//             accept="image/*"
//             className="hidden"  //hideen and this state is managed by teh button compoenent which triggers this
//             ref={fileInput}
//             onChange={handleImageChange}
//           />

//           <button 
//             type="button"
//             className={'hidden ${imagePreview ? "text-emarald-500 : text-zinc-400'}
//             onClick={() => fileInput.current?.click()}
//           >
//             <Image size={20} />
//           </button>
//         </div>

//         <button type="submit" diabled={!text.trim() && !image}>
//           <Send size={22}/>
//         </button>

//       </form>
//     </div>
//   );
// };

// export default MessageInput;


import { useRef, useState } from "react";
import { Send, Image, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const fileInput = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const removeImage = () => {
    setImage(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: image,
      });

      // Clearing input after sending
      setText("");
      setImage(null);
      if (fileInput.current) fileInput.current.value = "";
    } catch (error) {
      console.log("Failed to send Message");
    }
  };

  return (
    <div className="p-4 bg-gray-200 border-t border-gray-300">
      {image && (
        <div className="relative mb-2">
          <img src={image} alt="Preview" className="w-20 h-20 object-cover rounded-lg border" />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 w-5 h-5 bg-white border rounded-full flex items-center justify-center"
            type="button"
          >
            <X className="w-3 h-3 text-red-500" />
          </button>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        {/* Text Input */}
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />

        {/* Image Upload Button */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInput}
          onChange={handleImageChange}
        />
        <button
          type="button"
          className={`p-2 rounded-lg ${
            image ? "text-green-500" : "text-gray-500"
          } hover:bg-gray-300`}
          onClick={() => fileInput.current?.click()}
        >
          <Image size={20} />
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() && !image}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
