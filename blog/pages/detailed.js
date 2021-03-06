import React, { useState } from "react";
import Head from "next/head";
import { Row, Col, Breadcrumb, Affix, Drawer, Form, Input, Button, message, Space } from "antd";
import {
  ScheduleOutlined,
  FolderOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
// import ReactMarkdown from 'react-markdown'
import MarkNav from "markdown-navbar";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import Tocify from "../components/tocify.tsx";
import servicePath from "../config/apiUrl";

const Detailed = (props) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const onFinish = (values) => {
    console.log(values.suggest,'留言提交');
    let dataProps = values.suggest;
    dataProps.articleUrl = window.location.href;
    axios({
      method: "post",
      url: servicePath.addSuggestion,
      data: dataProps,
      withCredentials: true,
    }).then((res) => {
      if (res.data.isSuccess) {
        message.success("留言发布成功, 等待作者私聊");
      } else {
        message.error("留言发布失败");
      }
    });
  }

  const tocify = new Tocify();
  const renderer = new marked.Renderer();

  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true, //github的样式
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  let html = marked(props.article_content);
  //测试时使用的markdown
  // let markdown='## P01:课程介绍和环境搭建\n' +
  // '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  // '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
  //  '**这是加粗的文字**\n\n' +
  // '*这是倾斜的文字*`\n\n' +
  // '***这是斜体加粗的文字***\n\n' +
  // '~~这是加删除线的文字~~ \n\n'+
  // '\`console.log(111)\` \n\n'+
  // '# p02:来个Hello World 初始Vue3.0\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n'+
  // '***\n\n\n' +
  // '# p03:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '# p04:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '#5 p05:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '# p06:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '# p07:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '``` var a=11; ```'
  return (
    <>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <Drawer
              title="填写下面的表单，作者就会在后台看到哦"
              placement="left"
              width={500}
              onClose={onClose}
              visible={visible}
            >
              <Form {...layout} name="tool" onFinish={onFinish}>
                <Form.Item
                  name={["suggest", "email"]}
                  label="个人邮箱"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                
                <Form.Item
                  name={["suggest", "comment"]}
                  label="留言内容"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Form>
            </Drawer>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href={`/list${props.typeId==0?'':`?id=${props.typeId}`}`}>{props.typeName}</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="/">{props.title}</a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">{props.title}</div>
              <div className="list-icon center">
                <span>
                  <ScheduleOutlined /> {props.addTime}{" "}
                </span>
                <span>
                  <FolderOutlined /> {props.typeName}{" "}
                </span>
                <span>
                  <TeamOutlined /> {props.view_count}{" "}人{" "}
                </span>
              </div>
              <div
                className="detailed-content"
                dangerouslySetInnerHTML={{ __html: html }}
              ></div>
            </div>
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Affix offsetTop={55}>
            <Advert />
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">{tocify && tocify.render()}</div>
            </div>
            <Button
              type="primary"
              onClick={showDrawer}
              className="btn-suggestion"
            >
              给文章留言吧！
            </Button>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </>
  );
};

Detailed.getInitialProps = async (context) => {
  // console.log(context.query.id, "-------detailed的id");

  let id = context.query.id;

  const promise = new Promise((resolve) => {
    // axios('http://127.0.0.1:7001/default/getArtcleById/'+id).then(//换成路径变量
    axios(servicePath.getArtcleById + id).then((res) => {
      // console.log(res.data.data[0],'-------detailed 的请求的数据');
      resolve(res.data.data[0]);
    });
  });

  axios(servicePath.addViewCount + id);//观看人数
  return await promise;
};

export default Detailed;
