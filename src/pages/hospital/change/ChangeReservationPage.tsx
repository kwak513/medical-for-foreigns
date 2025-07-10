import { Button, DatePicker, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import Title from "antd/es/typography/Title";
import { useLocation, useNavigate } from "react-router-dom";
import moment, { Moment } from 'moment';
import { useEffect, useState } from "react";
import { changeReservation, selectFromEnGangdongHospital, selectFromEnGangnamHospital, selectFromGangdongHospital, selectFromGangnamHospital } from "../../../api/MedicalApi";
import { useTranslation } from "react-i18next";

const ChangeReservationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;


    // 로그인 안하고 접근 불가
    useEffect(() => {
        if (sessionStorage.getItem("isLoggedIn") !== "true") {
            // alert('로그인이 필요합니다.');
            alert(t('alert.loginRequired'));
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


        // selectFromGangnamHospital 또는 selectFromGangdongHospital의 결과 형식
        interface HospitalDetail{
            hospital_category: string;
            hospital_languages: string;
            hospital_phone_number: string;
            hospital_main_address: string;
            hospital_address: string;
            hospital_name: string;
        }
        const [hospitalDetail, setHospitalDetail] = useState<HospitalDetail []>([]);
    

        
    // en, ko에 따라서 병원명 다시 불러오기
     useEffect(() => {
    
        const searchFromGangnam = currentLang === 'ko' ? selectFromGangnamHospital : selectFromEnGangnamHospital;
        const searchFromGangdong = currentLang === 'ko' ? selectFromGangdongHospital : selectFromEnGangdongHospital;

        if(source == "gangnam"){
            searchFromGangnam(hospitalId)
                .then((data) => {
console.log("searchFromGangnam data: ", data);
                    setHospitalDetail(data);
                })
                .catch((err) => {
                    console.log("searchFromGangnam 실패: ", err);
                    // alert("병원 상세 정보를 불러오지 못했습니다.")
                    alert(t('alert.loadHospitalDetailFailed'));
                })
        }
        else if(source == "gangdong"){
            searchFromGangdong(hospitalId)
                .then((data) => {
console.log("searchFromGangdong data: ", data);                    
                    setHospitalDetail(data);
                })
                .catch((err) => {
                    console.log("searchFromGangdong 실패: ", err);
                    // alert("병원 상세 정보를 불러오지 못했습니다.")
                    alert(t('alert.loadHospitalDetailFailed'));
                })

        }
    }, [currentLang])



    // 카테고리별 하위 항목
    const symptomCategoryMapping: {[key: string]: {[key: string]: string[]}} = {
            // 한국어
            ko: {
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
            },
            // 영어
            en: {
            'Cold/Flu': ['Cold', 'Flu', 'Rhinitis', 'COVID-19'],
            'Digestive Disorders': ['Abdominal pain', 'Diarrhea/Constipation', 'Indigestion', 'Heartburn', 'Gastroesophageal reflux disease (GERD)', 'Other digestive diseases'],
            'Pediatric Care': ['Cold/High fever', 'Diarrhea/Constipation', 'Pediatric rash', 'Other pediatric diseases'],
            'Eye Diseases': ['Conjunctivitis', 'Stye', 'Dry eyes', 'Other eye diseases'],
            'Women\'s Health': ['Cystitis/Vaginitis', 'Menstrual pain', 'Early pregnancy symptoms', 'Other female diseases'],
            'Men\'s Health': ['Prostate', 'Other male diseases'],
            'Skin Diseases': ['Shingles', 'Folliculitis', 'Athlete\'s foot', 'Atopic dermatitis', 'Acne', 'Skin rashes', 'Other skin diseases'],
            'Chronic Diseases': ['Hyperlipidemia', 'Hypertension', 'Diabetes', 'Gout', 'Other chronic diseases'],
            'Pain': ['Muscle pain', 'Joint pain', 'Headache', 'Other pain'],
            'Dental': ['Mouth ulcer', 'Periodontitis', 'Toothache', 'Other dental diseases'],
            'Other Diseases': ['Dieting', 'Tinnitus/BPPV', 'Otitis media', 'Hair loss', 'Herpes', 'Stress relief', 'Allergy'],
        }
    };
    // State initialization
    const [selectedDate, setSelectedDate] = useState<string>(initialReservationTime || '');
    const [selectedLanguage, setSelectedLanguage] = useState<string>(initialLanguage || t('filter.korean'));
    const [mainCategory, setMainCategory] = useState<string>(initialMainSymptom || t('hospitalRegisterPage.symptoms.coldFlu'));
    const [subCategory, setSubCategory] = useState<string>(initialSubSymptom || t('hospitalRegisterPage.symptoms.subColdFlu'));
    const [detailSymptom, setDetailSymptom] = useState<string>(initialDetailSymptom || '');



    // 상위 카테고리 변경 시 하위 카테고리 업데이트
    const handleCategoryChange = (value: string) => {
        setMainCategory(value);
        setSubCategory(symptomCategoryMapping[currentLang]?.[value]?.[0] || '');
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
            // alert("진료 날짜와 시간, 희망 언어, 증상/과목을 모두 선택해주세요.");
            alert(t('changeReservationPage.validationError'));
            return;
        }

        if (window.confirm(t('changeReservationPage.confirmMessage'))) {
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
                        // alert("진료 예약을 변경했습니다.");
                        alert(t('changeReservationPage.successMessage'));
                        navigate(-1);
                    }
                    else{
                        // alert("진료 예약을 실패했습니다.")
                        alert(t('changeReservationPage.failureMessage'));
                    }
                })
                .catch((err) => {
                    console.log("changeReservation 실패: ", err);
                    // alert("서버 오류로 진료 예약을 변경하지 못했습니다.")
                    alert(t('changeReservationPage.serverErrorMessage'));
                })
        }
    };

    return (
        <>
        <div>
            <Title level={2} style={{ width: '100%', textAlign: 'center', marginTop: '20px' }} className="!text-[20px] md:!text-[30px]">
                {/* {hospitalName || '병원 정보 없음'} 진료 예약 변경 */}

                {/* {hospitalName || t('changeReservationPage.noHospitalInfo')} */}
                {hospitalDetail.length > 0 && hospitalDetail[0].hospital_name}
                {" "}
                {t('changeReservationPage.pageTitleSuffix')}

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
                <Title level={4} style={{ marginRight: '10px', width: '30%'}}       className="!text-[15px] md:!text-[21px] ">
                    {/* 병원명: */}
                    {t('hospitalRegisterPage.hospitalNameLabel')}
                </Title>
                <Input 
                    value={hospitalDetail.length > 0 && hospitalDetail[0].hospital_name}
                    readOnly 
                    style={{ width: '70%' }}
                />
            </div>

            {/* 진료 날짜와 시간 */}
            <div style={{ display: 'flex', marginBottom: '20px', width: '100%' }}>
                <Title level={4} style={{ marginRight: '10px', width: '30%'}}       className="!text-[15px] md:!text-[21px] ">
                    {/* 진료 날짜와 시간: */}
                    {t('hospitalRegisterPage.dateTimeLabel')}
                </Title>
                <DatePicker
                    
                    style={{ width: '70%' }}  // 날짜 선택창을 70%로 확장
                    placeholder={t('hospitalRegisterPage.datePlaceholder')} //"날짜 선택"
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
            <Title level={4} style={{ marginRight: '10px', width: '30%'}} 
                className="!text-[15px] md:!text-[21px] ">
                {/* 희망 언어: */}
                {t('hospitalRegisterPage.languageLabel')}
            </Title>
            <Select value={selectedLanguage} onChange={setSelectedLanguage} style={{ width: '70%' }} >
                <Option value={t('filter.korean')}>
                    {/* 한국어 */}
                    {t('filter.korean')}
                </Option>
                {hospitalLanguages &&
                        hospitalLanguages.split(",").map((language, idx) => {
                            return (
                                <Option key={idx.toString()} value={language.trim()}>{language.trim()}</Option>
                            );
                        })
                    }
            </Select>
            </div>


            {/* 증상/과목 */}
            <div style={{ display: 'flex', marginBottom: '20px', width: '100%' }}>
            <Title level={4} style={{ marginRight: '10px', width: '30%'}} className="!text-[15px] md:!text-[21px] ">
                {/* 증상/과목: */}
                {t('hospitalRegisterPage.symptomLabel')}
            </Title>

            <div className="flex flex-col md:flex-row gap-3 w-[70%]">
                <Select
                value={mainCategory}
                onChange={handleCategoryChange}
                className="w-full md:w-1/2"
                >
                    
                    {/* {Object.keys(symptomCategoryMapping).map((category) => (
                    <Option key={category} value={category}>
                        {category}
                    </Option>
                    ))} */}
                    {symptomCategoryMapping[currentLang] && Object.keys(symptomCategoryMapping[currentLang]).map((category) => (
                    <Option key={category} value={category} >
                        {category}
                    </Option>
                    ))}
                
                </Select>

                <Select
                value={subCategory}
                onChange={handleSubCategoryChange}
                className="w-full md:w-1/2"
                >
                {symptomCategoryMapping[currentLang]?.[mainCategory]?.map((option) => (
                    <Option key={option} value={option}>{option}</Option>
                ))}
                </Select>
            </div>
            </div>

            {/* 자세한 증상 설명 */}
            <div style={{ display: 'flex', marginBottom: '20px', width: '100%' }}>
                <Title level={4} style={{ marginRight: '10px', width: '30%' }} className="!text-[15px] md:!text-[21px] ">
                    {/* 자세한 증상 설명: */}
                    {t('hospitalRegisterPage.detailsLabel')}
                </Title>
                <Input.TextArea rows={4} style={{ width: '70%' }} placeholder={t('hospitalRegisterPage.detailsPlaceholder')} value={detailSymptom} onChange={(e) => setDetailSymptom(e.target.value)}/>
                </div>

                {/* 예약 변경 버튼 */}
                <div style={{ marginTop: '20px', width: '100%' }}>
                <Button type="primary" size="large" style={{ width: '100%' }} onClick={handleUpdateClick}>
                    {/* 예약 변경하기 */}
                    {t('changeReservationPage.submitButton')}
                </Button>
            </div>
        </div>
    </>
    );
}
 
export default ChangeReservationPage;