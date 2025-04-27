import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Button, Typography } from "antd";
import { useEffect, useState, KeyboardEvent } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { memberLogin } from "../../api/chartboardApi";

const { Title } = Typography; // Typography에서 Title 가져오기



const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        //  로그인 되어 있으면 접근 X
        if (sessionStorage.getItem('isLoggedIn') === 'true') {
            navigate('/'); 
        }
    }, [])
    

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    
    // 로그인 버튼 클릭 시
    const handleLogin = () => {
        if (!username.trim() || !password.trim()) {
            alert("아이디와 비밀번호를 모두 입력해주세요.");
            return; 
        }

        memberLogin(username, password)
            .then((num) => {
                if(num !== -1){ // 로그인 실패스 백에서 -1 반환
                    alert("로그인 되었습니다.")
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('userId', num); 
                    navigate('/');


                }
                else{
                    alert("아이디 또는 비밀번호를 확인해주세요. ")
                    sessionStorage.removeItem('isLoggedIn');
                    sessionStorage.removeItem('username'); // 실패 시 사용자 이름도 제거
                }
            })
            .catch((err) => {
                console.log("memberLogin 실패: ", err);
                alert("서버 오류로 로그인 실패했습니다.")
                sessionStorage.removeItem('isLoggedIn'); // 오류 시에도 제거
                sessionStorage.removeItem('username'); // 오류 시에도 제거
            })
    };

    // 비밀번호 입력 필드에서 Enter 키 누를 때 로그인 클릭
    const handlePasswordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <>
            <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '30px' }}>
                <Title level={2}>
                    Doctor K 로그인
                </Title>
            </div>

            {/* 로그인 폼 영역 */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '0 auto',
                    maxWidth: '400px',
                    padding: '0 20px', 
                }}
            >
                {/* 아이디 입력 */}
                <div style={{ marginBottom: '20px', width: '100%' }}>
                    <Input
                        size="large"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                        placeholder="아이디"
                        prefix={<UserOutlined />}
                    />
                </div>

                {/* 비밀번호 입력 */}
                <div style={{ marginBottom: '20px', width: '100%' }}>
                    <Input.Password
                        size="large"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        placeholder="비밀번호"
                        prefix={<LockOutlined />}
                        // Enter 키 이벤트 핸들러 추가
                        onKeyDown={handlePasswordKeyDown} 
                    />
                </div>

                {/* 로그인 버튼 */}
                <div style={{ width: '100%', marginTop: '10px' }}>
                    <Button
                        type="primary"
                        onClick={handleLogin}
                        style={{ width: '100%' }}
                        size="large"
                    >
                        로그인
                    </Button>
                </div>

                {/* 회원가입 링크 */}
                <div style={{ width: '100%', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}> 
                    <Link to="/signup" style={{ color: '#1677ff', fontSize: '0.9em' }}>
                        회원가입
                    </Link>
                    
                </div>
            </div>
        </>
    );
}

export default LoginPage;
