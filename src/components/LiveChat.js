import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomNames, maekRandomMessage } from "../utils/helper";
import { IoSend } from "react-icons/io5";
const LiveChat = () => {
  const dispatch = useDispatch();
  const [liveMessage, setLiveMessage] = useState("");
  const chatMessages = useSelector((store) => store.chat.messages);
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("API Polling");

      dispatch(
        addMessage({
          name: generateRandomNames(),
          message: maekRandomMessage(20),
        })
      );
    }, 1500);
    return () => clearTimeout(interval);
  }, []);
  return (
    <div>
      <div className=" bg-white w-[400px] py-3 px-4 h-12 z-10 border border-t-gray-400 ml-2 rounded-t-lg">
        <h1 className="font-bold text-xl">Live Chat</h1>
      </div>
      <div className=" live-chat ml-2  bg-slate-100 flex flex-col-reverse  r w-[400px] h-[563px]  border overflow-y-scroll scroll-smooth  border-gray-400 ">
        <div>
          {
            // Disclaimer: Don't use indexces as keys
            chatMessages.map((c, i) => (
              <ChatMessage key={i} name={c.name} message={c.message} />
            ))
          }
        </div>
      </div>

      <form className="w-[400px] p-2 ml-2  flex items-center border border-gray-400 rounded-b-lg" onSubmit={(e)=>{
        e.preventDefault();
        // console.log("ON Form Submit",liveMessage);
        dispatch(addMessage({
          name: "Faiz",
          message: liveMessage,
        }))

        setLiveMessage("");

      
      }} >
        <input
          value={liveMessage}
          onChange={(e) => {
            setLiveMessage(e.target.value);
          }}
          type="text"
          placeholder="Chat..."
          className=" bg-[#292929] w-96 rounded-full h-10 px-4 font-bold text-white "
        ></input>
        <IoSend className="text-4xl mx-5 cursor-pointer " onClick={()=>{
           dispatch(addMessage({
            name: "Faiz",
            message: liveMessage,
          }))
        }}   />
      </form>
    </div>
  );
};

export default LiveChat;
