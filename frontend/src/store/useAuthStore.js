import {create} from "zustand";
import {axiosInstance} from '../lib/axios.js';
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogin : false,
  isUpdateProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try{
      const res = await axiosInstance.get('/auth/check-auth');
      set({authUser: res.data});
    }catch(error){
      console.log("Error in checkAuth: ", error);
      set({authUser: null });
    }finally{
      set({isCheckingAuth : false});
    }
  },
  
  signUp: async(data) => {
    console.log("stateManagement Data: ", data);

    set({isSigningUp: true});
    try{
      const res=await axiosInstance.post("/auth/signup", data);
      set({authUser: res.data});
      toast.success("Account created Succesfully");
      console.log("Error in signup:", error.message);
    }catch(error){
      console.log()
      toast.error(error.response.data.message);
    }finally{
      set({isSigningUp: false});
    }
  },

  login : async(data) => {
    set({isLoggingIn: true});
    try{
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    }catch(error){
      toast.error(error.response.data.message);
    }
  },

  logout: async() => {
    try{
      await axiosInstance.post("/auth/logout");
      set({authUser: null});
      toast.success("logged out successfully");
    }catch{
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

  
}));