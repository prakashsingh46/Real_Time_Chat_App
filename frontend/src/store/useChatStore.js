import {create} from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"
import { useAuthStore } from "./useAuthStore";
// import { sendMessage } from "../../../backend/src/controllers/message.controller";

export const useChatStore = create((set, get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessageLoading:false,

    getUsers: async ()=>{
        set({isUserLoading:true});
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users:res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isUserLoading:false});
        }
    }, 

    getMessages: async(userId)=>{
        set({isMessageLoading:true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isMessageLoading:false});
        }
    },

    sendMessage: async (messageData) => {
        const {selectedUser, messages} = get();
        try {
            const res =await axiosInstance.post(`messages/send/${selectedUser._id}`,messageData);
            set({messages : [...messages, res.data]});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    subscribeToMessages: ()=>{
        const {selectedUser} = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        
        socket.on("newMessage", (newMessage)=>{

            // this ensures message will be send to intended user not random selected
            const isMessageSentFromSelectedUser = newMessage.senderId===selectedUser._id;
            if(!isMessageSentFromSelectedUser) return;
            set({
                messages:[...get().messages, newMessage],
            });
        });
    },

    unsubscribeToMessages: ()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },
    setSelectedUser: (selectedUser) => set({selectedUser})
}))