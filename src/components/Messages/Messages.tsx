import { useEffect, useRef, useState } from "react";
import Message from "../common/Message/Message";
import { ChatMessageType } from "../../redux/reducers/chatReducer/chatReducer"

type PropsType = {
  messages: ChatMessageType[]
}

const Messages: React.FC<PropsType> = ({ messages }) => {
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const el = e.currentTarget;
    if (Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 100) {
      !isAutoScroll && setIsAutoScroll(true)
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }
    // setIsAutoScroll(Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 100)
  }

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isAutoScroll])

  return (<div className="" style={{ height: '60vh', overflowY: 'auto' }} onScroll={scrollHandler}>
    {messages.map((messageObj) => <Message key={messageObj.id} message={messageObj} />)}
    <div className="" ref={messagesAnchorRef}></div>
  </div>
  )
}

export default Messages;
