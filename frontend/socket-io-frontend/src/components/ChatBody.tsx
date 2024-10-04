import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { Card } from 'react-bootstrap'

interface SocketProps {
    socket: Socket
}

interface Message {
    data: String
    user: String
}

const ChatBody = ({ socket }: SocketProps) => {
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        // socket.on() checks for when a "message" event occurs and then executes the function.
        socket.on('message', (message: Message) => {
            console.log(message);
            setMessages([...messages, message])

        })
    }, [messages, socket])

  return (
    <>
    {
        messages.map((message) => (
            <Card>
                <Card.Title>{message.user}</Card.Title>
                <Card.Body>{message.data}</Card.Body>
            </Card>
        ))
    }
    </>
  )
}

export default ChatBody