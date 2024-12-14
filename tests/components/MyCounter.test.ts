
import {describe,expect,test} from 'vitest'
// import MyCounter from '../../src/components/MyCounter.vue'
import MyCounter from '@/components/MyCounter.vue'
import {mount} from '@vue/test-utils'

describe('<MyCounte />', ()=>{
  test('Should match snapshot', ()=>{
     const wrapper = mount(MyCounter) 
     expect(wrapper.html()).toMatchSnapshot()
  })

  test('Renders the counter value correctly', ()=>{
    const value=5
    const wrapper = mount(MyCounter, {
      props:{
        value:value
      }
    })
    
    const [counterLabel, squareLabel ] = wrapper.findAll('h3')
    
    expect(wrapper.find('h3').text()).toContain(`Counter: ${value}`)
    expect(wrapper.find('[data-testid="square-label"').text()).toContain(`Square: ${value*value}`)

    expect(counterLabel.text()).toContain(`Counter: ${value}`)
    expect(squareLabel.text()).toContain(`Square: ${value*value}`)

  })
})