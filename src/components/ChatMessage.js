import React from 'react'
import { FaUserCircle } from 'react-icons/fa';

const ChatMessage = ({name,message}) => {
  return (
    <div className='flex gap-2 items-center shadow-sm p-2'>
         <FaUserCircle className="md:text-2xl " />

         <span className='font-bold px-2'>{name}</span>
         <span>{message}</span>
    </div>
  )
}

export default ChatMessage;