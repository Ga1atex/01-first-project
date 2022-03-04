

const subscribers = {
  'messages-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[]
}
let ws: WebSocket | null = null

const closeHandler = () => {
  setTimeout(() => {
    createChannel();
  }, 3000);
};



const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers['messages-received'].forEach(sub => sub(newMessages))
};
const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
}


function createChannel() {
  cleanUp()
  ws?.close()

  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
}


export const chatAPI = {
  start() {
    createChannel()
  },
  stop() {
    subscribers['messages-received'] = []
    subscribers['status-changed'] = []
    cleanUp()
    ws?.close()
  },
  subscribe(eventName: EventNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    //@ts-ignore
    subscribers[eventName].push(callback)
    return () => {
      //@ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(sub => sub !== callback)
    }
  },
  unsubscribe(eventName: EventNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    //@ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(sub => sub !== callback)
  },
  sendMessage(message: string) {
    ws?.send(message)
  }
}


type EventNamesType = 'messages-received' | 'status-changed'
type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
export type StatusType = 'pending' | 'ready' | 'error'

export type ChatMessageAPIType = {
  message: string,
  photo: string,
  userId: number,
  userName: string
}
