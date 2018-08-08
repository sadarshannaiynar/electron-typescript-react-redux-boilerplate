import * as React from 'react';

interface Props {
  name: string;
}

interface State {
  name: string;
}

export class HelloComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: props.name,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      name: nextProps.name,
    });
  }

  handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <h4 className="name">{this.state.name}</h4>
        <input type="text" onChange={this.handleNameChange} />
      </div>
    );
  }
}
