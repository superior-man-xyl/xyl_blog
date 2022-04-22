import React, { useEffect, useState } from "react";
import "../static/css/AddArticle.css";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";

function AddTools(props) {
  const [toolsId, setToolsId] = useState("0"); //默认为0，如果传了那么就会有其它值，因为数据库里是从1开始的
  const [title, setTitle] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const [link, setlink] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    let tmpId = props.match.params.id; // 获取传过来的id
    console.log(tmpId, "++++++++");
    if (tmpId) {
      //分辨是增加还是修改
      setToolsId(tmpId);
      getToolById(tmpId); //获得相应id的工具的信息
    }
  }, []);

  const getToolById = (tmpId) => {
    axios(servicePath.getToolById + tmpId, {
      withCredentials: true,
    }).then((res) => {
      // console.log(res.data.data);
      let ToolInfo = res.data.data;
      setTitle(ToolInfo.title);
      setUrlImg(ToolInfo.urlImg);
      setlink(ToolInfo.link);
      setDetail(ToolInfo.detail);
      console.log(ToolInfo,'+++++++ToolInfo++++');
    });
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
    console.log(values.tools);
    let dataProps = values.tools;
    if (toolsId == 0) {
      //说明是新增加工具
      axios({
        method: "post",
        url: servicePath.addTool,
        data: dataProps,
        withCredentials: true, //为了使中间件起作用，就要共享cookie
      }).then((res) => {
        setToolsId(res.data.insertId);
        if (res.data.isSuccess) {
          //中台返回的isSuccesss是个boolean值
          message.success("工具发布成功");
        } else {
          message.error("工具发布失败");
        }
      });
    } else {
      dataProps.id = toolsId;
      axios({
        method: "post",
        url: servicePath.updateTool,
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        if (res.data.isSuccess) {
          message.success("工具修改成功");
        } else {
          message.error("工具修改失败");
        }
      });
    }
  };
  return (
    <Form {...layout} name="tool" onFinish={onFinish}>
      <Form.Item
        name={["tools", "title"]}
        label="工具名称"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input defaultValue={title} />
      </Form.Item>
      <Form.Item
        name={["tools", "urlImg"]}
        label="封面图片地址"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input defaultValue={urlImg} />
      </Form.Item>
      <Form.Item
        name={["tools", "link"]}
        label="工具网址"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input defaultValue={link} />
      </Form.Item>
      <Form.Item
        name={["tools", "detail"]}
        label="工具介绍"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea defaultValue={detail} />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddTools;
