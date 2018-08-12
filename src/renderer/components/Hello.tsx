import * as React from 'react';
import { IHelloContainerDispatch, IHelloContainerState } from '../containers/HelloContainer';

export type HelloComponentProps = IHelloContainerState & IHelloContainerDispatch;

interface IHelloComponentState {
  value: number;
}

export class HelloComponent extends React.Component<HelloComponentProps, IHelloComponentState> {
  constructor(props: HelloComponentProps) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  componentWillReceiveProps(nextProps: HelloComponentProps) {
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
        <div>Hello World!</div>
        <h4 className="value">{this.state.value}</h4>
        <button className="increment-btn" onClick={this.props.increment}>Increment</button>
        &nbsp;
        <button className="decrement-btn" onClick={this.props.decrement}>Decrement</button>
        <br /><br />
        Type a value:
        <input type="text" onChange={this.handleValueChange} />
        <br /><br />
        <button className="execute-ls-btn" onClick={this.props.executeLs}>Execute LS Command</button>
        <br /><br />
        <div className="output">Output: {this.props.output}</div>
        <br /><br />
        <div className="error">Error: {this.props.error}</div>
      </div>
    );
  }
}
