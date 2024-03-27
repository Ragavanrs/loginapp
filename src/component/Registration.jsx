import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import './Login.css'
import userData from '../json/LoginCredentials.json'
export default function Registration({OnSubmission}){

    const [users, setUsers] = useState([]);
    const [loginError, setLoginError] = useState(false);

  const onFinish = (values) => {
    credentials.username=values.username;
    credentials.password=values.password;
    userData.push(credentials);
    Modal.success({
        title: 'Registered Successful',
        content: 'You have successfully Registered!',
      });
    console.log("Received values of form: ", values.username);
    // eslint-disable-next-line no-template-curly-in-string
    OnSubmission();
  };

 const credentials={
    "username":"",
    "password":""
 };

  useEffect(()=>{
    setUsers(userData);
  },[]);



  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  function handleSubmit(values){

    const userConfirmation = users.find(user=>user.username===values.username );
    if (userConfirmation) {
        setLoginError(true);
        console.log('Invalid username or password');
      } else {
        onFinish(values); // Success callback if user is found
        setLoginError(false);
      }
  }

  

  return (
    <div>
    
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};
