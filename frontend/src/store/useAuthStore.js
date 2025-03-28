import {create} from "zustand";
import {axiosInstance} from '../lib/axios.js';
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLogin : false,
  isUpdateProfile: false,

  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,


  checkAuth: async () => {
    try{
      const res = await axiosInstance.get('/auth/check-auth');
      set({authUser: res.data});
      get().connectSocket();
    }catch(error){
      console.log("Error in checkAuth: ", error);
      set({authUser: null });
    }finally{
      set({isCheckingAuth : false});
    }
  },
  
  signUp: async(data) => {

    set({isSigningUp: true});
    try{
      const res=await axiosInstance.post("/auth/signup", data);
      set({authUser: res.data});
      toast.success("Account created Succesfully");
      get().connectSocket()

    }catch(error){
      const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
      console.log("Error in signup:", error.message);
      toast.error(errorMessage);
    }finally{
      set({isSigningUp: false});
    }
  },

  login : async(data) => {
    console.log("Form Data from useAuth :", data);
    set({isLoggingIn: true});
    try{
      const res = await axiosInstance.post("/auth/login", data);

      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    }catch(error){
      toast.error(error.response?.data.message);
    }finally{
      set({isLoggingIn: false});
    }
  },

  logout: async() => {
    try{
      await axiosInstance.post("/auth/logout");
      set({authUser: null});
      toast.success("logged out successfully");
      get().disconnectSocket();
    }catch(error){
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({isUpdatingProfile : true});
    try{
      const res= await axiosInstance.post("/auth/update-profile", data);
      set({authUser: res.data});
      toast.success("Profile updated Successfully");
    }catch(error){
      console.log("error in update profile: ", error);
      toast.error(error.response.data.message);
    }finally{
      set({isUpdatingProfile: false});
    }
  },

  connectSocket : () => {
    const authUser = get().authUser;
    if(!authUser || get().socket?.connected) return;

    const socketConn = io(BASE_URL, {
      query: {
        userId : authUser._id,
      },
    });

    socketConn.connect();

    set({socket: socketConn});

    socketConn.on("getOnlineUsers", (userIds) => {
      set({onlineUsers: userIds})
    })
  },

  disconnectSocket : () => {
    if(get().socket?.connected) get().socket.disconnect();
  },
}));