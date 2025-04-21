import React, { useState } from 'react';
import {
  MedicineBoxOutlined,
  PlusSquareOutlined,
  SafetyOutlined,

} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import longLogoResize from '../assets/longLogoResize.png';
import Search from 'antd/es/input/Search';

const { Header, Content, Footer, Sider } = Layout;




type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('병원 찾기', '/hospital', <SafetyOutlined />),
  getItem('약국 찾기', '/pharmacy', <MedicineBoxOutlined />),
  // getItem('응급실 찾기', '/emergency', <PlusSquareOutlined />),
];




const ChartBoardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  // menu 누르면 navigate
  const handleMenuClick = (e) => {
    if(e.key.startsWith("/")){
      navigate(e.key);
    }
  }

  const handleLogoClick = () => {
    navigate("/hospital")
  }

  const onSearch = () => {}


  return (
    <Layout style={{ minHeight: '100vh', marginLeft: 200 }}>
      <Sider /* collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} */style={{ height: '100vh', overflow: 'auto', position: 'fixed', left: 0, top: 0}}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleMenuClick} />
      </Sider>
      <Layout>

      <Header
        style={{
          position: "fixed",
          top: 0,
          left: 200,
          width: "calc(100% - 200px)",
          zIndex: 1,
          padding: "0 16px",
          background: colorBgContainer,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* 왼쪽: 로고 */}
        <div style={{cursor: "pointer"}} onClick={handleLogoClick}>
          <img src={longLogoResize} style={{ height: "30px" }} />
        </div>
        

        {/* 오른쪽: 검색창 + 버튼 */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Search
            placeholder="병원명 검색하기"
            onSearch={onSearch}
            style={{ width: 300 }}
          />
          <Button>로그인 · 회원가입</Button>
        </div>
      </Header>



        <Content style={{ margin: '16px', marginTop: 80 }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ChartBoardLayout;