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

export default function MyList(list) {
  const [mylist, setMylist] = useState(list.data);
  useEffect(() => {
    setMylist(list.data); //使图标切换时数据也跟着改变，比如视频到生活
  });
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
              <Breadcrumb.Item>{mylist[0]?mylist[0].typeName:'文章教程'}</Breadcrumb.Item>
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
                    <TeamOutlined /> {item.view_count}{" "}人{" "}
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

MyList.getInitialProps = async (context) => {
  let id = context.query.id;
  const promise = new Promise((resolve) => {
    axios(servicePath.getListById + id).then((res) => {
      // console.log(res.data,'-----index')
      resolve(res.data);
    });
  });
  return await promise;
};
