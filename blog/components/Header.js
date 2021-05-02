import React, { useState, useEffect } from "react";
import { Row, Col, Menu, Affix } from "antd";
// import {
//   VideoCameraOutlined,
//   HomeFilled,
//   SmileOutlined,
// } from "@ant-design/icons";
import MenuItem from "antd/lib/menu/MenuItem";
import "antd/dist/antd.css";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import servicePath from "../config/apiUrl";
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({//获取图标
  scriptUrl: [
    servicePath.getIcon
  ],
});

const Header = () => {
    const [navArray, setNavArray]=useState([])
    useEffect(()=>{
        const fetchData=async()=>{
            const result = await axios(servicePath.getTypeInfo).then(
                (res)=>{
                    // console.log( res.data.data,'+++++');
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData();
    },[])

    //点击跳转的方法
    const handleClick=(e)=>{
        if(e.key==0){
            Router.push('/')
        }else{
            Router.push('/list?id='+e.key)
        }
    }

  return (
    <Affix>
      <div className="header">
        <Row type="flex" justify="center">
          <Col xs={24} sm={24} md={10} lg={10} xl={10}>
            <span className="header-logo">谢永良</span>
            <span className="header-txt">专注于前端技术分享</span>
          </Col>
          <Col xs={0} sm={0} md={14} lg={8} xl={6}>
            <Menu mode="horizontal" onClick={handleClick}>
               {
                navArray.map((item,index)=>{
                    return (
                        <MenuItem key={index}>
                            <IconFont type={item.icon} />
                            {item.typeName}
                        </MenuItem>
                    )
                })
               } 
              {/* <MenuItem key="home">
                <HomeFilled />
                首页
              </MenuItem>
              <MenuItem key="video">
                <VideoCameraOutlined />
                视频
              </MenuItem>
              <MenuItem key="life">
                <SmileOutlined />
                生活
              </MenuItem> */}
            </Menu>
          </Col>
        </Row>
      </div>
    </Affix>
  );
};

export default Header;
