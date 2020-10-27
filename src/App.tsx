import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Card } from './components/Card';
import { List } from './components/List';
import { Order } from './components/Order';
import 'antd/dist/antd.css';
import './App.scss';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Layout className="layout">
        <Sider className="sidebar">
          <div className="logo" />
          <Menu mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Link to="/">Главная страница</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/card">Карточка автомобиля</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/list">Список авто</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/order">Эскизы</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header />
          <Content>
            <Switch>
              <Route exact path="/">
                <div />
              </Route>
              <Route path="/card">
                <Card />
              </Route>
              <Route path="/list">
                <List />
              </Route>
              <Route path="/order">
                <Order />
              </Route>
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
