
import { Button, DatePicker, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import Title from "antd/es/typography/Title";
import { useLocation, useNavigate } from "react-router-dom";
import moment, { Moment } from 'moment';
import { useEffect, useState } from "react";
import { insertHospitalReservation, selectFromEnGangdongHospital, selectFromEnGangnamHospital, selectFromGangdongHospital, selectFromGangnamHospital } from "../../api/chartboardApi";
import { useTranslation } from "react-i18next";

const HospitalRegisterPage = () => {  // DB에 저장, value/onChange, 공백 불가 로직 추가해야함

    const { t, i18n } = useTranslation(); // i18next hook 사용
    const currentLang = i18n.language;

    // 로그인 안하고 접근 불가
      useEffect(() => {
          if(sessionStorage.getItem("isLoggedIn") !== "true"){
              navigate("/login");
          }
      }, [])

    // HospitalInfoPage state로 보낸 값(hospitalDetail)을 location으로 받기
    const location = useLocation();
    const {hospitalId, hospitalSource} = location.state;
    /* hospitalDetail 형식: 
    interface HospitalDetail{
        hospital_category: string;
        hospital_languages: string;
        hospital_phone_number: string;
        hospital_main_address: string;
        hospital_address: string;
        hospital_name: string;
    }
    */
      const [hospitalInfo, setHospitalInfo] = useState<HospitalInfo []>([]);

      interface HospitalInfo{
        hospital_category: string;
        hospital_languages: string;
        hospital_phone_number: string;
        hospital_main_address: string;
        hospital_address: string;
        hospital_name: string;
    }

    // hospitalId, hospitalSource, *currentLang을 통해, hospital_name, hospital_languages 가져오기
    useEffect(() => {
      if(hospitalId == null || hospitalId == undefined || hospitalSource == null || hospitalSource == undefined){
        navigate("/");
      }

      const searchFromGangnam = currentLang === 'ko' ? selectFromGangnamHospital : selectFromEnGangnamHospital;
      const searchFromGangdong = currentLang === 'ko' ? selectFromGangdongHospital : selectFromEnGangdongHospital;
     

      if(hospitalSource == "gangnam"){
        searchFromGangnam(hospitalId)
            .then((data) => {
console.log("searchFromGangnam data: ", data);
                setHospitalInfo(data);
            })
            .catch((err) => {
                console.log("searchFromGangnam 실패: ", err);
                // alert("병원 상세 정보를 불러오지 못했습니다.")
                alert(t('alert.loadHospitalDetailFailed'));
            })
    }
    else if(hospitalSource == "gangdong"){
        searchFromGangdong(hospitalId)
            .then((data) => {
console.log("searchFromGangdong data: ", data);                    
                setHospitalInfo(data);
            })
            .catch((err) => {
                console.log("searchFromGangdong 실패: ", err);
                // alert("병원 상세 정보를 불러오지 못했습니다.")
                alert(t('alert.loadHospitalDetailFailed'));
            })

    }

    }, [currentLang])
// ------------------------------
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
// ------------------------------        


// ------------------------------
  // 증상/과목 (카테고리별 하위 항목)

  useEffect(() => {
    setMainCategory(t('hospitalRegisterPage.symptoms.coldFlu'));
    setSubCategory(t('hospitalRegisterPage.symptoms.subColdFlu'));  
  }, [currentLang])

  const [mainCategory, setMainCategory] = useState<string>(t('hospitalRegisterPage.symptoms.coldFlu')); 
const [subCategory, setSubCategory] = useState<string>(t('hospitalRegisterPage.symptoms.subColdFlu'));  // 초기값은 첫 번째 하위 카테고리로 설정


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

// 상위 카테고리 변경 시 하위 카테고리 업데이트
const handleCategoryChange = (value) => {
  setMainCategory(value);
  setSubCategory(symptomCategoryMapping[currentLang][value][0]);  // 언어에 맞는 첫 번째 항목으로 설정
};

// 하위 카테고리 변경
const handleSubCategoryChange = (value) => {
  setSubCategory(value);
};   

// ------------------------------ 

useEffect(() => {
  setSelectedLanguage(t('filter.korean'));
}, [currentLang])
  // 희망 언어
  const [selectedLanguage, setSelectedLanguage] = useState<string>(t('filter.korean'));
  // 자세한 증상 설명
  const [detailSymptom, setDetailSymptom] = useState<string>('');
  
  const [selectedDate, setSelectedDate] = useState<string>('');

    const navigate =useNavigate();

    const handleRegisterClick = () => {
      // 모든 필수 필드가 채워졌는지 한 번에 확인
      if (
        !selectedDate || !selectedLanguage || !mainCategory || !subCategory ||
        !detailSymptom || detailSymptom.trim() === ''
      ) {
        alert(t('hospitalRegisterPage.fillAllFields'));
        return;
      }


      if(window.confirm((t('hospitalRegisterPage.confirmMessage')))){
        
        const reservationDto = {
          language: selectedLanguage,
          mainSymptom: mainCategory,
          subSymptom: subCategory,
          detailSymptom: detailSymptom,
          source: hospitalSource,
          hospitalId: hospitalId,
          memberId: Number(sessionStorage.getItem("userId")),
          reservationTime: selectedDate /*&& selectedDate.toDate() */
        }
console.log("reservationDto: " + reservationDto);
        insertHospitalReservation(reservationDto)
          .then((bool) => {
            if(bool){
              // alert("예약이 완료되었습니다.");
              alert(t('hospitalRegisterPage.successMessage'));
              navigate("/");
            }
            else{
              // alert("예약에 실패했습니다. ");
              alert(t('hospitalRegisterPage.failureMessage'));
            }

            
          })
          .catch((err) => {
            console.log("insertHospitalReservation 실패: ", err);
            alert("서버 오류로 예약에 실패했습니다. ")
            alert(t('hospitalRegisterPage.serverErrorMessage'));
        })


        
      }
      
    }




    return (

    <>
        <div>
            <Title level={2} style={{ width: '100%', textAlign: 'center', marginTop: '20px'}}>
            {hospitalInfo.length > 0 && hospitalInfo[0].hospital_name} 
              {/* 진료 예약 */}
              {t('hospitalRegisterPage.pageTitleSuffix')}
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
                <Title level={4} style={{ marginRight: '10px', width: '30%' }}  >
                  {/* 병원명: */}
                  {t('hospitalRegisterPage.hospitalNameLabel')}
                </Title>
                <Input 
                    value={hospitalInfo.length > 0 && hospitalInfo[0].hospital_name} 
                    readOnly 
                    style={{ width: '70%' }}
                />
            </div>

            {/* 진료 날짜와 시간 */}
            <div style={{ display: 'flex', marginBottom: '20px', width: '100%' }}>
                <Title level={4} style={{ marginRight: '10px', width: '30%' }}>
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
                    value={selectedDate ? moment(selectedDate) : null}
                    onChange={(date: Moment | null) => setSelectedDate(date ? date.format("YYYY-MM-DD HH:mm") : '')}
                />
            </div>

            {/* 희망 언어 */}
            <div style={{ display: 'flex', marginBottom: '20px', width: '100%' }}>
            <Title level={4} style={{ marginRight: '10px', width: '30%' }}>
              {/* 희망 언어: */}
              {t('hospitalRegisterPage.languageLabel')}
            </Title>
            <Select value={selectedLanguage} onChange={setSelectedLanguage} style={{ width: '70%' }} >
                <Option value={t('filter.korean')} //"한국어"
                >
                  {/* 한국어 */}
                  {t('filter.korean')}
                </Option>
                {hospitalInfo.length > 0 && 
                        hospitalInfo[0].hospital_languages?.split(",").map((language, idx) => {
                            return (
                                <Option key={idx.toString()} value={language}>{language}</Option>
                            );
                        })
                    }


                {/* <Option value="ko">한국어</Option>
                <Option value="en">English</Option>
                <Option value="zh">中文</Option> */}
            </Select>
            </div>


          {/* 증상/과목 */}
          <div style={{ display: 'flex', marginBottom: '20px', width: '100%' }}>
            {/* 상위 카테고리 선택 */}
            <Title level={4} style={{ marginRight: '10px', width: '30%' }}>
              {/* 증상/과목: */}
              {t('hospitalRegisterPage.symptomLabel')}
            </Title>

            <div style={{ display: 'flex', width: '70%' }}>
              <Select
                value={mainCategory}
                onChange={handleCategoryChange}
                style={{ width: '50%', marginRight: '10px' }}
              >
                  
                  {symptomCategoryMapping[currentLang] && 
                  Object.keys(symptomCategoryMapping[currentLang]).map((category) => (
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
                {symptomCategoryMapping[currentLang] && mainCategory &&symptomCategoryMapping[currentLang][mainCategory]?.map((option) => (
                  <Option key={option} value={option}>{option}</Option>
                ))}
              </Select>
            </div>
          </div>

            {/* 자세한 증상 설명 */}
            <div style={{ display: 'flex', marginBottom: '20px', width: '100%' }}>
              <Title level={4} style={{ marginRight: '10px', width: '30%' }}>
                {/* 자세한 증상 설명: */}
                {t('hospitalRegisterPage.detailsLabel')}
              </Title>
                <Input.TextArea rows={4} style={{ width: '70%' }} placeholder={t('hospitalRegisterPage.detailsPlaceholder')} //"ex) 머리가 아프고 열이 나요. " 
                value={detailSymptom} onChange={(e) => setDetailSymptom(e.target.value)}/>
              </div>

              {/* 예약 버튼 */}
              <div style={{ marginTop: '20px', width: '100%' }}>
              <Button type="primary" size="large" style={{ width: '100%' }} onClick={handleRegisterClick}>
                  {/* 예약하기 */}
                  {t('hospitalRegisterPage.submitButton')}
              </Button>
            </div>
        </div>
    </>

    );
}
 
export default HospitalRegisterPage;