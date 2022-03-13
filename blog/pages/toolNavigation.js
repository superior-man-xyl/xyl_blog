import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import { Row, Col, List, Card, Affix } from "antd";

import axios from "axios";
import servicePath from "../config/apiUrl";

export default function searchResultList(list) {
  const [mylist, setMylist] = useState(list.data);
  const { Meta } = Card;

  return (
    <div>
      <Head>
        <title>谢永良的技术博客</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left tool-left" xs={24} sm={24} md={24} lg={18} xl={14}>
          <List
            header={<div>前端常用工具推荐</div>}
            grid={{ gutter: 6, column: 3 }}
            dataSource={mylist}
            renderItem={(item) => (
              <List.Item>
                <Card
                  onClick={()=>{window.open(item.link)}}
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt="图片"
                      src={item.urlImg}
                    />
                  }
                >
                  <Meta
                    title={item.title}
                    description={item.detail}
                  />
                </Card>
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

searchResultList.getInitialProps = async () => {
  // next独有，使用的是Home实例下的getInitialProps方法就能把外部资源以 props 的方式传递给页面组件
  const promise = new Promise((resolve) => {
    axios(servicePath.getToolsInfo).then((res) => {
      console.log(res.data, "------工具列表");
      resolve(res.data);
    });
  });
  return await promise; // await 解析出值，async里必须有返回值
};
