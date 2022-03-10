import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import { Row, Col, List, Breadcrumb, Affix } from "antd";
import {
  ScheduleOutlined,
  FolderOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import axios from "axios";
import servicePath from "../config/apiUrl";
import Link from "next/link";

export default function searchResultList(list) {
    const [mylist, setMylist] = useState(list.data);
    useEffect(() => {
      setMylist(list.data); //重新搜索时。替换list
    },list.data);
    return (
      <div>
        <Head>
          <title>谢永良的技术博客</title>
        </Head>
        <Header />
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={24} lg={18} xl={14}>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>搜索结果</Breadcrumb.Item>
              </Breadcrumb>
            </div>
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
                  <div className="list-context">{item.context}</div>
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

searchResultList.getInitialProps = async (context) => {
    // next独有，使用的是Home实例下的getInitialProps方法就能把外部资源以 props 的方式传递给页面组件
    let searchValue = context.query.searchValue;
    const promise = new Promise((resolve) => {
        axios(servicePath.getSearchList + searchValue).then((res) => {
            console.log(res.data,'------搜索结果页');
            resolve(res.data);
    });
  });
  return await promise; // await 解析出值，async里必须有返回值
};
