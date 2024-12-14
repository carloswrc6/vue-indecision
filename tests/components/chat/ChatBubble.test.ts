import ChatBubble from "@/components/chat/ChatBubble.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

describe('<ChatBubble />', ()=>{
  test('Render own message correctly', ()=>{
    const message = 'Hola mundo'
    const wrapper  = mount(ChatBubble,{
      props:{
        message:message,
        itsMine:true
      }
    })

    expect(wrapper.find('.bg-blue-200').exists()).toBe(true)
    expect(wrapper.find('.bg-blue-200').exists()).toBeTruthy()
    expect(wrapper.find('.bg-blue-200').text()).contain(message)
    expect(wrapper.find('.bg-blue-300').exists()).toBeFalsy()

  })

  test('Renders received message correctly', ()=>{
    const message = 'No'
    const wrapper  = mount(ChatBubble,{
      props:{
        message:message,
        itsMine:false
      }
    })

    expect(wrapper.find('.bg-gray-300').exists()).toBe(true)
    expect(wrapper.find('.bg-gray-300').exists()).toBeTruthy()
    expect(wrapper.find('.bg-gray-300').text()).contain(message)
    expect(wrapper.find('.bg-blue-200').exists()).toBeFalsy()
    expect(wrapper.find('img').exists()).toBeFalsy()
  })

  test('Renders received message with images', ()=>{
    const message = 'No'
    const image = 'http://example.jpg'
    const wrapper  = mount(ChatBubble,{
      props:{
        message:message,
        itsMine:false,
        image: image
      }
    })

    expect(wrapper.find('.bg-gray-300').exists()).toBe(true)
    expect(wrapper.find('.bg-gray-300').exists()).toBeTruthy()
    expect(wrapper.find('.bg-gray-300').text()).contain(message)
    expect(wrapper.find('.bg-blue-200').exists()).toBeFalsy()
    expect(wrapper.find('img').exists()).toBeTruthy()
    expect(wrapper.find('img').attributes('src')).contain(image)
  })

})