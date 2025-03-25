import {create} from "zustand";
import {axiosInstance} from '../lib/axios.js';

export const useAuthStore = create((set) => ({
  authUser: null,
  isSignUp: false,
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
  
  SignUp: async(data) => {
    set({isSigningUp: true});
    try{
      const res=await axiosInstance.post("/auth/signup", data);
      set({authUser: res.data});
      toast.success("Account created Succesfully");
      console.log("Error in signup:", error.message);
    }catch(error){
      toast.error(error.response.data.message);
    }finally{
      set({isSigningUp: false});
    }
  },
}));