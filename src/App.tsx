import React, { useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MainPage } from './components/mainPage';
import { OrderPage } from './components/orderPage';
import 'antd/dist/antd.css';
import './App.scss';

const App: React.FunctionComponent = () => {
  const sliderRef = useRef(null);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/carsharing/">
            <MainPage sliderRef={sliderRef} />
          </Route>
          <Route exact path="/carsharing/order">
            <OrderPage sliderRef={sliderRef} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
