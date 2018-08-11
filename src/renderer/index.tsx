import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { HelloContainer } from './containers/HelloContainer';
import store from './store';
import './styles/app.scss';

declare let module: any;

const rootStore = store();

const renderApp = (Component: any) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={rootStore}>
        <Component />
      </Provider>
    </AppContainer>
  , document.getElementById('root'));
};

renderApp(HelloContainer);

if (module.hot) {
  module.hot.accept('./containers/HelloContainer.tsx', () => {
    const NextContainer = require('./containers/HelloContainer').HelloContainer;
    renderApp(NextContainer);
  });
}
