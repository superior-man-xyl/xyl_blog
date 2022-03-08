import React, { useState, useEffect } from "react";
import { Row, Col, Menu, Affix, Input } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import "antd/dist/antd.css";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import servicePath from "../config/apiUrl";
import { createFromIconfontCN } from '@ant-design/icons';

const { Search } = Input;

const IconFont = createFromIconfontCN({//获取图标
  scriptUrl: [
    servicePath.getIcon
  ],
});

const Header = () => {
    const [navArray, setNavArray]=useState([]);
    const [searchInput, setSearchInput]=useState('')

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

    // 点击搜索的回调函数
    const handleSearch=()=>{
     console.log('搜索的值为',searchInput);
    }

  return (
    <Affix>
      <div className="header">
        <Row type="flex" justify="center">
          <Col xs={24} sm={24} md={14} lg={8} xl={8}>
            <span className="header-logo">吃蟹黄的Thilo</span>
            <span className="header-txt">专注于前端技术分享</span>
          </Col>
          <Col xs={0} sm={0} md={0} lg={8} xl={8}>
            <Search className="SearchInput" onChange={(e)=>{setSearchInput(e.target.value)}} onSearch={handleSearch} placeholder="请输入搜索内容" enterButton="搜索" size="large"/>
          </Col>
          <Col xs={0} sm={0} md={10} lg={8} xl={8}>
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
