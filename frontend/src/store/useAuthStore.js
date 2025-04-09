import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn: false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],

    checkAuth: async() =>{
        try {
            const res = await axiosInstance.get("auth/check");

            set({authUser:res.data});
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({authUser:null});
        } finally {
            set({isCheckingAuth:false});
        }
    },

    signup:async (data) =>{
        set({isSigningUp:true});
        try {
            const res = await axiosInstance.post("auth/signup", data);
            set({authUser:res.data});
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isSigningUp:false});
        }
    },

    login:async (data) =>{
        set({isLoggingIn:true});
        try {
            const res = await axiosInstance.post('auth/login', data);
            set({authUser:res.data});
            toast.success("Successfully Logged In")
        } catch (error) {
            toast.error(error.response.data.message);

        } finally{
            set({isLoggingIn:false});
        }
    },

    logout:async () =>{
        try {
            await axiosInstance.post("auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Error in logout useAuthStore");
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/auth/update-profile", data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }finally {
          set({ isUpdatingProfile: false });
        }
      },
    
}));