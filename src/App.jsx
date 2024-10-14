import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import store from "./app/store";
import theme from "./theme";
import ChatComponent from "./components/ChatComponent";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ChatComponent />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
