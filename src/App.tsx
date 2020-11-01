import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MainPage } from './components/mainPage';
import 'antd/dist/antd.css';
import './App.scss';

const App: React.FunctionComponent = () => {
  return (
    <MainPage />
    // <Router>
    //   <Switch>
    //     <Route exact path="/">
    //       <MainPage />
    //     </Route>
    //   </Switch>
    // </Router>
  );
};

export default App;
