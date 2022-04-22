import React, { useEffect, useState } from "react";
import axios from "axios";
import servicePath from "../config/apiUrl";
import { Form, Input, Button, Spin, message } from "antd";
import "../static/css/ChangePassword.css";

function ChangePassword(props) {
  const [isLoading, setInLoading] = useState(false);
  useEffect(() => {}, []);
  async function checkAccount(values) {
    let dataProps = {
      userName: "xhtx151",
      password: values.oldPassword,
    };
    let result = await axios({
      method: "post",
      url: servicePath.CheckAccount,
      data: dataProps,
      withCredentials: true,
    }).then((res) => {
      console.log(res.data.data);
      setInLoading(false);
      if (res.data.data === "查验成功") {
        message.info("旧密码正确，开始修改密码");
        return true;
      } else {
        message.error("旧密码错误");
        return false;
      }
    });
    return result;
  }
  const fixPassword = (values) => {
    let dataProps = values;
    axios({
      method: "post",
      url: servicePath.FixAccount,
      data: dataProps,
      withCredentials: true,
    }).then((res) => {
      console.log(res, "+++++修改密码的结果+++++");
      if (res) {
        message.info("修改密码成功，请重新登陆");
        props.history.push("/"); // 退回登陆页
      } else {
        message.error("修改密码失败");
      }
    });
  };
  const onFinish = (values) => {
    if (values.newPassword == values.confirmPassword) {
      setInLoading(true);
      console.log(values);
      checkAccount(values).then((result) => {
        console.log(result, "++++");
        if (result == true) {
          let accountValue = {
            userName: "xhtx151",
            password: values.newPassword,
          };
          fixPassword(accountValue);
        }
      });
    } else {
      message.error("新密码重复输入时发生错误，请确认新密码是否一致");
    }
  };
  return (
    <div className="space-password">
      <Spin tip="Loadin..." spinning={isLoading}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item label="用户名">xhtx151</Form.Item>

          <Form.Item
            label="旧密码"
            name="oldPassword"
            rules={[
              { required: true, message: "Please input your old password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="确认新密码"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
}

export default ChangePassword;
