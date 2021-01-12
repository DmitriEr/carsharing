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

const rule = [
  { required: true, message: 'Поле должно быть заполнено' },
  { min: 5, message: 'Минимум 5 символов' },
];

export const AuthWindow: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState(user);
  const [userDB, setUserDB] = useState('');

  const onLogIn = () => {
    loginUser('login', data).then((value) => {
      const { username, password } = data;

      if (value) {
        localStorage.setItem('token', value.access_token);
        username == process.env.REACT_APP_NAME &&
        password === process.env.REACT_APP_PASSWORD
          ? dispatch(login({ admin: true, auth: value.access_token }))
          : dispatch(login({ admin: false, auth: value.access_token }));
      } else {
        setUserDB('Пользователь не найден');
      }
    });
  };

  const onChange = (item: UserType) => {
    if (userDB) {
      setUserDB('');
    }
    setData(item);
  };

  return (
    <div className="authorization-page">
      <div className="wrapper">
        <div className="logo">
          <Image src={logo} alt="logo_auth" className="image" />
          <span className="title">Need for drive</span>
        </div>
        <div className="entry">
          <span>Вход</span>
          <span>{userDB}</span>
        </div>
        <div>
          <Form
            name="login-form"
            initialValues={{ remember: true }}
            onValuesChange={(_, allValues) => onChange(allValues)}
          >
            <Form.Item
              label="Почта"
              name="username"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={rule}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={rule}
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
                <Button type="primary" htmlType="submit" onClick={onLogIn}>
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
