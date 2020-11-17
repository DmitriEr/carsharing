import React from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ConnectedRouter } from 'connected-react-router';
import { MainPage } from './components/mainPage';
import { OrderPage } from './components/orderPage';
import 'antd/dist/antd.css';
import './App.scss';
import { createRootReducer } from './redux/rootReducer';

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const store = createStore(createRootReducer(history), composeWithDevTools());

const App: React.FunctionComponent = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/carsharing/">
          <MainPage />
        </Route>
        <Route exact path="/carsharing/order">
          <OrderPage />
        </Route>
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;
