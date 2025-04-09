import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { ChatHeader } from './ChatHeader';
import { MessageInput } from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { formatMessageTime } from '../lib/utils';
import { useAuthStore } from '../store/useAuthStore';


export const ChatContainer =()=> {
  const {messages, getMessages, isMessageLoading, selectedUser} = useChatStore();
  const {authUser} = useAuthStore();
  useEffect(()=>{
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);
  if(isMessageLoading) return (
    <div className='flex-1 flex-col overflow-auto'>
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />

    </div>
  );
  return (
    <div className='flex-1 flex-col overflow-auto'>
      <ChatHeader />
      
        <div className='flex-1 h-[calc(80vh-4rem)] overflow-y-auto p-4 space-y-4'>
          {messages.map((message)=>(
            <div key={message._id} 
              className={`chat ${message.senderId===authUser._id ? "chat-end" : "chat-start"}`}
            >
              <div className='chat image avatar'>
                <div className='size-10 rounded-full border'>
                  <img src={message.senderId===authUser._id ? authUser.profilePic || "/images.png" : selectedUser.profilePic || "/images.png"} alt="profile pic" />
                </div>

              </div>

              <div className='chat-header mb-1'>
                <time className='text-xs opacity-50 ml-1'>
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              <div className='chat-bubble flex-1'>
                {message.image && (
                  <img src={message.image} alt="Attachment" className='sm:max-w-[200px] rounded-md mb-2' />
                )}

                {message.text && <p>{message.text}</p>}
              </div>
            </div>

          ))}
        </div>

      <MessageInput />
    </div>
  );
};

