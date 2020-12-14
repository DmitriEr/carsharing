import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Image } from 'antd';
import { registerUser } from '../../../server/registerUser';
import { loginUser } from '../../../server/loginUser';
import { login } from '../../../redux/actions';
import logo from '../../../assets/authorization/logo.svg';
import './style.scss';

type ValueType = string;

type UserType = { username: ValueType; password: ValueType };

const user: UserType = { username: '', password: '' };

export const AuthWindow: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState(user);

  const onLogIn = () => {
    loginUser('login', data).then((value) => {
      const { username, password } = data;

      if (value) {
        username == process.env.REACT_APP_NAME &&
        password === process.env.REACT_APP_PASSWORD
          ? dispatch(login({ admin: true, auth: true }))
          : dispatch(login({ admin: false, auth: true }));
      }
    });
  };

  return (
    <div className="authorization-page">
      <div className="wrapper">
        <div className="logo">
          <Image src={logo} alt="logo_auth" className="image" />
          <span className="title">Need for drive</span>
        </div>
        <div className="entry">Вход</div>
        <div>
          <Form
            name="login-form"
            initialValues={{ remember: true }}
            onValuesChange={(_, allValues) => setData(allValues)}
          >
            <Form.Item
              label="Почта"
              name="username"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
            <div className="buttons">
              <Form.Item className="registration">
                <Button
                  type="link"
                  htmlType="submit"
                  onClick={() => registerUser('register', data)}
                >
                  Запросить доступ
                </Button>
              </Form.Item>
              <Form.Item className="authorization">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => onLogIn()}
                >
                  Войти
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
