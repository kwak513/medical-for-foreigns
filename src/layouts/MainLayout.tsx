import React, { useEffect, useState } from 'react';
import {
  SafetyOutlined,
  UserOutlined,

} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, FloatButton, Layout, Menu, theme } from 'antd';
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
  getItem('마이페이지', '/mypage', <UserOutlined/>),
  // getItem('응급실 찾기', '/emergency', <PlusSquareOutlined />),
];



const ChartBoardLayout: React.FC = () => {
  // const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();


  //  HospitalMainPage에 보낼 offset (menu, logo를 누르면 HospitalMainPage의 offset을 0으로 초기화해야해서, Outlet인 HospitalMainPage에 context로 보낼거임)
  const [offset, setOffset] = useState(0);

  // '병원명 검색하기' 하면, HospitalMainPage로 이동하고, 사용자가 검색한 병원명을 state로 넘겨줌.
  const [searchHospitalName, setSearchHospitalName] = useState('');

  // menu 누르면 navigate, 기존 offset과 검색어 초기화
  const handleMenuClick = (e) => {
    if(e.key.startsWith("/")){
      setOffset(0);  // offset 초기화
      setSearchHospitalName(''); // 검색어 초기화
      navigate(e.key, { state: { searchHospitalName: null }});  // 검색어 초기화
    }
  }

  // 로고 누르면, 기존 offset과 검색어 초기화
  const handleLogoClick = () => {
    setOffset(0);  // offset 초기화
    setSearchHospitalName(''); // 검색어 초기화
    navigate("/hospital", { state: { searchHospitalName: null }}) // 검색어 초기화
  }

  useEffect(() => {
    // 검색어가 비어있으면 (공백이면) HospitalMainPage로 이동 => 사용자가 검색어 지우고 검색 버튼 안눌러도 자동으로 해줘야, 필터링 제대로 적용됨.
    if (searchHospitalName.trim() === '') {
      navigate("/hospital"); // 검색어 없이 이동
    }
  }, [searchHospitalName, navigate]);

  const onSearch = () => {
    console.log("병원명 검색!")
    navigate("/hospital", {state: {searchHospitalName}} )

  }

  const handleMemberClick = () => {
    navigate("/login")
  }

  const handleLogoutClick = () => {
    sessionStorage.removeItem('isLoggedIn');
    alert("로그아웃 되었습니다.")
    navigate("/login")
  }

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //   script.async = true;
  //   script.onload = () => {
  //     new window.google.translate.TranslateElement({ pageLanguage: 'ko' }, 'google_translate_element');
  //   };
  //   document.body.appendChild(script);

  //   return () => {
  //     const googleScript = document.querySelector('script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]');
  //     if (googleScript) {
  //       document.body.removeChild(googleScript);
  //     }
  //   };

  // }, []);

  return (
    <Layout style={{ minHeight: '100vh', marginLeft: 200}}>
      <div style={{width: '100%', height: '38px', position: 'fixed', left: 0, top: 0, backgroundColor: 'oklch(0.19 0.05 247.28)', zIndex: 1000, textAlign: 'center', color: '#fff', lineHeight: '38px'}}>
        Welcome to Doctor K
      </div>

      <Sider /* collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} */style={{ height: '100vh', overflow: 'auto', position: 'fixed', left: 0, top: '38px'}}>
        <Menu theme="dark" defaultSelectedKeys={['/hospital']} mode="inline" items={items} onClick={handleMenuClick} />
      </Sider>
      <Layout>

      <Header
        style={{
          position: "fixed",
          top: '38px',
          left: 200,
          width: "calc(100% - 200px)",
          zIndex: 1,
          padding: "0 16px",
          background: colorBgContainer,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // overflow: 'hidden'
        }}
      >
        {/* 왼쪽: 로고 */}
        <div style={{cursor: "pointer"}} onClick={handleLogoClick}>
          <img src={longLogoResize} style={{ height: "30px" }} />
        </div>
        

        {/* 오른쪽: 검색창 + 버튼 */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>

        {/* 구글 언어 선택
        <div id="google_translate_element" style={{ marginRight: "10px", width: "100px", height: "50px"}}></div> */}


          <Search
            placeholder="병원명 검색하기"
            onSearch={onSearch}
            style={{ width: 300 }}
            value={searchHospitalName}
            onChange={(e) => {setSearchHospitalName(e.target.value)}}
          />

          {sessionStorage.getItem("isLoggedIn") !== "true" &&
            <Button onClick={handleMemberClick}>로그인 · 회원가입</Button>
          }
          {sessionStorage.getItem("isLoggedIn") === "true" &&
            <Button onClick={handleLogoutClick}>로그아웃</Button>
          }
        </div>
      </Header>



        <Content style={{ margin: '16px', marginTop: '118px' }}>

        {/* <Content
          style={{
            position: 'fixed',  // 구글 번역 header 생기면, 밀려서 방지하고자 marginTop 대신 fixed로 바꿈
            top: '118px',
            left: '200px', // Sider 너비
            right: '0',
            bottom: '0',
            padding: '16px',
            overflow: 'auto', // 넘치면 내부 스크롤
          }}
          id="scrollable-content"
        > */}
  
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
            {/* Outlet 중 하나인 HospitalMainPage에 offset 보내줌. */}
            <Outlet context={{offset, setOffset}}/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
        </Footer>

        <FloatButton.BackTop visibilityHeight={0} />

        <FloatButton.BackTop
        visibilityHeight={0}
        // target={() => document.getElementById('scrollable-content')}
/>

      </Layout>
    </Layout>
  );
};

export default ChartBoardLayout;