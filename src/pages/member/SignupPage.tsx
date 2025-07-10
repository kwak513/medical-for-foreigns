import { LockOutlined, UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons"; // Added PhoneOutlined, MailOutlined
import { Button, Input, Select, DatePicker } from "antd"; // Added Select, DatePicker
import Title from "antd/es/typography/Title";
import { useEffect, useState, KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { memberRegister } from "../../api/MedicalApi";
import { useTranslation } from "react-i18next";
// If using Ant Design v4 or need specific date object handling, you might need:
// import moment from 'moment'; // or dayjs
// import type { DatePickerProps } from 'antd';

const { Option } = Select; // Destructure Option from Select

const SignupPage = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        //  로그인 되어 있으면 접근 X
        if (sessionStorage.getItem('isLoggedIn') === 'true') {
            // alert('이미 로그인 되어 있습니다.');
            alert(t('signupPage.alreadyLoggedIn'));
            navigate('/');
        }
    }, [])

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState<string | undefined>(undefined); // placeholder 보이도록
    const [dateOfBirth, setDateOfBirth] = useState<string | null>(null); 
    const [email, setEmail] = useState('');
    // --------------------------

    //  회원가입 버튼 클릭 시
    const handleSignup = () => {
        // --- 유효성 검사 ---
        if (!username.trim() || !password.trim() || !phoneNumber.trim() || !gender || !dateOfBirth || !email.trim()) {
            // alert("아이디, 비밀번호를 포함한 모든 필수 정보를 입력해주세요."); 
            alert(t('signupPage.missingInfo'));
            return;
        }
        
        if (!/\S+@\S+\.\S+/.test(email.trim())) {
            // alert("유효한 이메일 주소를 입력해주세요.");
            alert(t('signupPage.invalidEmail'));
            return;
        }
        
        const registrationData = {
            username: username,
            password: password,
            phoneNum: phoneNumber,
            gender: gender,
            birthDate: dateOfBirth, 
            email: email
        };
    
        memberRegister(registrationData)
            .then((bool) => {
                if(bool){
                    // alert("회원가입 되었습니다.");
                    alert(t('signupPage.signupSuccess'));
                    navigate('/login');

                }
                else{
                    // alert("이미 존재하는 아이디 또는 이메일입니다.");
                    alert(t('signupPage.alreadyExists'));
                }
            })
            .catch((err) => {
                console.log("memberRegister 실패: ", err); 
                // alert("서버 오류로 회원가입 실패했습니다.");
                alert(t('signupPage.signupError'));
            })
    };

    const handleEmailKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSignup();
        }
    };

    const handleDateChange = (date: any, dateString: string | string[]) => {
        setDateOfBirth(dateString as string);
    };


    return (
        <>
            <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '30px' }}>
                <Title level={2}>
                    {/* Doctor K 회원가입 */}
                    {t('signupPage.title')} 
                </Title>
            </div>

            {/* 회원가입 폼 영역 */}
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
                        // placeholder="아이디"
                        placeholder={t('loginPage.usernamePlaceholder')}
                        prefix={<UserOutlined />}
                    />
                </div>

                {/* 비밀번호 입력 */}
                <div style={{ marginBottom: '20px', width: '100%' }}>
                    <Input.Password
                        size="large"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        // placeholder="비밀번호"
                        placeholder={t('loginPage.passwordPlaceholder')}
                        prefix={<LockOutlined />}
                        
                    />
                </div>

                {/* 전화번호 입력 */}
                <div style={{ marginBottom: '20px', width: '100%' }}>
                    <Input
                        size="large"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        // placeholder="전화번호 (예: 010-1234-5678)"
                        placeholder={t('signupPage.phonePlaceholder')}
                        prefix={<PhoneOutlined />}
                        type="tel"
                    />
                </div>

                {/* 성별 선택 */}
                <div style={{ marginBottom: '20px', width: '100%' }}>
                    <Select
                        size="large"
                        value={gender}
                        onChange={(value) => setGender(value)}
                        // placeholder="성별 선택"
                        placeholder={t('signupPage.genderPlaceholder')}
                        style={{ width: '100%' }} 
                    >
                        {/* <Option value="남성">남성</Option>
                        <Option value="여성">여성</Option>
                        <Option value="기타">기타</Option> */}
                        <Option value={t('signupPage.genderMale')}>{t('signupPage.genderMale')}</Option> 
                        <Option value={t('signupPage.genderFemale')}>{t('signupPage.genderFemale')}</Option> 
                        <Option value={t('signupPage.genderOther')}>{t('signupPage.genderOther')}</Option> 
                    </Select>
                </div>

                {/* 생년월일 선택 */}
                <div style={{ marginBottom: '20px', width: '100%' }}>
                    <DatePicker
                        size="large"
                        onChange={handleDateChange}
                        // placeholder="생년월일 (YYYY-MM-DD)"
                        placeholder={t('signupPage.birthDatePlaceholder')}
                        style={{ width: '100%' }} 
                        format="YYYY-MM-DD" 
                        picker="date"
                    />
                </div>

                {/* 이메일 입력 */}
                <div style={{ marginBottom: '20px', width: '100%' }}>
                    <Input
                        size="large"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // placeholder="이메일 주소"
                        placeholder={t('signupPage.emailPlaceholder')}
                        prefix={<MailOutlined />}
                        type="email" 
                        onKeyDown={handleEmailKeyDown}
                    />
                </div>
                {/* -------------------------- */}


                {/* 회원가입 버튼 */}
                <div style={{ width: '100%', marginTop: '10px' }}>
                    <Button
                        type="primary"
                        onClick={handleSignup}
                        style={{ width: '100%' }}
                        size="large"
                    >
                        {/* 회원가입 */}
                        {t('signup')}
                    </Button>
                </div>

                {/* 로그인 링크 */}
                <div style={{ width: '100%', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
                    <Link to="/login" style={{ color: '#1677ff', fontSize: '0.9em' }}>
                        {/* 이미 계정이 있으신가요? 로그인 */}
                        {t('signupPage.alreadyHaveAccount')} 
                    </Link>

                </div>
            </div>
        </>
    );
}

export default SignupPage;
