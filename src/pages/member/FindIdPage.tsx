import { useState } from 'react';
import { Input, Button, Typography, Card, Alert, Space } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Optional: Link back to login
import { selectUserName } from '../../api/chartboardApi';

const { Title, Text } = Typography;

const FindIdPage = () => {
    const [email, setEmail] = useState('');
    const [foundUsername, setFoundUsername] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);

    const handleFindId = () => {
        if (!email.trim()) {
            setError("이메일 주소를 입력해주세요.");
            setFoundUsername(null);
            return;
        }
        // 유효성 검사
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("유효한 이메일 형식이 아닙니다.");
            setFoundUsername(null);
            return;
        }

        setError(null);
        setFoundUsername(null);

        selectUserName(email)
            .then((data) => {
                if(data){
                    setFoundUsername(data)
                }
                else{
                    setError("일치하는 회원 정보가 없습니다.");
                    setFoundUsername(null);
                }
                
            })
            .catch((err) => {
                console.log("selectUserName 실패: ", err);
                alert("아이디 정보를 불러오지 못했습니다.")
            })
    };

    return (
        <div style={{ maxWidth: '450px', margin: '40px auto', padding: '20px' }}>
            <Card>
                <Title level={3} style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <UserOutlined /> 아이디 찾기
                </Title>

                <Space direction="vertical" style={{ width: '100%' }} size="large">
                    <Input
                        size="large"
                        prefix={<MailOutlined />}
                        placeholder="가입 시 등록한 이메일 주소"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onPressEnter={handleFindId}
                        type="email"
                    />

                    <Button
                        type="primary"
                        onClick={handleFindId}
                        block
                        size="large"
                    >
                        아이디 찾기
                    </Button>

                    {error && (
                        <Alert message={error} type="error" showIcon />
                    )}

                    {foundUsername && (
                        <Alert
                            message="아이디 찾기 성공"
                            description={
                            <Text>
                                회원님의 아이디는 {" "}
                                <Text strong>{foundUsername.substring(0, 4) + '*'.repeat(Math.max(0, foundUsername.length - 4))}</Text> 
                                입니다.
                            </Text>
                        }
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

export default FindIdPage;
