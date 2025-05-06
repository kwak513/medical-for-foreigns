import React, { useEffect, useState } from 'react';
import {
  MenuOutlined, // 햄버거 메뉴 
  SafetyOutlined,
  UserOutlined,

} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Drawer, FloatButton, Layout, Menu, theme, Grid, Row, Col } from 'antd'; 
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; 
import longLogoResize from '../assets/longLogoResize.png';
import Search from 'antd/es/input/Search';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const { Header, Content, Footer, Sider } = Layout;

const { useBreakpoint } = Grid; 


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

// const items: MenuItem[] = [
//   getItem('병원 찾기', '/hospital', <SafetyOutlined />),
//   getItem('마이페이지', '/mypage', <UserOutlined/>),
//   // getItem('응급실 찾기', '/emergency', <PlusSquareOutlined />),
// ];



const ChartBoardLayout: React.FC = () => {
  const screens = useBreakpoint(); // 현재 화면 크기 
  const { t } = useTranslation();

  // 메뉴 아이템 정의 (컴포넌트 내부로 이동)
  const items: MenuItem[] = [
    getItem(t('layout.menu.findHospital'), '/hospital', <SafetyOutlined />),
    getItem(t('layout.menu.mypage'), '/mypage', <UserOutlined/>)
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Sider 너비 
  const siderWidth = screens.md ? 200 : 0;

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
    if (searchHospitalName.trim() === '') {
        navigate("/hospital"); 
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
    // alert("로그아웃 되었습니다.");
    alert(t('layout.logoutSuccess'));
    navigate("/login")
  }


  // 모바일에서 햄버거 메뉴
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };
  const closeDrawer = () => {
    setDrawerVisible(false);
  }
  
  //내부 메뉴 클릭 시 
  const handleDrawerMenuClick = (e: any) => {
    handleMenuClick(e); 
    closeDrawer(); 
  }

  // 현재 보고 있는 메뉴가 무엇인지 표시하기 위해서,
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh' }}> 
      <div style={{width: '100%', height: '38px', position: 'fixed', left: 0, top: 0, backgroundColor: 'oklch(0.19 0.05 247.28)', zIndex: 1001, textAlign: 'center', color: '#fff', lineHeight: '38px'}}> 
        {t('layout.welcomeMessage')}
      </div>

      {/* md 사이즈 이상일 때만 Sider */}
      {screens.md && (
        <Sider
          width={200} 
          style={{
            height: 'calc(100vh - 38px)', 
            overflow: 'auto',
            position: 'fixed',
            left: 0,
            top: '38px', 
            zIndex: 1000 
          }}>
          <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline" items={items} onClick={handleMenuClick} />
        </Sider>
      )}

      <Layout style={{ marginLeft: siderWidth, marginTop: '38px' }}>

      <Header
        style={{
          position: "fixed",
          top: '38px',
          left: siderWidth, 
          width: `calc(100% - ${siderWidth}px)`, 
          zIndex: 1000, 
          padding: screens.md ? "0 16px" : "0 8px", 
          background: colorBgContainer,
          height: 'auto', 
          minHeight: '64px', 
          display: 'flex', 
          alignItems: 'center' 
        }}
      >
        {/* Header 내용을 Row와 Col로 구성 */}
        <Row justify="space-between" align="middle" style={{ width: '100%' }}>
          {/* 왼쪽: 로고 (및 모바일 메뉴 버튼) */}
          <Col xs={18} sm={18} md={8} lg={6} xl={5}> 
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
               {/* md 미만일 때 햄버거 버튼 표시 */}
               {!screens.md && (
                 <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />
               )}
               <div style={{ cursor: "pointer" }} onClick={handleLogoClick}>
                 <img src={longLogoResize} style={{ height: "30px", display: 'block' }} alt="Logo" />
               </div>
             </div>
          </Col>

          {/* 오른쪽: 검색창 + 버튼 */}
          {/* md 사이즈 미만에서는 숨김 처리 */}
          <Col xs={6} sm={6} md={16} lg={18} xl={19}> 
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "15px", 
              flexWrap: "nowrap", 
              justifyContent: 'flex-end', 
            }}>

              {/* 언어 전환 버튼 (md 사이즈 이상에서만 표시) */}
              {screens.md && <LanguageSwitcher />}

              {/* 검색창 (md 사이즈 이상에서만 표시) */}
              {screens.md && (
                <Search
                  placeholder={t('searchPlaceholder')}
                  onSearch={onSearch}
                  style={{ width: 300 }} 
                  value={searchHospitalName}
                  onChange={(e) => { setSearchHospitalName(e.target.value) }}
                />
              )}

              {/* 로그인/로그아웃 버튼 (md 사이즈 이상에서만 표시) */}
              {screens.md && (
                sessionStorage.getItem("isLoggedIn") !== "true" ? (
                  <Button onClick={handleMemberClick}>
                    {t('layout.loginSignup')}
                  </Button>
                ) : (
                  <Button onClick={handleLogoutClick}>
                    {t('logout')}
                  </Button>
                )
              )}
            </div>
          </Col>
        </Row>
      </Header>

      {/* 모바일 메뉴 Drawer */}
      <Drawer
        title={t('layout.menu.title')} 
        placement="left"
        closable={true}
        onClose={closeDrawer}
        open={drawerVisible}
        key="left-drawer"
        width={280} // Drawer 너비 설정
        bodyStyle={{ padding: 0 }} // flex 관련 스타일 제거
      >
        {/* Drawer 메뉴 영역 */}
        <div> {/* 스크롤 및 높이 관련 스타일 제거 */}
          <Menu
            theme="light" 
            mode="inline"
            items={items}
            onClick={handleDrawerMenuClick} 
            selectedKeys={[location.pathname]} 
          /> 
        </div>
        {/* 메뉴 하단 추가 기능 영역 (기존 하단 영역 내용을 여기로 이동) */}
        <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}> {/* 구분선 및 패딩 */}
          <div style={{ marginBottom: '10px' }}>
            <LanguageSwitcher />
          </div>
          {sessionStorage.getItem("isLoggedIn") !== "true" ? (
            <Button type="primary" block onClick={() => { handleMemberClick(); closeDrawer(); }}>
              {t('layout.loginSignup')}
            </Button>
          ) : (
            <Button block onClick={() => { handleLogoutClick(); closeDrawer(); }}>
              {t('logout')}
            </Button>
          )}
          <div style={{ marginTop: '15px' }}>
            <Search
              placeholder={t('searchPlaceholder')}
              onSearch={(value) => { onSearch(); closeDrawer(); }}
              value={searchHospitalName}
              onChange={(e) => { setSearchHospitalName(e.target.value) }}
            />
          </div>
        </div>
      </Drawer>


        <Content style={{ margin: '16px', marginTop: '80px' }}>

          <div
            style={{
              padding: 24,
              minHeight: `calc(100vh - 38px - 80px - 50px - 32px)`, 
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* Outlet 중 하나인 HospitalMainPage에 offset 보내줌. */}
            <Outlet context={{offset, setOffset}}/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', padding: '15px 0' }}> 
          Doctor K ©2025
        </Footer>

        <FloatButton.BackTop visibilityHeight={0} />

      </Layout>
    </Layout>
  );
};

export default ChartBoardLayout;