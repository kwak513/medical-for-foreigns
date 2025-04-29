import { useState } from 'react';
import { Input, Button, Typography, Card, Alert, Space, message } from 'antd'; // Added message
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Optional: Link back to login
import { isUserExist } from '../../api/chartboardApi';

const { Title } = Typography;

const FindPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [messageSent, setMessageSent] = useState(false); 

    const handlePasswordResetRequest = () => {
        // 유효성 검사
        if (!email.trim()) {
            setError("이메일 주소를 입력해주세요.");
            setMessageSent(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("유효한 이메일 형식이 아닙니다.");
            setMessageSent(false);
            return;
        }

        setError(null);
        setMessageSent(false);

        isUserExist(email)
            .then((data) => {
                if(data){
                    setMessageSent(true);
                }
                else{
                    setError("일치하는 회원 정보가 없습니다.");
                }
                
            })
            .catch((err) => {
                console.log("isUserExist 실패: ", err);
                alert("서버 오류로 회원 존재 여부를 불러오지 못했습니다.")
            })
    };

    return (
        <div style={{ maxWidth: '450px', margin: '40px auto', padding: '20px' }}>
            <Card>
                <Title level={3} style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <LockOutlined /> 비밀번호 찾기
                </Title>

                <Space direction="vertical" style={{ width: '100%' }} size="large">
                    <Input
                        size="large"
                        prefix={<MailOutlined />}
                        placeholder="가입 시 등록한 이메일 주소"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onPressEnter={handlePasswordResetRequest}
                        type="email"
                    />

                    <Button
                        type="primary"
                        onClick={handlePasswordResetRequest}
                        block
                        size="large"
                    >
                        비밀번호 재설정 메일 요청
                    </Button>

                    {error && (
                        <Alert message={error} type="error" showIcon />
                    )}

                    {messageSent && (
                        <Alert
                            message="메일 전송 완료"
                            description="이메일로 비밀번호 재설정 링크를 발송했습니다. (미구현)"
                            type="success"
                            showIcon
                        />
                    )}

                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <Link to="/login">로그인 페이지로 돌아가기</Link>
                    </div>
                </Space>
            </Card>
        </div>
    );
}

export default FindPasswordPage;
