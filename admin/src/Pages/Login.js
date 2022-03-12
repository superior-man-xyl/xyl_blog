import React, { useState } from "react";
import { Card, Input, Button, Spin, message } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import "../static/css/Login.css";
import servicePath from "../config/apiUrl";
import axios from "axios";

const IconFont = createFromIconfontCN({
  scriptUrl: ["//at.alicdn.com/t/font_2524706_srtt7ikn6b.js"],
});

function Login(props) {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [isLoading, setInLoading] = useState(false);

  const checkLogin = () => {
    setInLoading(true); //使其呈现loadin状态
    if (!userName) {
      message.error("用户名不能为空");
      setTimeout(() => {
        setInLoading(false);
      }, 1000); //1秒后loadin消失
      return false;
    } else if (!passWord) {
      message.error("密码不能为空");
      setTimeout(() => {
        setInLoading(false);
      }, 1000); //1秒后loadin消失
      return false;
    }
    let dataProps = {
      userName: userName,
      password: passWord,
    };

    axios({
      //判断用户名和密码是否正确
      method: "post",
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true, //共享session
    }).then((res) => {
      console.log(res, res.data.data);
      setInLoading(false); //请求到数据，得到用户名密码是否正确的结果，就解除loadin状态
      if (res.data.data === "登录成功") {
        localStorage.setItem("openId", res.data.openId);
        props.history.push("/index"); //登陆成功，跳转主页
      } else {
        message.error("用户名or密码错误");
      }
    });
  };

  return (
    <div className="login-div">
      <Spin tip="Loadin..." spinning={isLoading}>
        <Card title="蟹黄同学的博客后台" bordered={true} style={{ width: 400 }}>
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={
              <IconFont type="icon-my" style={{ color: "rgba(0,0,0,.25)" }} />
            }
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <br />
          <br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={
              <IconFont type="icon-mima" style={{ color: "rgba(0,0,0,.25)" }} />
            }
            onChange={(e) => {
              setPassWord(e.target.value);
            }}
          />
          <br />
          <br />

          <Button type="primary" size="large" block onClick={checkLogin}>
            Login in
          </Button>
        </Card>
      </Spin>
    </div>
  );
}

export default Login;
