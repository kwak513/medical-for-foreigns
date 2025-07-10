import { useState } from 'react';
import { Input, Button, Typography, Card, Alert, Space, message } from 'antd'; // Added message
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Optional: Link back to login
import { isUserExist } from '../../api/MedicalApi';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const FindPasswordPage = () => {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [messageSent, setMessageSent] = useState(false); 

    const handlePasswordResetRequest = () => {
        // 유효성 검사
        if (!email.trim()) {
            // setError("이메일 주소를 입력해주세요.");
            setError(t('findIdPage.enterEmail'));
            setMessageSent(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            // setError("유효한 이메일 형식이 아닙니다.");
            setError(t('signupPage.invalidEmail'));
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
                    // setError("일치하는 회원 정보가 없습니다.");
                    setError(t('findIdPage.noMatch'));
                }
                
            })
            .catch((err) => {
                console.log("isUserExist 실패: ", err);
                // alert("서버 오류로 회원 존재 여부를 불러오지 못했습니다.")
                alert(t('findPasswordPage.checkError'));
            })
    };

    return (
        <div style={{ maxWidth: '450px', margin: '40px auto', padding: '20px' }}>
            <Card>
                <Title level={3} style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <LockOutlined />{" "}
                    {/* 비밀번호 찾기 */}
                    {t('findPassword')}
                </Title>

                <Space direction="vertical" style={{ width: '100%' }} size="large">
                    <Input
                        size="large"
                        prefix={<MailOutlined />}
                        // placeholder="가입 시 등록한 이메일 주소"
                        placeholder={t('findIdPage.emailPlaceholder')}
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
                        style={{
                            height: 'auto',
                            minHeight: '40px',
                            whiteSpace: 'normal',
                            wordBreak: 'keep-all'
                        }}
                    >
                        {/* 비밀번호 재설정 메일 요청 */}
                        {t('findPasswordPage.requestButton')}
                    </Button>

                    {error && (
                        <Alert message={error} type="error" showIcon />
                    )}

                    {messageSent && (
                    <>
                        <Alert
                            // message="메일 전송 완료"
                            // description="이메일로 비밀번호 재설정 링크를 발송했습니다. (미구현)"
                            message={t('findPasswordPage.mailSentTitle')}
                            description={t('findPasswordPage.mailSentDescription')}
                            type="success"
                            showIcon
                        />
                        {/* Alert 아래에 small 태그 추가 */}
                        <small style={{ color: "#888", display: "block", textAlign: 'center' }}>
                            {t('findPasswordPage.mailNotReallySent')}
                        </small>
                    </>

                    )}

                    <div style={{ textAlign: 'center'}}>
                        <Link to="/login">
                            {/* 로그인 페이지로 돌아가기 */}
                            {t('findIdPage.backToLogin')}
                        </Link>
                    </div>
                </Space>
            </Card>
        </div>
    );
}

export default FindPasswordPage;
