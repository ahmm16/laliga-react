import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Spin, Result } from "antd";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useUser } from "../context/user.context";
import { loginApi } from "../services/reqresApi";

const FormStyled = styled(Form)`
  width: 30%;
  display: block;
  margin: 20px auto;
  padding: 40px;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #eee;
  box-shadow: 0px 0px 8px 2px #ababab;

  @media (max-width: 768px) {
    width: 80%;
  }
`;
const SpinStyled = styled(Spin)`
  display: block;
  margin: 10px auto;
`;
const ButtonStyled = styled(Button)`
  display: block;
  margin: 0px auto;
`;
const LoginForm = () => {
  const { setToken } = useUser();
  let history = useHistory();
  const [form, setForm] = useState({});
  const [loginLoader, setLoginLoader] = useState(false);
  const [loginResponse, setLoginResponse] = useState(false);
  const handleChange = useCallback(
    (e) => {
      setLoginResponse(0);
      setForm({ ...form, [e.target.id]: e.target.value });
    },
    [setLoginResponse, setForm, form]
  );
  const onFinishFailed = () => {
    return setLoginResponse(-1);
  };
  //TODO: al menos, crea un helper ^^,
  const evalResponse = useCallback(
    (response) => {
      setLoginLoader(false);
      if (response.error) {
        return setLoginResponse(-1);
      } else {
        setToken(response.token);
        return history.push("/user");
      }
    },
    [history, setToken]
  );
  const handleSubmit = useCallback(async () => {
    setLoginResponse(false);
    try {
      setLoginLoader(true);
      const response = await loginApi(form);
      return evalResponse(response);
    } catch (err) {
      setLoginLoader(false);
      return setLoginResponse(-1);
    }
  }, [evalResponse, form]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      window.addEventListener("change", handleChange);
      window.addEventListener("submit", handleSubmit);
    }
    //borrar todas las suscripciones para evitar advertencias de p??rdida de memoria
    return () => {
      mounted = false;
      window.removeEventListener("change", handleChange);
      window.removeEventListener("submit", handleSubmit);
    };
  }, [handleSubmit, handleChange]);
  return (
    <FormStyled
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        id="username"
        onChange={handleChange}
        rules={[
          {
            required: true,
            message: "Required",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        id="password"
        onChange={handleChange}
        rules={[
          {
            required: true,
            message: "Required",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      {loginLoader && <SpinStyled size="large" />}
      {loginResponse === -1 && (
        <Result status="error" title="Email o contrase??as inv??lidos" />
      )}
      <ButtonStyled type="primary" htmlType="submit">
        Login
      </ButtonStyled>
    </FormStyled>
  );
};

export default LoginForm;
