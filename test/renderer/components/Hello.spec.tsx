import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { HelloComponent, HelloComponentProps } from '../../../src/renderer/components/Hello';

interface IWrapperAndMocks {
  wrapper: ShallowWrapper;
  mockSetValue: jest.Mock;
  mockIncrement: jest.Mock;
  mockDecrement: jest.Mock;
  mockExecuteLs: jest.Mock;
}

const getWrapperAndMocks = (value: number, output: string, error: string): IWrapperAndMocks => {
  const mockSetValue = jest.fn();
  const mockIncrement = jest.fn();
  const mockDecrement = jest.fn();
  const mockExecuteLs = jest.fn();

  const props: HelloComponentProps = {
    error,
    output,
    value,
    decrement: mockDecrement,
    executeLs: mockExecuteLs,
    increment: mockIncrement,
    setValue: mockSetValue,
  };

  const wrapper = shallow(<HelloComponent {...props} />);

  return {
    mockDecrement,
    mockExecuteLs,
    mockIncrement,
    mockSetValue,
    wrapper,
  };
};

describe('<HelloComponent /> Tests', () => {
  describe('Rendering Tests', () => {
    const { wrapper } = getWrapperAndMocks(0, 'Output', 'Error');

    test('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('should render the Hello World! div', () => {
      expect(wrapper.find('div > div').first().text()).toStrictEqual('Hello World!');
    });

    test('should render the value', () => {
      expect(wrapper.find('.value').exists()).toBeTruthy();
      expect(wrapper.find('.value').text()).toStrictEqual('0');
    });

    test('should render the output', () => {
      expect(wrapper.find('.output').exists()).toBeTruthy();
      expect(wrapper.find('.output').text()).toStrictEqual('Output: Output');
    });

    test('should render the error', () => {
      expect(wrapper.find('.error').exists()).toBeTruthy();
      expect(wrapper.find('.error').text()).toStrictEqual('Error: Error');
    });

    test('should render the increment-btn', () => {
      expect(wrapper.find('.increment-btn').first().text()).toStrictEqual('Increment');
    });

    test('should render the decrement-btn', () => {
      expect(wrapper.find('.decrement-btn').first().text()).toStrictEqual('Decrement');
    });

    test('should render the execute-ls-btn', () => {
      expect(wrapper.find('.execute-ls-btn').first().text()).toStrictEqual('Execute LS Command');
    });

    test('should render the input field', () => {
      expect(wrapper.find('input').exists()).toBeTruthy();
    });
  });

  describe('Lifecycle Tests', () => {
    const { wrapper } = getWrapperAndMocks(1, '', '');

    test('should call componentWillReceiveProps when new props are received', () => {
      expect(wrapper.state('value')).toStrictEqual(1);
      wrapper.setProps({ value: 5 });
      expect(wrapper.state('value')).toStrictEqual(5);
    });
  });

  describe('Functionality Tests', () => {
    test('should call onChange of input when value changes', () => {
      const { wrapper, mockSetValue } = getWrapperAndMocks(1, '', '');

      expect(wrapper.state('value')).toStrictEqual(1);
      wrapper.find('input').first().simulate('change', { target: { value: '4' } });
      expect(wrapper.state('value')).toStrictEqual(4);
      expect(mockSetValue).toHaveBeenCalledTimes(1);
      expect(mockSetValue).toHaveBeenLastCalledWith(4);
    });

    test('should call increment function when increment-btn is clicked', () => {
      const { wrapper, mockIncrement } = getWrapperAndMocks(1, '', '');

      wrapper.find('.increment-btn').first().simulate('click');
      expect(mockIncrement).toHaveBeenCalledTimes(1);
      expect(mockIncrement).toHaveBeenLastCalledWith();
    });

    test('should call decrement function when decrement-btn is clicked', () => {
      const { wrapper, mockDecrement } = getWrapperAndMocks(1, '', '');

      wrapper.find('.decrement-btn').first().simulate('click');
      expect(mockDecrement).toHaveBeenCalledTimes(1);
      expect(mockDecrement).toHaveBeenLastCalledWith();
    });

    test('should call executeLs function when execute-ls-btn is clicked', () => {
      const { wrapper, mockExecuteLs } = getWrapperAndMocks(3, '', '');

      wrapper.find('.execute-ls-btn').first().simulate('click');
      expect(mockExecuteLs).toHaveBeenCalledTimes(1);
      expect(mockExecuteLs).toHaveBeenLastCalledWith();
    });
  });
});
