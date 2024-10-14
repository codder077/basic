import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    sendMessage: (state, action) => {
      const message = {
        ...action.payload,
        timestamp: new Date().toLocaleTimeString(),
      };
      state.messages.push(message);
    },
  },
});

export const { sendMessage } = chatSlice.actions;
export default chatSlice.reducer;
