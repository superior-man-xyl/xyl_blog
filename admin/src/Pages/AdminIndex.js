import React, { useState } from "react";
import "../static/css/AdminIndex.css";
import { Layout, Menu, Breadcrumb, Affix,message } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Route } from "react-router-dom";
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";
import axios from 'axios';
import servicePath from "../config/apiUrl";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleClickArticle = (e) => {
    if (e.key == "addArticle") {
      props.history.push("/index/add/");
    } else {
      props.history.push("/index/list/");
    }
  };

  const handleClickOutLogin=()=>{//退出登陆
    axios(servicePath.OutLogin, {
      withCredentials: true,
    }).then((res)=>{
      if(res.data.data=='已退出登陆'){
        message.success('退出成功')
        props.history.push("/");
      }
    })
    
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Affix offsetTop={5}>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              工作台
            </Menu.Item>
            <SubMenu
              key="sub1"
              icon={<UserOutlined />}
              title="文章管理"
              onClick={handleClickArticle}
            >
              <Menu.Item key="addArticle">添加文章</Menu.Item>
              <Menu.Item key="articleList">文章列表</Menu.Item>
            </SubMenu>
            <Menu.Item key="5" icon={<FileOutlined />} >
              留言管理
            </Menu.Item>
            <Menu.Item key="5" icon={<DesktopOutlined /> } onClick={handleClickOutLogin}>
              退出登陆
            </Menu.Item>
          </Menu>
        </Affix>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Affix offsetTop={5}>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>后台管理</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <div>
                <Route path="/index/" exact component={AddArticle} />
                <Route path="/index/add/" exact component={AddArticle} />
                <Route path="/index/add/:id" exact component={AddArticle} />
                <Route path="/index/list/" exact component={ArticleList} />
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>xiehuang.com</Footer>
        </Affix>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
