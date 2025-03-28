import {useRef, useState} from "react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const[image, setImage] = useState("");
  const fileInput = useRef(null);
  
  const handleImageChange = (e) => {}
  const removeImage = () => {}
  const handleSendMessage = async(e) => {}

  return (
    <div>
      {image && (
        <div>
          <img src={image} alt="Preview" className="w-20 h-20 object-cover rounded-lg border"/>
          <button 
            onClick={removeImage}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
            type='button'
          >
            <X className="size-3"/>
          </button>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div>
          <input  type="text" className="w-full input input-boardered rounded-lg input-sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </form>

        <input  
          type="file"
          accept="image/*"
          className="hidden"  //hideen and this state is managed by teh button compoenent which triggers this
          ref={fileInput}
          onChange={handleImageChange}
        />

        <button 
          type="button"
          onClick={() => fileInput.current?.click()}
        >
          <Image size={20} />
        </button>


      
    </div>
  );
};

export default MessageInput;