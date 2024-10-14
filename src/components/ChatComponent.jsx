import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage } from "../features/chatSlice";
import {
  Box,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Slide,
  Container,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/system";
import { deepPurple, pink, grey } from "@mui/material/colors";

// Styled components for the chat layout
const ChatContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  justifyContent: "center",
  padding: 0,
  maxWidth: "sm",
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
}));

const ChatWindow = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  padding: theme.spacing(2),
  backgroundColor: grey[100],
  backgroundImage: 'url("/background-pattern.png")',
  backgroundSize: "cover",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
}));

const MessageContainer = styled(Box)(({ theme, isCurrentUser }) => ({
  display: "flex",
  flexDirection: isCurrentUser ? "row-reverse" : "row",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const MessageBubble = styled(Paper)(({ theme, isCurrentUser }) => ({
  backgroundColor: isCurrentUser ? deepPurple[500] : pink[400],
  color: theme.palette.common.white,
  padding: theme.spacing(1.5, 2),
  borderRadius: "20px",
  maxWidth: "70%",
  wordWrap: "break-word",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  fontSize: "1rem",
  position: "relative",
  transition: "transform 0.3s ease-in-out",
  borderTopRightRadius: isCurrentUser ? 0 : "20px",
  borderTopLeftRadius: isCurrentUser ? "20px" : 0,
}));

const MessageInfo = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  color: "#fff",
  marginTop: theme.spacing(0.5),
  opacity: 0.8,
  display: "block",
  textAlign: "right",
}));

const InputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: "30px",
  boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.05)",
  border: `1px solid ${theme.palette.divider}`,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  marginRight: theme.spacing(1),
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    padding: theme.spacing(1.5),
    "& fieldset": {
      borderColor: theme.palette.grey[300],
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(1),
  width: theme.spacing(5),
  height: theme.spacing(5),
}));

const randomMessages = [
  "How are you doing today?",
  "That sounds interesting!",
  "Tell me more about that.",
  "I agree with you.",
  "What are your thoughts on this?",
  "This is so exciting!",
  "I didn't expect that!",
  "Thanks for sharing!",
  "Let's discuss this further.",
];

// Main ChatComponent
const ChatComponent = () => {
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  // Random message generation
  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * randomMessages.length);
    return randomMessages[randomIndex];
  };

  // Send message logic
  const handleSend = () => {
    if (inputValue.trim()) {
      // Send current user's message
      dispatch(sendMessage({ text: inputValue, user: "User1" }));
      setInputValue(""); // Clear input field after sending

      // Simulate a response from User2 with a random message
      setTimeout(() => {
        const randomMessage = getRandomMessage();
        dispatch(sendMessage({ text: randomMessage, user: "User2" }));
      }, 1000); // Delay to mimic real conversation
    }
  };

  // Auto-scroll to bottom when new messages are received
  useEffect(() => {
    const chatWindow = document.getElementById("chat-window");
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatContainer>
      <AppBar position="sticky" sx={{ borderRadius: "16px", marginBottom: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Chat App
          </Typography>
        </Toolbar>
      </AppBar>

      <ChatWindow id="chat-window">
        {messages.map((msg, index) => (
          <Slide
            direction={msg.user === "User1" ? "left" : "right"}
            in={true}
            key={index}
            mountOnEnter
            unmountOnExit
          >
            <MessageContainer isCurrentUser={msg.user === "User1"}>
              <UserAvatar
                sx={{
                  backgroundColor:
                    msg.user === "User1" ? deepPurple[500] : pink[400],
                }}
              >
                {msg.user[0]}
              </UserAvatar>
              <MessageBubble isCurrentUser={msg.user === "User1"} elevation={3}>
                <Typography variant="body1">{msg.text}</Typography>
                <MessageInfo>{msg.timestamp}</MessageInfo>
              </MessageBubble>
            </MessageContainer>
          </Slide>
        ))}
      </ChatWindow>

      <InputContainer>
        <StyledTextField
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          sx={{
            backgroundColor: deepPurple[500],
            color: "white",
            borderRadius: "50%",
            padding: 1.5,
            "&:hover": {
              backgroundColor: deepPurple[700],
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatComponent;
