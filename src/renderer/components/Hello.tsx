import * as React from 'react';
import { IHelloContainerDispatch, IHelloContainerState } from '../containers/HelloContainer';

export type Props = IHelloContainerState & IHelloContainerDispatch;

interface IState {
  value: number;
}

export class HelloComponent extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      value: nextProps.value,
    });
  }

  handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const numericValue = parseInt(event.target.value, 10);
    this.setState({
      value: numericValue,
    });
    this.props.setValue(numericValue);
  }

  render() {
    return (
      <div>
        <div>Hello World</div>
        <h4 className="name">{this.state.value}</h4>
        <button onClick={this.props.increment}>Increment</button>
        &nbsp;
        <button onClick={this.props.decrement}>Decrement</button>
        <br /><br />
        Type a value:
        <input type="text" onChange={this.handleValueChange} />
      </div>
    );
  }
}
