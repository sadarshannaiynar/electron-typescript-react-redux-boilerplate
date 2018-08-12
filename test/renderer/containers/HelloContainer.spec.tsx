import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import reduxMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { decrementAction, incrementAction, setValue } from '../../../src/renderer/actions/buttonActions';
import { HelloContainer } from '../../../src/renderer/containers/HelloContainer';

interface IWrapperAndMocks {
  mockDispatch: jest.Mock;
  wrapper: ShallowWrapper;
}

const getWrapperAndMocks = (store: MockStoreEnhanced) => {
  const mockDispatch = jest.fn();

  store.dispatch = mockDispatch;

  const wrapper = shallow(<HelloContainer store={store} />);

  return {
    mockDispatch,
    wrapper,
  };
};

describe.only('<HelloContainer /> Tests', () => {
  describe('Rendering Tests', () => {
    test('should match the snapshot', () => {
      const mockStore = reduxMockStore();
      const store = mockStore({
        buttonReducer: {
          error: 'Error',
          output: 'Output',
          value: 1,
        },
      });
      const { wrapper } = getWrapperAndMocks(store);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('State Tests', () => {
    test('should get the value prop from store', () => {
      const mockStore = reduxMockStore();
      const store = mockStore({
        buttonReducer: {
          error: 'Error',
          output: 'Output',
          value: 5,
        },
      });
      const { wrapper } = getWrapperAndMocks(store);
      expect(wrapper.find('HelloComponent').prop('value')).toStrictEqual(5);
      expect(wrapper.find('HelloComponent').prop('output')).toStrictEqual('Output');
      expect(wrapper.find('HelloComponent').prop('error')).toStrictEqual('Error');
    });
  });

  describe('Dispatch Tests', () => {
    const mockStore = reduxMockStore();
    const store = mockStore({
      buttonReducer: {
        error: 'Error',
        output: 'Output',
        value: 5,
      },
    });

    test('should fire dispatch when increment is called', () => {
      const { wrapper, mockDispatch } = getWrapperAndMocks(store);
      mockDispatch.mockClear();
      wrapper.props().increment();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenLastCalledWith(incrementAction());
    });

    test('should fire dispatch when decrement is called', () => {
      const { wrapper, mockDispatch } = getWrapperAndMocks(store);
      mockDispatch.mockClear();
      wrapper.props().decrement();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenLastCalledWith(decrementAction());
    });

    test('should fire dispatch when setValue is called', () => {
      const { wrapper, mockDispatch } = getWrapperAndMocks(store);
      mockDispatch.mockClear();
      wrapper.props().setValue(5);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenLastCalledWith(setValue(5));
    });

    test('should fire dispatch when executeLs is called', () => {
      const { wrapper, mockDispatch } = getWrapperAndMocks(store);
      mockDispatch.mockClear();
      wrapper.props().executeLs();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });
});
