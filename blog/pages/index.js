import React, { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import Link from "next/link";
import axios from "axios";
import { Row, Col, List, Affix } from "antd";
import {
  ScheduleOutlined,
  FolderOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import servicePath from "../config/apiUrl";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

export default function Home(list) {
  const renderer = new marked.Renderer();
  marked.setOptions({
    //markdown解析
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

  const [mylist, setMylist] = useState(list.data);
  return (
    <div>
      <Head>
        <title>谢永良的技术博客首页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={24} lg={18} xl={14}>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={(item) => (
              <List.Item>
                <div className="list-title">
                  <Link
                    href={{ pathname: "/detailed", query: { id: item.id } }}
                  >
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span>
                    <ScheduleOutlined /> {item.addTime}{" "}
                  </span>
                  <span>
                    <FolderOutlined /> {item.typeName}{" "}
                  </span>
                  <span>
                    <TeamOutlined /> {item.view_count}人{" "}
                  </span>
                </div>
                <div
                  className="list-context"
                  dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                ></div>
                {/* 使列表简介也支持markdown */}
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Affix offsetTop={55}>
            <Advert />
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

Home.getInitialProps = async () => {
  // next独有，使用的是Home实例下的getInitialProps方法就能把外部资源以 props 的方式传递给页面组件
  const promise = new Promise((resolve) => {
    axios(servicePath.getArtcleList).then((res) => {
      // console.log(res.data,'-----index')
      resolve(res.data);
    });
  });
  return await promise; // await 解析出值
};
