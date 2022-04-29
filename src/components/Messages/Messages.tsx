import { useEffect, useRef, useState } from "react";

const Messages: React.FC = ({ children }) => {
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
  }, [children, isAutoScroll])

  return (<div className="" style={{ height: '60vh', overflowY: 'auto' }} onScroll={scrollHandler}>
    {children}
    <div className="" ref={messagesAnchorRef}></div>
  </div>
  )
}

export default Messages;
