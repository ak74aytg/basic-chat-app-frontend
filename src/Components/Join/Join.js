import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Image,
  Input,
} from "@chakra-ui/react";
let user;

function JoinComponent() {
    const navigate = useNavigate();
  const [input, setInput] = useState("");
  

  const handleInputChange = (e) => setInput(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
      if (input !== "") {
          user = document.getElementById('joinInput').value;
          navigate('/chat')
      }
    // Optionally, you can navigate to another route here
  };

  return (
    <Container className="contain" mt="5" pt="5" maxW="sm">
      <Box className="box" boxSize="300px">
        <Image src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Messaggio_ValeJappo.png" />
      </Box>
      <form onSubmit={submitHandler}>
        <FormControl mt="5">
          <FormLabel fontSize="xl">Name</FormLabel>
          <Input
            id="joinInput"
            type="text"
            value={input}
            onChange={handleInputChange}
            mb="5"
          />
          <Button className="joinButton" width="350px" type="submit" colorScheme="twitter">
            Join
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}

export default JoinComponent;
export { user };
