import { IpcRenderer, ipcRenderer } from 'electron';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { decrementAction, executeLs, incrementAction, setValue } from '../actions/buttonActions';
import { HelloComponent } from '../components/Hello';
import { IRootState } from '../reducers';

export interface IHelloContainerState {
  value: number;
  output: string;
  error: string;
}

export interface IHelloContainerOwnProps {
  store?: any;
}

export interface IHelloContainerDispatch {
  decrement(): void;
  increment(): void;
  setValue(value: number): void;
  executeLs(ipcRenderer: IpcRenderer): any;
}

const mapStateToProps = (state: IRootState): IHelloContainerState => ({
  error: state.buttonReducer.error,
  output: state.buttonReducer.output,
  value: state.buttonReducer.value,
});

const mapDispatchToProps = (dispatch: Dispatch): IHelloContainerDispatch => ({
  decrement: () => {
    dispatch(decrementAction());
  },
  executeLs: () => {
    dispatch(executeLs(ipcRenderer));
  },
  increment: () => {
    dispatch(incrementAction());
  },
  setValue: (value: number) => {
    dispatch(setValue(value));
  },
});

export const HelloContainer = connect<IHelloContainerState, IHelloContainerDispatch, IHelloContainerOwnProps>(
  mapStateToProps, mapDispatchToProps,
)(HelloComponent);
