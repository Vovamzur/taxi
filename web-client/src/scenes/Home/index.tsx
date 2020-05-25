import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from 'store';

import Routing from 'containers/Routing';
import { Feedbacker } from 'components/Feedbacker';
import ErrorBoundary from 'components/ErrorBoundary';

const Home: React.FC = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Feedbacker />
        <Routing />
      </ConnectedRouter>
    </Provider>
  </ErrorBoundary>
);

export default Home;
