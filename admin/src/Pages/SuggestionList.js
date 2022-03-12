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
      url: servicePath.getSuggestionsList,
      withCredentials: true,
      header: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      console.log(res.data.data);
      setList(res.data.data);
    });
  };

  //删除工具
  const delSuggesstion = (id) => {
    confirm({
      title: `确定要删除这条留言吗？`,
      content: "如果点击确认，则将永久删除",
      onOk() {
        axios(servicePath.delSuggestion + id, { withCredentials: true }).then(
          (res) => {
            message.success("留言删除成功");
            getList(); //刷新页面，如果要优化性能就只操作list
          }
        );
      },
      onCancel() {
        message.success("留言删除任务取消");
      },
    });
  };

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={5}>
              <b>留言人联系方式</b>
            </Col>
            <Col span={5}>
              <b>留言文章Url</b>
            </Col>
            <Col span={11}>
              <b>留言内容</b>
            </Col>
            <Col span={3}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Row className="list-div">
              <Col span={5}>{item.email}</Col>
              <Col span={5}>{item.articleUrl}</Col>
              <Col span={11}>{item.comment}</Col>
              <Col span={3}>
                <Button
                  type="primary"
                  onClick={() => {
                    delSuggesstion(item.id);
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
