import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { Dispatch } from 'redux';
import { decrementAction, incrementAction, setValue } from '../actions/buttonActions';
import { HelloComponent } from '../components/Hello';
import { IRootState } from '../reducers';

export interface IHelloContainerState {
  value: number;
}

export interface IHelloContainerDispatch {
  decrement(): void;
  increment(): void;
  setValue(value: number): void;
}

const mapStateToProps = (state: IRootState): IHelloContainerState => ({
  value: state.buttonReducer.value,
});

const mapDispatchToProps = (dispatch: Dispatch): IHelloContainerDispatch => ({
  decrement: () => {
    dispatch(decrementAction());
  },
  increment: () => {
    dispatch(incrementAction());
  },
  setValue: (value: number) => {
    dispatch(setValue(value));
  },
});

export const HelloContainer = connect<IHelloContainerState, IHelloContainerDispatch>(
  mapStateToProps, mapDispatchToProps,
)(HelloComponent);
