import { createSlice } from "@reduxjs/toolkit";
import { LIVE_CHAT_COUNT, OFFSET_LIVE_CHAT } from "./constants";



const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
    },

    reducers: {
        addMessage: (state,action)=>{
            if(state.messages.length){
                state.messages.splice(LIVE_CHAT_COUNT,1);
            }
                state.messages.push(action.payload);
        }
    }
});

export const {addMessage}  = chatSlice.actions;

export default chatSlice.reducer;

