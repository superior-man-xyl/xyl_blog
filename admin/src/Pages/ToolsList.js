import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
import "../static/css/ArticleList.css";

const { confirm } = Modal;

function ToolsList(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    axios({
      method: "get",
      url: servicePath.getToolsList,
      withCredentials: true,
      header: { "Access-Control-Allow-Origin": "*"},
    }).then((res) => {
      console.log(res.data.data); 
      setList(res.data.data);
    });
  };

  //删除工具
  const delArticle = (id, title) => {
    confirm({
      title: `确定要删除"${title}"吗？`,
      content: "如果点击确认，则将永久删除",
      onOk() {
        axios(servicePath.delTool + id, { withCredentials: true }).then(
          (res) => {
            message.success("工具删除成功");
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
  const updataTool = (id) => {
    //   console.log(id,'-=-=-=-=')
    props.history.push("/index/addTools/" + id);
  };

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={3}>
              <b>工具名</b>
            </Col>
            <Col span={7}>
              <b>介绍</b>
            </Col>
            <Col span={5}>
              <b>封面图片</b>
            </Col>
            <Col span={4}>
              <b>工具链接</b>
            </Col>

            <Col span={5}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Row className="list-div">
              <Col span={3}>{item.title}</Col>
              <Col span={7}>{item.detail}</Col>
              <Col span={5}>{item.urlImg}</Col>
              <Col span={4}>{item.link}</Col>

              <Col span={5}>
                <Button
                  type="primary"
                  onClick={() => {
                    return updataTool(item.id);
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

export default ToolsList;
