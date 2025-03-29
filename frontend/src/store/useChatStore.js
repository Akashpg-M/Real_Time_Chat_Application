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

  // getMessages: async (userId) => {
  //   set({ isMessagesLoading: true });
  //   try {
  //     const res = await axiosInstance.get(`/messages/${userId}`);
  //     console.log("✅ Messages Received from Backend:", res.data); // Log fetched messages
  //     set({ messages: res.data });
  //   } catch (error) {
  //     console.error("❌ Error fetching messages:", error.response?.data?.message || error.message);
  //     toast.error(error.response?.data?.message || "Failed to fetch messages");
  //   } finally {
  //     set({ isMessagesLoading: false });
  //   }
  // },
  
  // sendMessage: async (messageData) => {
  //   const { selectedUser, messages } = get();
  
  //   try {
  //     console.log("📤 Sending Message to:", selectedUser, messageData);
  //     const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
  //     console.log("✅ Message Sent, Server Response:", res.data); // Log backend response
  
  //     set((state) => ({ messages: [...state.messages, res.data] })); // ✅ Ensures reactivity
  //     get().getMessages(selectedUser._id);

  //   } catch (error) {
  //     console.error("❌ Error sending message:", error.response?.data?.message || error.message);
  //     toast.error(error.response?.data?.message || "Failed to send message");
  //   }
  // },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true, messages: [] }); // ✅ Reset messages before fetching new ones
  
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      console.log("✅ Messages Received from Backend:", res.data);
      set({ messages: res.data });
    } catch (error) {
      console.error("❌ Error fetching messages:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      console.error("❌ No selected user to send message.");
      return;
    }
  
    try {
      console.log("📤 Sending Message to:", selectedUser, messageData);
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      console.log("✅ Message Sent, Server Response:", res.data);
  
      set({ messages: [...messages, res.data] }); // ✅ Ensures reactivity
      await get().getMessages(selectedUser._id); // ✅ Refresh messages after sending
  
    } catch (error) {
      console.error("❌ Error sending message:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },
  
  setSelectedUser: (selectedUser) => set({selectedUser}),
}))