import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HelloComponent } from './Hello';
declare let module: any;

require('./styles/app.scss');

ReactDOM.render(<HelloComponent name="React" />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
