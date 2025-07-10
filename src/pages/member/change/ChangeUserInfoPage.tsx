import { LockOutlined, UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons"; // Added PhoneOutlined, MailOutlined
import { Button, Input, Select, DatePicker } from "antd"; // Added Select, DatePicker
import Title from "antd/es/typography/Title";
import { useEffect, useState, KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { changeUserInfo, selectUserInfo } from "../../../api/MedicalApi";
import moment from "moment";
import { useTranslation } from "react-i18next";
// If using Ant Design v4 or need specific date object handling, you might need:
// import moment from 'moment'; // or dayjs
// import type { DatePickerProps } from 'antd';

const { Option } = Select; // Destructure Option from Select

const ChangeUserInfoPage = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    // 회원의 기본 정보
    const [userinfo, setUserinfo] = useState<UserinfoDto | undefined>(undefined);
    interface UserinfoDto{
        username: string;
        phone_num: string;
        gender: string;
        birth_date: string;
        email: string;
    }

    const [password, setPassword] = useState('');

    useEffect(() => {
        //  로그인 안되어 있으면 접근 X
        if (sessionStorage.getItem('isLoggedIn') !== 'true') {
            // alert('로그인이 필요합니다.');
            alert(t('myPage.loginRequired'));
            navigate('/login');
        }
    }, [])

    useEffect(() => {
        // 회원의 기본 정보
        selectUserInfo(Number(sessionStorage.getItem("userId")))
            .then((data) => {
                console.log("selectUserInfo: ", data);
                setUserinfo(data)
            })
            .catch((err) => {
                console.log("selectUserInfo 실패: ", err);
                // alert("회원 정보를 불러오지 못했습니다.")
                alert(t('myPage.userInfo.fetchError')); 
            })
    }, [])

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');
    // const [gender, setGender] = useState<string | undefined>(undefined); // placeholder 보이도록
    // const [dateOfBirth, setDateOfBirth] = useState<string | null>(null); 
    // const [email, setEmail] = useState('');
    // --------------------------



    //  정보 수정 완료 버튼 클릭 시, 
    const handleChangeUserInfo = () => {
        if (!userinfo) {
            // alert("회원 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요."); 
            alert(t('changeUserInfoPage.loadingError'));
            return; 
        }

        // --- 유효성 검사 ---
        if (!userinfo.username.trim() || !password.trim() || !userinfo.phone_num.trim() || !userinfo.gender || !userinfo.birth_date || !userinfo.email.trim()) {
            // alert("아이디, 비밀번호를 포함한 모든 필수 정보를 입력해주세요."); 
            alert(t('signupPage.missingInfo'));
            return;
        }
        
        if (!/\S+@\S+\.\S+/.test(userinfo.email.trim())) {
            // alert("유효한 이메일 주소를 입력해주세요.");
            alert(t('signupPage.invalidEmail'));
            return;
        }
        
        const changedUserData = {
            id: Number(sessionStorage.getItem("userId")),
            phoneNum: userinfo.phone_num,
            gender: userinfo.gender,
            birthDate: userinfo.birth_date, 
            email: userinfo.email,
            password: password
        };
    
        changeUserInfo(changedUserData)
            .then((bool) => {
                if(bool){
                    // alert("정보가 수정되었습니다.")
                    alert(t('changeUserInfoPage.updateSuccess'));
                    navigate('/mypage');

                }
                else{
                    // alert("정보 수정에 실패했습니다.")
                    alert(t('changeUserInfoPage.updateFailed'));
                }
            })
            .catch((err) => {
                console.log("changeUserInfo 실패: ", err); 
                // alert("서버 오류로 정보 수정에 실패했습니다.")
                alert(t('changeUserInfoPage.updateError'));
            })
    };

    const handleEmailKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleChangeUserInfo();
        }
    };

    const handleDateChange = (date: any, dateString: string | string[]) => {
        setUserinfo(prev => prev ? { ...prev, birth_date: dateString as string } : undefined)
    };


    return (
        <>
            <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '30px' }}>
                <Title level={2} className="!text-[25px] md:!text-[30px]">
                    {/* 회원 정보 수정 */}
                    {t('changeUserInfoPage.title')}
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
                <div style={{ marginBottom: '20px', width: '100%' }}>
                    <Input
                        size="large"
                        value={userinfo?.username || ''}
                        placeholder={t('loginPage.usernamePlaceholder')} //"아이디"
                        prefix={<UserOutlined />}
                        disabled
                    />
                </div>

                <div style={{ marginBottom: '20px', width: '100%' }}>
                    <Input.Password
                        size="large"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        placeholder={t('changeUserInfoPage.passwordPlaceholder')} //"비밀번호"
                        prefix={<LockOutlined />}
                        
                    />
                </div>

                {/* 전화번호 입력 */}
                <div style={{ marginBottom: '20px', width: '100%' }}>
                    <Input
                        size="large"
                        value={userinfo?.phone_num || ''}
                        onChange={(e) => setUserinfo(prev => prev ? { ...prev, phone_num: e.target.value } : undefined)}
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
                        value={userinfo?.gender}
                        onChange={(value) => setUserinfo(prev => prev ? { ...prev, gender: value } : undefined)}
                        placeholder={t('signupPage.genderPlaceholder')} //"성별 선택"
                        style={{ width: '100%' }} 
                    >
                        {/* <Option value="남성">남성</Option>
                        <Option value="여성">여성</Option>
                        <Option value="기타">기타</Option> */}
                        <Option value={t('signupPage.genderMale')}>{t('signupPage.genderMale')}</Option> {/* 번역 적용 */}
                        <Option value={t('signupPage.genderFemale')}>{t('signupPage.genderFemale')}</Option> {/* 번역 적용 */}
                        <Option value={t('signupPage.genderOther')}>{t('signupPage.genderOther')}</Option> {/* 번역 적용 */}
                    
                    </Select>
                </div>

                {/* 생년월일 선택 */}
                <div style={{ marginBottom: '20px', width: '100%' }}>
                    <DatePicker
                        size="large"
                        onChange={handleDateChange}
                        placeholder={t('signupPage.birthDatePlaceholder')} //"생년월일 (YYYY-MM-DD)"
                        style={{ width: '100%' }} 
                        format="YYYY-MM-DD" 
                        picker="date"
                        value={userinfo?.birth_date ? moment(userinfo.birth_date, 'YYYY-MM-DD') : null}
                    />
                </div>

                {/* 이메일 입력 */}
                <div style={{ marginBottom: '20px', width: '100%' }}>
                    <Input
                        size="large"
                        value={userinfo?.email || ""}
                        onChange={(e) => setUserinfo(prev => prev ? { ...prev, email: e.target.value } : undefined)}
                        placeholder={t('signupPage.emailPlaceholder')} //"이메일 주소"
                        prefix={<MailOutlined />}
                        type="email" 
                        onKeyDown={handleEmailKeyDown}
                    />
                </div>
                {/* -------------------------- */}


                {/* 완료 버튼 */}
                <div style={{ width: '100%', marginTop: '10px' }}>
                    <Button
                        type="primary"
                        onClick={handleChangeUserInfo}
                        style={{ width: '100%' }}
                        size="large"
                    >
                        {/* 완료 */}
                        {t('changeUserInfoPage.completeButton')}
                    </Button>
                </div>

                
            </div>
        </>
    );
}

export default ChangeUserInfoPage;
