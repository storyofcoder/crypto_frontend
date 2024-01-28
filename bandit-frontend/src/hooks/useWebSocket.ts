import { useEffect, useState } from "react";

const socketUrl = process.env.NEXT_PUBLIC_WS

const useWebSocket = () => {
  const [lastMessage, setLastMessage] = useState(null)
  let client = null

  useEffect(() => {
    client = new WebSocket(socketUrl)

    setUp()
  }, [])

  function setUp() {
    client.onopen = () => {
      console.log('opened')
    }

    client.onmessage = (message) => {
      incomingMessageListener(message)
    }

    client.onclose = function () {
      console.log('closed')
    }
  }

  function incomingMessageListener(message) {
    const data = JSON.parse(message.data)
    setLastMessage(data)
  }

  function sendMessage(data) {
    if (client.readyState !== 1) {
      return setUp()
    }
    client.send(JSON.stringify(data))
  }

  return { lastMessage, sendMessage, readyState: client?.readyState }
}

export default useWebSocket
