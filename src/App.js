// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinComponent from "./Components/Join/Join";
import Chat from "./Components/Chats/Chat";
import { ChakraProvider } from "@chakra-ui/react";
import "./style.css";

function App() {
  return (
    <ChakraProvider bg="ghostwhite">
      <div className="body">
        <Router>
          <Routes>
            <Route path="/" element={<JoinComponent />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
