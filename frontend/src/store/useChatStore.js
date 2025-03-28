import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance} from "../lib/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // for side bar
  getUsers: async() => {
    set({isUserLoading: true});
    try{
      const res = await axiosInstance.get("/messages/users");
      console.log('getUSer frontend: ', res.data);
      set({users: res.data});
    }catch(error){
      toast.error(error.response.data.message);
    } finally{
      set({isUserLoading: false});
    }
  },

  //message fro specific user
  getMessages : async (userId) => {
    set({ isMessagesLoading: true});
    try{
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({messages: res.data});
    }catch(error){
      toast.error(error.response.data.message);
    }finally{
      set({isMessageLoading: false});
    }
  },

  //send message for specific user
  sendMessage: async(messageData) => {
    const {selectedUser, messages} = get();
    try{
      console.log("sendingMessage to :", selectedUser)
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      console.log("fetched response: ", res.data);
      
      set({messages: [...messages, res.data]})
    }catch(error){
      toast.error(error.response.data.message);
    }
  },

  setSelectedUser: (selectedUser) => set({selectedUser}),
}))