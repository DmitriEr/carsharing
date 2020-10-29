import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MainPage } from './components/mainPage';
import 'antd/dist/antd.css';
import './App.scss';

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

// первое решение - не верно начал делать админку. Сначала главная страница.

{
  /* <Router>
<Layout className="layout">
  <Sider className="sidebar">
    <Menu mode="inline" defaultSelectedKeys={['4']}>
      <Menu.Item key="1">
        <Link to="/parking">Парковка</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/insurance">Страховка</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/petrol">Бензин</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/service">Обслуживание</Link>
      </Menu.Item>
    </Menu>
  </Sider>
  <Content>
    <Layout>
      <Header className="main-page_header">
        <span>Need for drive</span>
        <span>Ульяновск</span>
      </Header>
      <Content>
        <div>Каршеринг</div>
        <div>Need for drive</div>
        <div>Поминутная аренда авто твоего города</div>
      </Content>
      <Footer>
        <div>© 2016-2019 «Need for drive»</div>
        <div>8 (495) 234-22-44</div>
      </Footer>
    </Layout>
  </Content>
  <Content>Content2</Content>
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
</Layout>
</Router> */
}
