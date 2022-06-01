import { useEffect, useRef, useState } from "react";
import styles from './Messages.module.scss';

const Messages: React.FC = ({ children }) => {
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const messagesParentRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)
  // const isAutoScroll = useRef(true)

  const autoObserver = useRef<any>();

  useEffect(() => {
    const options = {
      root: messagesParentRef.current,
      rootMargin: '0px 0px 20px 0px',
      threshold: 0
    }

    autoObserver.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsAutoScroll(true)
      } else {
        setIsAutoScroll(false)
      }
    }, options)
    if (messagesAnchorRef.current) {
      autoObserver.current.observe(messagesAnchorRef.current)
    }


    return () => {
      autoObserver.current.disconnect()
    }
  }, [messagesAnchorRef])


  // useEffect(() => {
  //   const scrollHandler = (e: Event) => {
  //     const el: HTMLDivElement = e.currentTarget as HTMLDivElement;
  //     if (Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 100) {
  //       // setIsAutoScroll(true)
  //       isAutoScroll.current = true
  //     } else {
  //       // setIsAutoScroll(false)
  //       isAutoScroll.current = false
  //     }
  //   }

  //   messagesParentRef.current?.addEventListener('scroll', scrollHandler);

  //   return () => messagesParentRef.current?.removeEventListener('scroll', scrollHandler)
  // }, [messagesParentRef.current])

  useEffect(() => {
    if (isAutoScroll) {
      // if (isAutoScroll.current) {

      messagesAnchorRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
    }
  }, [children, isAutoScroll, messagesAnchorRef])

  return (<div className={styles.messagesWrapper} ref={messagesParentRef} >
    {children}
    <div className="" ref={messagesAnchorRef}></div>
  </div>
  )
}

export default Messages;
