import { useChat } from "@/composables/useChat";
import { describe, expect, test } from "vitest";

describe('useChat',()=>{
  test('add message correctly when onMessage is called',async ()=>{
    const text = 'Hola mundo'
    const {messages,onMessage} = useChat()
    await onMessage(text)
    // console.log('messages -> ',messages)
    
    expect(messages.value.length).toBe(1)
    expect(messages.value[0]).toEqual({
      id: expect.any(Number),
      itsMine: true,
      message: text
    })

  })

  test('add nothing if text is empty',async ()=>{
    const text = ''
    const {messages,onMessage} = useChat()
    await onMessage(text)
    expect(messages.value.length).toBe(0)

  })

  test('gets her response correctly when message ends with "?" ',async ()=>{
    const text = '¿Quieres cafe?'
    const { messages,onMessage} = useChat()
    await onMessage(text)
    await new Promise((r)=> setTimeout(r,2000) )
    
    const [myMessage,herMessage]=messages.value
    // console.log(messages)
    expect(messages.value.length).toBe(2)
    expect(herMessage).toEqual({
      id: expect.any(Number),
      image: expect.any(String),
      message: expect.any(String),
      itsMine: false,
    })

    expect(myMessage).toEqual({
      id: expect.any(Number),
      message: text,
      itsMine: true,
    })

  })

})  