import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button, Switch } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
import "../static/css/ArticleList.css";

const { confirm } = Modal;

function ArticleList(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    axios({
      method: "get",
      url: servicePath.getArticleList,
      withCredentials: true,
      header: { "Access-Control-Allow-Origin": "*"},
    }).then((res) => {
      console.log(res.data.list);
      setList(res.data.list);
    });
  };

  //删除文章
  const delArticle = (id, title) => {
    confirm({
      title: `确定要删除《${title}》吗？`,
      content: "如果点击确认，则将永久删除",
      onOk() {
        axios(servicePath.delArticle + id, { withCredentials: true }).then(
          (res) => {
            message.success("文章删除成功");
            getList(); //刷新页面，如果要优化性能就只操作list
          }
        );
      },
      onCancel() {
        message.success("文章删除任务取消");
      },
    });
  };

  //修改文章
  const updateArticle = (id, checked) => {
    //   console.log(id,'-=-=-=-=')
    props.history.push("/index/add/" + id);
  };

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={3}>
              <b>类别</b>
            </Col>
            <Col span={3}>
              <b>发布时间</b>
            </Col>
            <Col span={3}>
              <b>集数</b>
            </Col>
            <Col span={3}>
              <b>浏览量</b>
            </Col>

            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>{item.title}</Col>
              <Col span={3}>{item.typeName}</Col>
              <Col span={3}>{item.addTime}</Col>
              <Col span={3}>
                共<span>{item.part_count}</span>集
              </Col>
              <Col span={3}>{item.view_count}</Col>

              <Col span={4}>
                <Button
                  type="primary"
                  onClick={() => {
                    return updateArticle(item.id);
                  }}
                >
                  修改
                </Button>
                &nbsp;
                <Button
                  onClick={() => {
                    delArticle(item.id, item.title);
                  }}
                >
                  删除{" "}
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ArticleList;
