import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import './Login.css'
import userData from '../json/LoginCredentials.json'
import Registration from "./Registration";
export default function Login(){

    const [users, setUsers] = useState([]);
    const [loginError, setLoginError] = useState(false);
    const [showRegistration,SetShowRegistration]=useState(false)

  const onFinish = (values) => {
    Modal.success({
        title: 'Login Successful',
        content: 'You have successfully logged in!',
      });
    console.log("Received values of form: ", values.username);
    // eslint-disable-next-line no-template-curly-in-string
    
  };

  function toggleToRegistration(){
    SetShowRegistration(!showRegistration);
  }

  useEffect(()=>{
    setUsers(userData);
  },[]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  function handleSubmit(values){

    const userConfirmation = users.find(user=>user.username===values.username && user.password === values.password);
    if (userConfirmation) {
        onFinish(values); // Success callback if user is found
        setLoginError(false);
      } else {
        setLoginError(true);
        console.log('Invalid username or password');
      }
  }

  

  return (
    
    <div>
        {loginError && (
        <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', marginBottom: '10px' }}>
          Invalid username or password
        </div>
      )};
        {showRegistration?
        <Registration OnSubmission={toggleToRegistration} />:(

        
    
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
      <Form.Item>
        <a className="login-form-forgot" onClick={toggleToRegistration} >
          Register User
        </a>
      </Form.Item>
    </Form>)}
    </div>
  );
};
