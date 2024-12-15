import ChatMessages from "@/components/chat/ChatMessages.vue";
import MessageBox from "@/components/chat/MessageBox.vue";
import IndecisionView from "@/views/IndecisionView.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

const mockChatMessages ={
  template: '<div> mockChatMessages!!! </div>'
} 

describe('<IndecisionView/>' , ()=>{
  test('Renders chat messages and messagebox correctly', () => {
    const wrapper = mount(IndecisionView)
    expect(wrapper.findComponent(ChatMessages).exists()).toBe(true)
    expect(wrapper.findComponent(MessageBox).exists()).toBe(true)
  })

  test('calls onMessage when send a message',async ()=>{
    const wrapper = mount(IndecisionView,{
      global:{
        stubs:{ 
          ChatMessages: mockChatMessages
        }
      }
    })

    const messageBoxComponent = wrapper.findComponent(MessageBox)
    messageBoxComponent.vm.$emit('sendMessage','Hola mundo')
    await new Promise((r)=> setTimeout(r,150))
    expect(wrapper.html()).toMatchSnapshot()

  })

})