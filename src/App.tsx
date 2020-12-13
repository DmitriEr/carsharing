import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ConnectedRouter } from 'connected-react-router';
import { MainPage } from './components/mainPage';
import { OrderPage } from './components/orderPage';
import { ConfirmOrder } from './components/confirmOrder';
import { AuthorizationPage } from './components/authorizationPage';
import { createRootReducer } from './redux/rootReducer';
import 'antd/dist/antd.css';
import './App.scss';

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const store = createStore(createRootReducer(history), composeWithDevTools());

const App: React.FunctionComponent = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/">
          <AuthorizationPage />
        </Route>
        <Route exact path="/carsharing/">
          <MainPage />
        </Route>
        <Route exact path="/carsharing/order">
          <OrderPage />
        </Route>
        <Route exact path={`/carsharing/order/${localStorage.getItem('id')}`}>
          <ConfirmOrder />
        </Route>
        <Route exact path="/admin/">
          <div />
        </Route>
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;
