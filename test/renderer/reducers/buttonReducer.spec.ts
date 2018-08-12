import { decrementAction, incrementAction } from '../../../src/renderer/actions/buttonActions';
import { ButtonActions, IButtonReducerState, reducer } from '../../../src/renderer/reducers/buttonReducer';

const getCurrentState = (value: number, output: string, error: string): IButtonReducerState => ({
  error,
  output,
  value,
});

describe('buttonReducer Tests', () => {
  test('should return the default state', () => {
    const nextState = reducer(undefined);
    expect(nextState).toMatchSnapshot();
    expect(nextState.value).toStrictEqual(0);
    expect(nextState.output).toStrictEqual('');
    expect(nextState.error).toStrictEqual('');
  });

  test('should use the default state when state is undefined', () => {
    const action: ButtonActions = { type: 'INCREMENT_VALUE' };
    const nextState = reducer(undefined, action);
    expect(nextState).toMatchSnapshot();
    expect(nextState.value).toStrictEqual(1);
  });

  test('should use the default state when state is null', () => {
    const action: ButtonActions = { type: 'INCREMENT_VALUE' };
    const nextState = reducer(undefined, action);
    expect(nextState).toMatchSnapshot();
    expect(nextState.value).toStrictEqual(1);
  });

  test('should return state for INCREMENT_VALUE', () => {
    const currentState = getCurrentState(4, 'Output', 'Error');
    const action: ButtonActions = { type: 'INCREMENT_VALUE' };
    const nextState = reducer(currentState, action);
    expect(nextState).toMatchSnapshot();
    expect(nextState.value).toStrictEqual(5);
  });

  test('should return state for DECREMENT_VALUE', () => {
    const currentState = getCurrentState(3, 'Output', 'Error');
    const action: ButtonActions = { type: 'DECREMENT_VALUE' };
    const nextState = reducer(currentState, action);
    expect(nextState).toMatchSnapshot();
    expect(nextState.value).toStrictEqual(2);
  });

  test('should return state for SET_VALUE', () => {
    const currentState = getCurrentState(5, 'Output', 'Error');
    const action: ButtonActions = { type: 'SET_VALUE', payload: 1 };
    const nextState = reducer(currentState, action);
    expect(nextState).toMatchSnapshot();
    expect(nextState.value).toStrictEqual(1);
  });

  test('should return state for EXEC_LS', () => {
    const currentState = getCurrentState(5, 'Output', 'Error');
    const action: ButtonActions = { type: 'EXEC_LS' };
    const nextState = reducer(currentState, action);
    expect(nextState).toMatchSnapshot();
    expect(nextState.output).toStrictEqual('');
    expect(nextState.error).toStrictEqual('');
  });

  test('should return state for EXEC_LS_SUCCESS', () => {
    const currentState = getCurrentState(5, '', '');
    const action: ButtonActions = { type: 'EXEC_LS_SUCCESS', payload: 'Success' };
    const nextState = reducer(currentState, action);
    expect(nextState).toMatchSnapshot();
    expect(nextState.output).toStrictEqual('Success');
    expect(nextState.error).toStrictEqual('');
  });

  test('should return state for EXEC_LS_ERROR', () => {
    const currentState = getCurrentState(5, '', '');
    const action: ButtonActions = { type: 'EXEC_LS_ERROR', payload: 'Error' };
    const nextState = reducer(currentState, action);
    expect(nextState).toMatchSnapshot();
    expect(nextState.output).toStrictEqual('');
    expect(nextState.error).toStrictEqual('Error');
  });
});
