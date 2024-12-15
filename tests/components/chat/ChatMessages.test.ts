import ChatMessages from "@/components/chat/ChatMessages.vue"
import type { ChatMessage } from "@/interfaces/chat-message.interface"
import { mount } from "@vue/test-utils"
import { describe, expect, test, vi } from "vitest"

const messages:ChatMessage[] =[
{id:1,message:'a',itsMine:true},
{id:2,message:'ab',itsMine:false, image:'http://hola-mundo.jpg'},
]

describe('<ChatMessages />',()=>{
  const wrapper=mount(ChatMessages,{
    props:{
      messages
    }
  })
  test('render chat messages correctly ',()=>{

    const chatBubbles = wrapper.findAllComponents({name:'ChatBubble'})
    expect(chatBubbles.length).toBe(messages.length)
  })

  test('scrolls down to the bottom after messages update', async() => {
    const scrollToMock = vi.fn();
    // console.log(scrollToMock)
    const chatRef = wrapper.vm.$refs.chatRef as HTMLDivElement
    chatRef.scrollTo = scrollToMock

    await wrapper.setProps({
      messages: [...messages, {id:3,message:'abc', itsMine:true}]
    })
    
    await new Promise((r)=> setTimeout(r,150))

    expect(scrollToMock).toHaveBeenCalledTimes(1)
    expect(scrollToMock).toHaveBeenCalledWith({
      behavior: 'smooth',top:expect.any(Number)
    })
  })
})