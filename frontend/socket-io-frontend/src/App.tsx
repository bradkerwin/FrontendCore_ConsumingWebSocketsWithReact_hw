import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { io } from "socket.io-client";
import MessagesInput from "./components/MessagesInput";
import ChatBody from "./components/ChatBody";

const socket = io("http://127.0.0.1:5000", {
  autoConnect: false,
});

function App() {
  const [isConnected, setIsConnected] = useState(false);

  const [username, setUsername] = useState("");

  const handleConnect = () => {
    socket.connect(); // socket.connect() is the function that will connect to our server to establish our FDC (full duplex connection). This initiates our handshake.
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    socket.disconnect();
    setIsConnected(false);
  };

  return (
    <Container>
      <h3>
        Connection Status: {isConnected ? "Connected" : "Not Connected :("}
      </h3>
      <>
        {isConnected ? (
          <>
            <ChatBody socket={socket} />
            <MessagesInput socket={socket} user={username} />
            <Button variant="danger" onClick={handleDisconnect}>
              Disconnect
            </Button>
          </>
        ) : (
          <>
            <Form onSubmit={handleConnect}>
              <Form.Group controlId="formUsernameInput">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(username) => setUsername(username.target.value)}
                />
                <Button className="mt-3" type="submit">Connect</Button>
              </Form.Group>
            </Form>
          </>
        )}
      </>
    </Container>
  );
}

export default App;
