import React, { useEffect, useState } from "react";
import marked from "marked";
import "../static/css/AddArticle.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState(1); //选择的文章类别

  useEffect(() => {
    getTypeInfo(); //获得了文章分类信息
    let tmpId = props.match.params.id;
    console.log(tmpId, "++++++++");
    if (tmpId) {
      //分辨是增加还是修改
      setArticleId(tmpId);
      getArticleById(tmpId); //获得相应id的文章的信息
    }
  }, []);

  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const changeContent = (e) => {
    setArticleContent(e.target.value); //更新内容
    let html = marked(e.target.value);
    setMarkdownContent(html); //同步编译为markdown
  };

  const changeIntroducer = (e) => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };

  //从中台得到文章信息
  const getTypeInfo = (e) => {
    axios({
      mothed: "get",
      url: servicePath.getTypeInfo,
      headers: { "Access-Control-Allow-Origin": "*" },
      withCredentials: true,
    }).then((res) => {
      if (res.data.data == "没有登陆") {
        //来自于中间件，路由守卫
        localStorage.removeItem("openId");
        props.history.push("/");
      } else {
        setTypeInfo(res.data.data);
      }
    });
  };

  const selectTypeHandler = (value) => {
    setSelectType(value); //用于切换博客类型,保证页面上改变了，useState的值也改变
  };

  const saveArticle = () => {
    //保存文章
    if (!selectedType) {
      message.error("必须选择文章类型");
      return false;
    } else if (!articleTitle) {
      message.error("文章标题不能为空");
      return false;
    } else if (!articleContent) {
      message.error("文章内容不能为空");
      return false;
    } else if (!introducemd) {
      message.error("文章简介不能为空");
      return false;
    } else if (!showDate) {
      message.error("发布日期不能为空");
      return false;
    }
    // message.success('校验通过')
    let dataProps = {};
    dataProps.type_id = selectedType;
    dataProps.title = articleTitle;
    dataProps.article_content = articleContent;
    dataProps.introduce = introducemd;
    let dateText = showDate.replace("-", "/");
    dataProps.addTime = new Date(dateText).getTime() / 1000;

    if (articleId == 0) {
      //当其为0时才能添加，表示新增加，非0就应该是修改操作
      dataProps.view_count = 0;
      axios({
        method: "post",
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true, //为了使中间件起作用，就要共享cookie
      }).then((res) => {
        setArticleId(res.data.insertId);
        if (res.data.isSuccess) {
          //中台返回的isSuccesss是个boolean值
          message.success("文章发布成功");
        } else {
          message.error("文章发布失败");
        }
      });
    } else {
      dataProps.id = articleId;
      axios({
        method: "post",
        url: servicePath.updateArticle,
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        if (res.data.isSuccess) {
          message.success("文章修改成功");
        } else {
          message.error("文章修改失败");
        }
      });
    }
  };

  const getArticleById = (id) => {
    axios(servicePath.getArticleById + id, {
      withCredentials: true,
    }).then((res) => {
      // console.log(res);
      let articleInfo = res.data.data[0];
      setArticleTitle(articleInfo.title);
      setArticleContent(articleInfo.article_content);
      let html = marked(articleInfo.article_content);
      setMarkdownContent(html);
      setIntroducemd(articleInfo.introduce);
      let tmpInt = marked(articleInfo.introduce);
      setIntroducehtml(tmpInt);
      setShowDate(articleInfo.addTime);
      setSelectType(articleInfo.typeId);
    });
  };

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                value={articleTitle}
                placeholder="博客标题"
                size="large"
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select
                defaultValue={selectedType}
                size="large"
                onChange={selectTypeHandler}
              >
                {typeInfo.map((item, index) => {
                  return (
                    <Option key={index} value={item.id}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                value={articleContent}
                className="markdown-content"
                rows={35}
                onChange={changeContent}
                onPressEnter={changeContent}
                placeholder="文章内容"
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col sapn={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>
                发布文章
              </Button>
              <br />
            </Col>
            <Col span="24">
              <br />
              <TextArea
                value={introducemd}
                rows={4}
                placeholder="文章简介"
                onChange={changeIntroducer}
              ></TextArea>
              <br />
              <br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  size="large"
                  onChange={(date, dateString) => {
                    setShowDate(dateString);
                  }}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddArticle;
