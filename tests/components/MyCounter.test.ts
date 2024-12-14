import { describe, expect, test } from 'vitest';
// import MyCounter from '../../src/components/MyCounter.vue'
import MyCounter from '@/components/MyCounter.vue';
import { mount } from '@vue/test-utils';

describe('<MyCounte />', () => {
  test('Should match snapshot', () => {
    const wrapper = mount(MyCounter);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Renders the counter value correctly', () => {
    const value = 5;
    const wrapper = mount(MyCounter, {
      props: {
        value: value,
      },
    });

    const [counterLabel, squareLabel] = wrapper.findAll('h3');

    expect(wrapper.find('h3').text()).toContain(`Counter: ${value}`);
    expect(wrapper.find('[data-testid="square-label"').text()).toContain(
      `Square: ${value * value}`,
    );

    expect(counterLabel.text()).toContain(`Counter: ${value}`);
    expect(squareLabel.text()).toContain(`Square: ${value * value}`);
  });
  test('Incremente the counter when +1 button is clicked', async () => {
    const value = 10;
    const wrapper = mount(MyCounter, {
      props: {
        value: value,
      },
    });
    const [counterLabel, squareLabel] = wrapper.findAll('h3');

    const btnIncrement = wrapper.find('button');
    await btnIncrement.trigger('click');

    expect(counterLabel.text()).contain(`Counter: ${value + 1}`);
    expect(squareLabel.text()).contain(`Square: ${(value + 1) * (value + 1)}`);
  });

  test('Decrements the counter when -1 button is clicked twice', async ()=>{
    const value = 15
    const wrapper = mount(MyCounter, {
      props: {value:value}
    })
    
    const [counterLabel,squareLabel]= wrapper.findAll('h3')
    const [,btnDecrement] = wrapper.findAll('button');
    await btnDecrement.trigger('click')
    await btnDecrement.trigger('click')

    expect(counterLabel.text()).contain(`Counter: ${value - 2 }`);
    expect(squareLabel.text()).contain(`Square: ${(value - 2 ) * (value - 2 )}`);

  })

});
