import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import {
  Box,
  Circle,
  HStack,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import Message from "../Messages/Message";
import ReactScrollToBottom from "react-scroll-to-bottom"
import sendIcon from "../../assets/icons8-send-30.png"


const ENDPOINT = "http://localhost:5000";
let socket;

function Chat() {

  const [messages, setMessages] = useState([]);
  const [id, setId] = useState("");

  const send = () => {
    const message = document.getElementById('inputMessage').value;
    socket.emit('message', { message, id })
    document.getElementById("inputMessage").value = null;
  }

  console.log(messages)
  
  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      alert('Connected');
      console.log("connected");
      setId(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(`${data.User}: ${data.message}`);
    });

    socket.on("newUser", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(`${data.User}: ${data.message}`);
    });

    socket.on('left', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(`${data.User}: ${data.message}`); 
    })

    socket.on("sendMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.User, data.message, data.id);
    });

    return () => {
      socket.off();
    }
  }, []);

  

  return (
    <div className="back">
      <Box
        className="border"
        borderColor="black"
        width="70%"
        borderBottomRadius="2%"
        pt="0"
        h="90%"
        display="flex"
        flexDir="column"
        alignItems="center"
        bg="white"
        position="absolute"
      >
        <div className="title">
          <Text fontSize="30px" color="#4e3510">
            Messaggio
          </Text>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, index) => (
            <Message
              classs={item.id === id ? "right" : "left"}
              user={item.id === id ? null : item.User}
              key={index}
              message={item.message}
            />
          ))}
        </ReactScrollToBottom>
        <HStack
          className="hstack"
          position="absolute"
          mb="2"
          h="60px"
          //   width="98%"
          w="90%"
          bottom="0"
        >
          <Box w="100%">
            <Input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  send();
                }
              }}
              id="inputMessage"
              width="98%"
              bg="#dca757"
            />
          </Box>

          <Circle
            onClick={send}
            cursor="pointer"
            ml="0"
            size="50px"
            bg="tomato"
            color="white"
          >
            <Image src={sendIcon} />
          </Circle>
        </HStack>
      </Box>
    </div>
  );
}

export default Chat;
