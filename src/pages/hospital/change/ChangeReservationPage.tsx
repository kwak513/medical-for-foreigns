import { Button, DatePicker, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import Title from "antd/es/typography/Title";
import { useLocation, useNavigate } from "react-router-dom";
import moment, { Moment } from 'moment';
import { useEffect, useState } from "react";
import { changeReservation } from "../../../api/chartboardApi";

const ChangeReservationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();


    // 로그인 안하고 접근 불가
    useEffect(() => {
        if (sessionStorage.getItem("isLoggedIn") !== "true") {
            alert('로그인이 필요합니다.');
            navigate("/login");
        }
    }, [navigate]);

    // MyPage에서 state로 보낸 값 받기
    const {
        hospitalReservationId,
        hospitalId,
        hospitalName,
        source,
        language: initialLanguage,
        mainSymptom: initialMainSymptom,
        subSymptom: initialSubSymptom,
        detailSymptom: initialDetailSymptom,
        reservationTime: initialReservationTime,
        hospitalLanguages // 병원에서 지원하는 언어 목록

    } = location.state || {}; // 기본값 설정



    const [selectedDate, setSelectedDate] = useState<string>(initialReservationTime || '');
    const [selectedLanguage, setSelectedLanguage] = useState<string>(initialLanguage || '한국어');
    const [mainCategory, setMainCategory] = useState<string>(initialMainSymptom || '감기/독감');
    const [subCategory, setSubCategory] = useState<string>(initialSubSymptom || '감기');
    const [detailSymptom, setDetailSymptom] = useState<string>(initialDetailSymptom || '');


      

    const languageMapping = {
        '미국': '영어',
        '일본': '일본어',
        '중국': '중국어',
        '러시아': '러시아어',
        '중동': '중동어',
        '몽골': '몽골어',
        '베트남': '베트남어'
    };

    function getRefinedLanguages(languages: string): string {
        if (!languages) return '';
        return languages.split('/').map((language) => languageMapping[language.trim() as keyof typeof languageMapping] || language.trim()).join(', ');
    }

    // 카테고리별 하위 항목
    const symptomCategoryMapping: {[key: string]: string[]}= {
        '감기/독감': ['감기', '독감', '비염', '코로나'],
        '소화기 질환': ['복통', '설사/변비', '소화불량', '속쓰림', '역류성 식도염', '기타 소화기 질환'],
        '소아 진료': ['감기/고열', '설사/변비', '소아발진', '기타 소아 질환'],
        '눈 질환': ['결막염', '다래끼', '안구건조증', '기타 눈 질환'],
        '여성 질환': ['방광염/질염', '생리통', '임신초기 증상', '기타 여성 질환'],
        '남성 질환': ['전립선', '기타 남성 질환'],
        '피부 질환': ['대상포진', '모낭염', '무좀', '아토피', '여드름', '피부발진', '기타 피부 질환'],
        '만성 질환': ['고지혈증', '고혈압', '당뇨', '통풍', '기타 만성 질환'],
        '통증': ['근육통', '관절통', '두통', '기타 통증'],
        '치아': ['구내염', '치주염', '치통', '기타 치아 질환'],
        '기타 질환': ['다이어트', '이명/ 이석', '중이염', '탈모', '헤르페스', '긴장 완화', '알레르기'],
    };

    // 상위 카테고리 변경 시 하위 카테고리 업데이트
    const handleCategoryChange = (value: string) => {
        setMainCategory(value);
        setSubCategory(symptomCategoryMapping[value]?.[0] || '');
    };

    // 하위 카테고리 변경
    const handleSubCategoryChange = (value: string) => {
        setSubCategory(value);
    };

    // DatePicker 날짜 및 시간 커스텀 설정
    
        // 2025년 공휴일 리스트
        const holidayList = [
            '2025-01-01', // 신정
            '2025-01-27', // 임시 공휴일
            '2025-01-28', // 설날 연휴
            '2025-01-29', // 설날 연휴
            '2025-01-30', // 설날 연휴
            '2025-03-01', // 삼일절
            '2025-03-03', // 대체 공휴일
            '2025-05-05', // 어린이날
            '2025-05-06', // 대체 공휴일
            '2025-06-03', // 대통령 선거일
            '2025-06-06', // 현충일
            '2025-08-15', // 광복일
            '2025-10-03', // 개천절
            '2025-10-05', // 추석
            '2025-10-06', // 추석
            '2025-10-07', // 추석
            '2025-10-08', // 대체 공휴일
            '2025-10-09', // 한글날
            '2025-12-25', // 크리스마스
        ];
        
        
        // 공휴일 체크 함수
        const isHoliday = (current) => {
            const dateString = current.format('YYYY-MM-DD');
            return holidayList.includes(dateString);
        };
        
        // 현재 날짜 기준 1개월 후 계산
        const oneMonthLater = moment().add(1, 'months');
        
        // 1. 날짜 비활성화
        const disableDate = (current) => {
            // 일요일, 공휴일, 1개월 이후 날짜는 선택 불가
            return current && (
            current.day() === 0 || // 일요일 (0)
            isHoliday(current) || // 공휴일
            current.isBefore(moment(), 'day') || // 오늘 날짜 이전
            current.isSame(moment(), 'day') || // 오늘 날짜
            current.isAfter(oneMonthLater, 'day') // 오늘 날짜 기준 1개월 이후
            );
        };
        
        // 2. 시간 비활성화
        const disableTime = (current) => {
            // 월~금 09:00~18:00, 토 09:00~13:00로 제한 (데모 데이터 기준)
            if (current.day() >= 1 && current.day() <= 5) { // 월 ~ 금
            return {
                disabledHours: () => {
                const hours = [];
                for (let i = 0; i < 24; i++) {
                    if (i < 9 || i > 17 || i === 12) hours.push(i); // 09:00~18:00 외의 시간은 제외
                }
                return hours;
                }
            };
            }
            if (current.day() === 6) { // 토요일
            return {
                disabledHours: () => {
                const hours = [];
                for (let i = 0; i < 24; i++) {
                    if (i < 9 || i > 12) hours.push(i); // 09:00~13:00 외의 시간은 제외
                }
                return hours;
                }
            };
            }
            return {}; // 그 외 일요일(0) 또는 공휴일은 모두 비활성화
        };

        // --- 예약 변경 처리 ---
        const handleUpdateClick = () => {
            // 필수 값 확인 (날짜, 언어, 증상/과목)
            if (!selectedDate || !selectedLanguage || !mainCategory || !subCategory) {
                alert("진료 날짜와 시간, 희망 언어, 증상/과목을 모두 선택해주세요.");
                return;
            }

            if (window.confirm("예약을 변경하시겠습니까?")) {
                const changedReservation = {
                    language: selectedLanguage,
                    mainSymptom: mainCategory,
                    subSymptom: subCategory,
                    detailSymptom: detailSymptom,
                    reservationTime: selectedDate,
                    reservationId: hospitalReservationId
                }

                changeReservation(changedReservation)
                    .then((bool) => {
                        if(bool){
                            alert("진료 예약을 변경했습니다.");
                            navigate(-1);
                        }
                        else{
                            alert("진료 예약을 실패했습니다.")
                        }
                    })
                    .catch((err) => {
                        console.log("changeReservation 실패: ", err);
                        alert("서버 오류로 진료 예약을 변경하지 못했습니다.")
                    })
            }
        };

    return (
        <>
        <div>
            <Title level={2} style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                {hospitalName || '병원 정보 없음'} 진료 예약 변경
            </Title>
        </div>

        <div
            style={{ 
            padding: '30px 20px 0', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',  
            margin: '0 auto', 
            maxWidth: '600px',
            }}
        >
            {/* 병원명 */}
            <div style={{ display: 'flex', marginBottom: '20px', width: '100%' }}>
                <Title level={4} style={{ marginRight: '10px', width: '30%', whiteSpace: 'nowrap' }}>병원명:</Title>
                <Input 
                    value={hospitalName || '병원 정보 없음'}
                    readOnly 
                    style={{ width: '70%' }}
                />
            </div>

            {/* 진료 날짜와 시간 */}
            <div style={{ display: 'flex', marginBottom: '20px', width: '100%' }}>
                <Title level={4} style={{ marginRight: '10px', width: '30%', whiteSpace: 'nowrap' }}>
                    진료 날짜와 시간:
                </Title>
                <DatePicker
                    
                    style={{ width: '70%' }}  // 날짜 선택창을 70%로 확장
                    placeholder="날짜 선택"
                    showTime={{ 
                        minuteStep: 30, // 30분 단위로만 선택 가능
                    }} 
                    format="YYYY-MM-DD HH:mm"
                    disabledDate={disableDate}
                    disabledTime={disableTime}
                    // value={selectedDate ? moment(selectedDate) : null}
                    onChange={(date: Moment | null) => setSelectedDate(date ? date.format("YYYY-MM-DD HH:mm") : '')}
                />
            </div>

            {/* 희망 언어 */}
            <div style={{ display: 'flex', marginBottom: '20px', width: '100%' }}> 
            <Title level={4} style={{ marginRight: '10px', width: '30%', whiteSpace: 'nowrap' }}>희망 언어:</Title>
            <Select value={selectedLanguage} onChange={setSelectedLanguage} style={{ width: '70%' }} >
                <Option value="한국어">한국어</Option>
                {hospitalLanguages &&
                        getRefinedLanguages(hospitalLanguages).split(",").map((language, idx) => {
                            return (
                                <Option key={idx.toString()} value={language.trim()}>{language.trim()}</Option>
                            );
                        })
                    }
            </Select>
            </div>


            {/* 증상/과목 */}
            <div style={{ display: 'flex', marginBottom: '20px', width: '100%' }}>
            <Title level={4} style={{ marginRight: '10px', width: '30%', whiteSpace: 'nowrap' }}>증상/과목:</Title>

            <div style={{ display: 'flex', width: '70%' }}>
                <Select
                value={mainCategory}
                onChange={handleCategoryChange}
                style={{ width: '50%', marginRight: '10px' }}
                >
                    
                    {Object.keys(symptomCategoryMapping).map((category) => (
                    <Option key={category} value={category}>
                        {category}
                    </Option>
                    ))}
                
                </Select>

                <Select
                value={subCategory}
                onChange={handleSubCategoryChange}
                style={{ width: '50%' }}
                >
                {symptomCategoryMapping[mainCategory]?.map((option) => (
                    <Option key={option} value={option}>{option}</Option>
                ))}
                </Select>
            </div>
            </div>

            {/* 자세한 증상 설명 */}
            <div style={{ display: 'flex', marginBottom: '20px', width: '100%' }}>
                <Title level={4} style={{ marginRight: '10px', width: '30%', whiteSpace: 'nowrap' }}>자세한 증상 설명:</Title>
                <Input.TextArea rows={4} style={{ width: '70%' }} placeholder="ex) 머리가 아프고 열이 나요. " value={detailSymptom} onChange={(e) => setDetailSymptom(e.target.value)}/>
                </div>

                {/* 예약 변경 버튼 */}
                <div style={{ marginTop: '20px', width: '100%' }}>
                <Button type="primary" size="large" style={{ width: '100%' }} onClick={handleUpdateClick}>
                    예약 변경하기
                </Button>
            </div>
        </div>
    </>
    );
}
 
export default ChangeReservationPage;