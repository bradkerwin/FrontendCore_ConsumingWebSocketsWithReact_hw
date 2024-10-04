import { useState, FormEvent } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Socket } from 'socket.io-client'

interface SocketProps {
    socket: Socket;
    user: string

}

const MessagesInput = ({ socket, user }: SocketProps) => {
    const [message, setMessage] = useState("")

    const handleSendMessage = (event: FormEvent) => {
        event.preventDefault();
        socket.emit("message", { user: user, data: message })
        setMessage("");
    }

  return (
    <Form className='my-3' onSubmit={handleSendMessage}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Message: </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your message"
          autoComplete="off"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default MessagesInput;