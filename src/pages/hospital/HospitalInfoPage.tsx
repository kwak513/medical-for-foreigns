import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteMemberFavorite, insertIntoMemberFavorite, isFavoriteCheck, selectFromEnGangdongHospital, selectFromEnGangnamHospital, selectFromGangdongHospital, selectFromGangnamHospital, selectFromHospitalReview, selectFromMemberFavorite } from "../../api/chartboardApi";
import hospitalRandom1 from '../../assets/hospitalImg/hospitalRandom1.jpg';
import hospitalRandom2 from '../../assets/hospitalImg/hospitalRandom2.jpg';
import hospitalRandom3 from '../../assets/hospitalImg/hospitalRandom3.jpg';
import hospitalRandom4 from '../../assets/hospitalImg/hospitalRandom4.jpg';
import hospitalRandom5 from '../../assets/hospitalImg/hospitalRandom5.jpg';
import hospitalRandom6 from '../../assets/hospitalImg/hospitalRandom6.jpg';
import hospitalRandom7 from '../../assets/hospitalImg/hospitalRandom7.jpg';
import hospitalRandom8 from '../../assets/hospitalImg/hospitalRandom8.jpg';
import hospitalRandom9 from '../../assets/hospitalImg/hospitalRandom9.jpg';
import hospitalRandom10 from '../../assets/hospitalImg/hospitalRandom10.jpg';
import hospitalRandom11 from '../../assets/hospitalImg/hospitalRandom11.jpg';
import hospitalRandom12 from '../../assets/hospitalImg/hospitalRandom12.jpg';
import hospitalRandom13 from '../../assets/hospitalImg/hospitalRandom13.jpg';
import hospitalRandom14 from '../../assets/hospitalImg/hospitalRandom14.jpg';
import hospitalRandom15 from '../../assets/hospitalImg/hospitalRandom15.jpg';
import hospitalRandom16 from '../../assets/hospitalImg/hospitalRandom16.jpg';
import hospitalRandom17 from '../../assets/hospitalImg/hospitalRandom17.jpg';
import hospitalRandom18 from '../../assets/hospitalImg/hospitalRandom18.jpg';
import hospitalRandom19 from '../../assets/hospitalImg/hospitalRandom19.jpg';
import hospitalRandom20 from '../../assets/hospitalImg/hospitalRandom20.jpg';
import hospitalRandom21 from '../../assets/hospitalImg/hospitalRandom21.jpg';
import hospitalRandom22 from '../../assets/hospitalImg/hospitalRandom22.jpg';
import hospitalRandom23 from '../../assets/hospitalImg/hospitalRandom23.jpg';
import hospitalRandom24 from '../../assets/hospitalImg/hospitalRandom24.jpg';
import hospitalRandom25 from '../../assets/hospitalImg/hospitalRandom25.jpg';
import hospitalRandom26 from '../../assets/hospitalImg/hospitalRandom26.jpg';
import hospitalRandom27 from '../../assets/hospitalImg/hospitalRandom27.jpg';
import hospitalRandom28 from '../../assets/hospitalImg/hospitalRandom28.jpg';
import hospitalRandom29 from '../../assets/hospitalImg/hospitalRandom29.jpg';
import hospitalRandom30 from '../../assets/hospitalImg/hospitalRandom30.jpg';
import hospitalRandom31 from '../../assets/hospitalImg/hospitalRandom31.jpg';
import hospitalRandom32 from '../../assets/hospitalImg/hospitalRandom32.jpg';
import hospitalRandom33 from '../../assets/hospitalImg/hospitalRandom33.jpg';
import hospitalRandom34 from '../../assets/hospitalImg/hospitalRandom34.jpg';
import hospitalRandom35 from '../../assets/hospitalImg/hospitalRandom35.jpg';
import hospitalRandom36 from '../../assets/hospitalImg/hospitalRandom36.jpg';
import hospitalRandom37 from '../../assets/hospitalImg/hospitalRandom37.jpg';
import hospitalRandom38 from '../../assets/hospitalImg/hospitalRandom38.jpg';
import hospitalRandom39 from '../../assets/hospitalImg/hospitalRandom39.jpg';
import hospitalRandom40 from '../../assets/hospitalImg/hospitalRandom40.jpg';



import Title from "antd/es/typography/Title";
import { Button,  Card,  Divider, Rate, Tag } from "antd";
import { AppstoreAddOutlined, ClockCircleOutlined, CopyOutlined, EnvironmentOutlined, GlobalOutlined, MessageOutlined, PhoneOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const HospitalInfoPage = () => {

    const { t, i18n } = useTranslation();
    const currentLang = i18n.language; // 'ko' or 'en'

    // HospitalMainPage에서 state로 보낸 값(hospitalId, hospitalSource)을 location으로 받기
    const location = useLocation();
    const {hospitalId, hospitalSource} = location.state;

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


    useEffect(() => {

        const searchFromGangnam = currentLang === 'ko' ? selectFromGangnamHospital : selectFromEnGangnamHospital;
        const searchFromGangdong = currentLang === 'ko' ? selectFromGangdongHospital : selectFromEnGangdongHospital;

        if(hospitalSource == "gangnam"){
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
        else if(hospitalSource == "gangdong"){
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

    interface HospitalReview{
        "original_language": string;
        "rate": number;
        "created_at": string;
        "id": number;
        "original_text": string;
        "translated_text": string;
    }

    // 병원의 리뷰 정보 가져오기
    const [hospitalReview, setHospitalReview] = useState<HospitalReview[]>([]);
    useEffect(() => {


        selectFromHospitalReview(hospitalId, hospitalSource, currentLang)
            .then((list) => {
                setHospitalReview(list);

            })
            .catch((err) => {
                console.log("selectFromHospitalReview 실패: ", err);
                // alert("병원 리뷰를 불러오지 못했습니다.")
                alert(t('alert.loadReviewsFailed'));
            })
    }, [currentLang])

// 병원 이미지 데모 데이터
const images = [
    hospitalRandom1, hospitalRandom2, hospitalRandom3, hospitalRandom4, hospitalRandom5,
    hospitalRandom6, hospitalRandom7, hospitalRandom8, hospitalRandom9, hospitalRandom10,
    hospitalRandom11, hospitalRandom12, hospitalRandom13, hospitalRandom14, hospitalRandom15,
    hospitalRandom16, hospitalRandom17, hospitalRandom18, hospitalRandom19, hospitalRandom20,
    hospitalRandom21, hospitalRandom22, hospitalRandom23, hospitalRandom24, hospitalRandom25,
    hospitalRandom26, hospitalRandom27, hospitalRandom28, hospitalRandom29, hospitalRandom30,
    hospitalRandom31, hospitalRandom32, hospitalRandom33, hospitalRandom34, hospitalRandom35,
    hospitalRandom36, hospitalRandom37, hospitalRandom38, hospitalRandom39, hospitalRandom40
];



    // 주소 '복사' 버튼 로직
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            // alert("주소가 복사되었습니다.");
            alert(t('hospitalInfo.addressCopied'));
        }).catch((err) => {
            console.error("복사 실패:", err);
        });
    };

    // 페이지 접속 시, 스크롤바 맨 위로.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();
    // "진료 예약하기" 버튼 클릭 시, 
    const handleRegisterHospitalClick = () => {
        navigate("/hospital/register", {state: {hospitalDetail, hospitalId, hospitalSource}})
    }

    // "리뷰 작성하기" 버튼 클릭 시,
    const handleWriteReviewClick = () => {
        navigate("/hospital/review", {state: {hospitalDetail, hospitalId, hospitalSource}})
    }

    // 즐겨찾기
    const [isBookmarked, setIsBookmarked] = useState(false);
    
    useEffect(() => {
        // 병원 id와 회원 id를 기준으로 즐겨찾기되어 있는 병원인지
        isFavoriteCheck(Number(sessionStorage.getItem("userId")), hospitalId, hospitalSource)
            .then((bool) => {
                setIsBookmarked(bool);
            })
            .catch((err) => {
                console.log("isFavoriteCheck 실패: ", err);
                // alert("즐겨찾기 여부를 불러오지 못했습니다.")
                alert(t('hospitalInfo.favoriteCheckFailed'));
            })

    }, [isBookmarked])
    

    // --- 즐겨찾기 토글 핸들러 ---
    const handleBookmarkClick = () => {

        const favoriteData = {
            memberId: Number(sessionStorage.getItem("userId")),
            hospitalId: hospitalId,
            hospitalSource: hospitalSource
        }
        // 즐겨찾기 선택
        if (!isBookmarked) {
            insertIntoMemberFavorite(favoriteData)
                .then((bool) => {
                    if(bool == true){
                        setIsBookmarked(true);
                        // alert("즐겨찾기에 추가되었습니다.");
                        alert(t('hospitalInfo.favoriteAdded'));
                    }
                    
                })
                .catch((err) => {
                    console.log("insertIntoMemberFavorite 실패: ", err);
                    // alert("즐겨찾기를 추가하지 못했습니다.")
                    alert(t('hospitalInfo.favoriteAddFailed'));
                })
        } 
        //  즐겨찾기 취소
        else if(isBookmarked){
            deleteMemberFavorite(Number(sessionStorage.getItem("userId")), hospitalId, hospitalSource)
                .then((bool) => {
                    if(bool == true){
                        setIsBookmarked(false);
                        // alert("즐겨찾기에서 해제되었습니다.");
                        alert(t('hospitalInfo.favoriteRemoved'));
                    }
                    
                })
                .catch((err) => {
                    console.log("deleteMemberFavorite 실패: ", err);
                    // alert("즐겨찾기를 해제하지 못했습니다.")
                    alert(t('hospitalInfo.favoriteRemoveFailed'));
                })
        }
    };
// --------------------------

    
    return (
        <>
            {/* 병원 정보 + 즐겨찾기 버튼 */}
            {/* 기본: 세로 쌓임, md 이상: 가로 배치 */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-0 mb-5">

            {/* 왼쪽: 이미지 + 병원 정보 */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center w-full"> 
                {/* 이미지와 안내 문구를 묶는 컨테이너 */}
                <div className="flex flex-col items-center flex-shrink-0"> {/* 세로 정렬 및 크기 고정 */}
                    <div className="w-full max-w-xs sm:max-w-sm md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] overflow-hidden rounded-lg">
                    {/* <img alt="병원 이미지" src={images[hospitalId % 40]} className="w-full h-full object-cover" /> */}
                    <img alt={t('hospitalInfo.hospitalImageAlt')} src={images[hospitalId % 40]} className="w-full h-full object-cover" />
                    </div>
                    {/* 이미지 바로 아래에 안내 문구 배치 */}
                    <p className="text-xs text-gray-500 mt-5">{t('hospitalInfo.dummyImageNotice')}</p>
                </div>
                <div className="flex flex-col w-full md:w-auto">
                    <div>
                        <Title level={2} className="!mb-2">{hospitalDetail.length > 0 && hospitalDetail[0].hospital_name}</Title>
                    </div>
                    <div className="flex items-baseline mb-1">
                        <EnvironmentOutlined /> 
                        <span className="ml-2">
                            <Title level={5} className="text-gray-600 !mb-0">{hospitalDetail.length > 0 && hospitalDetail[0].hospital_main_address}</Title>
                        </span>
                    </div>
                    <div className="flex items-baseline mb-2">
                        <PhoneOutlined />
                        <span className="ml-2">
                            <Title level={5} className="!mb-0">{hospitalDetail.length > 0 && hospitalDetail[0].hospital_phone_number}</Title>
                        </span>
                    </div>
                    {sessionStorage.getItem("isLoggedIn") === "true" &&
                        <Button variant="solid" style={{backgroundColor: "rgb(14 137 136)", color: "#fff", maxWidth: '170px'}} className="mt-3 self-start md:self-auto" onClick={handleRegisterHospitalClick}>
                            {/* 진료 예약하기 */}
                            {t('hospitalInfo.bookAppointment')}
                        </Button>
                    }
                </div>
            </div>

            {/* 오른쪽: 즐겨찾기 버튼 */}
            {sessionStorage.getItem("isLoggedIn") === "true" && (
                <div className="self-start md:self-start flex-shrink-0 mt-2 md:mt-0"> 
                    <Button
                        icon={isBookmarked ? <StarFilled style={{ color: '#fadb14' }} /> : <StarOutlined />}
                        onClick={handleBookmarkClick}
                        size="large"
                    >
                        {/* {isBookmarked ? '즐겨찾기 해제' : '즐겨찾기 추가'} */}
                        {isBookmarked ? t('hospitalInfo.removeFavorite') : t('hospitalInfo.addFavorite')} 
                    </Button>
                </div>
            )}

            </div>

            <Divider /> {/* 구분선 */}



            <div>
                <Title level={4}>
                    <GlobalOutlined />  {" "}
                    {/* 가능 언어: */}
                    {t('hospitalInfo.availableLanguages')}: 
                </Title>

                <Title level={5}>
                    <Tag style={{fontSize: '16px', padding: '5px'}}>
                        {/* 한국어 */}
                        {t('filter.korean')}
                    </Tag>
                    {hospitalDetail.length > 0 &&  hospitalDetail[0].hospital_languages.length > 0 &&
                        hospitalDetail[0].hospital_languages.split(",").map((language, idx) => {
                            return (
                                <Tag key={idx} style={{ fontSize: '16px', marginBottom: '10px',  marginRight: '10px', padding: '5px'}}>
                                    {language.trim()}
                                </Tag>
                            );
                        })
                    }
                </Title>

                <Title level={4}>
                    <AppstoreAddOutlined />  {" "}
                    {/* 진료 과목: */}
                    {t('hospitalInfo.medicalDepartment')}:
                    
                </Title>

                <Title level={5}>
                    {/* <span>&nbsp;&nbsp;&nbsp;&nbsp;</span> */}
                    {hospitalDetail.length > 0 && 
                        hospitalDetail[0].hospital_category.split(",").map((category, idx) => {
                            return (
                                <Tag key={idx} style={{ fontSize: '16px', marginBottom: '10px',  marginRight: '10px', padding: '5px'}}>
                                    {category.trim()}
                                </Tag>
                            );
                        })
                    }
                </Title>

            </div>

            <Divider />
            <div>
                <Title level={4}>
                    <ClockCircleOutlined />   {" "}
                    {/* 진료 시간: */}
                    {t('hospitalInfo.operatingHours')}: 
                    
                </Title>

                <Title level={5}>
                    <div className="mb-1">
                        {/* • 월~금 09:00~18:00 (점심시간 12:00~13:00) */}
                        • {t('hospitalInfo.operatingHoursDetails.weekdays')}
                    </div>
                    <div className="mb-1">
                        {/* • 토요일 09:00~13:00 */}
                        • {t('hospitalInfo.operatingHoursDetails.saturday')}
                    </div>
                    <div className="mb-1">
                        {/* • 일요일/공휴일 휴무 */}
                        • {t('hospitalInfo.operatingHoursDetails.closed')}
                    </div>
                </Title>

                <small style={{ color: "#888", display: "block", marginTop: "10px" }}>
                    {/* ※ 해당 정보는 실제 병원 데이터가 아닌 더미 데이터입니다. */}
                    {t('hospitalInfo.dummyTimeNotice')}
                </small>

            </div>



            <Divider />

            <div>
                <Title level={3}>
                    <EnvironmentOutlined />   {" "}
                    {/* 오시는 길 */}
                    {t('hospitalInfo.location')}
                    
                </Title>
            

                {hospitalDetail.length > 0 &&
                    <div style={{ width: "100%", height: "450px", marginTop: "30px", marginBottom: "30px"}}>
                        <iframe
                            title="hospital-location"
                            src={`https://www.google.com/maps?q=${encodeURIComponent(hospitalDetail[0].hospital_name + ' ' + hospitalDetail[0].hospital_address)}&output=embed&hl=${currentLang}`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            // allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                }

                <div className="flex items-baseline">
                    <Title level={5}>
                        {hospitalDetail.length > 0 && hospitalDetail[0].hospital_address}
                    </Title>

                    <Button
                        icon={<CopyOutlined />} 
                        onClick={() => copyToClipboard(hospitalDetail[0].hospital_address)}
                        style={{ marginLeft: '20px' }}
                    >
                        {/* 복사 */}
                        {t('hospitalInfo.copyAddress')}
                    </Button>
                </div>
            </div>
            <Divider />

            

            {/* --- 리뷰 --- */}
            <div>
                <div className="flex justify-between items-center mb-4"> 
                    <Title level={3} style={{ marginBottom: 0 }}> 
                        <MessageOutlined />   {" "}
                        {/* 리뷰 ({hospitalReview.length}) */}
                        {t('hospitalInfo.reviews', { count: hospitalReview.length })}
                    </Title>

                    {/* 로그인 상태일 때만 리뷰 작성 버튼 표시 */}
                    {sessionStorage.getItem("isLoggedIn") === "true" &&
                        <Button onClick={handleWriteReviewClick}>
                            {/* 리뷰 작성하기 */}
                            {t('hospitalInfo.writeReview')}
                        </Button>
                    }
                </div>

                {/* --- 병원 리뷰 --- */}
                {hospitalReview && hospitalReview.length > 0 ? (
                    <div style={{ marginTop: '20px' }}>
                        {hospitalReview.map((review) => (
                            <Card key={review.id} style={{ marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    
                                    <Rate disabled defaultValue={0} value={review.rate} style={{ fontSize: '18px' }} />
                                    
                                    <span style={{ fontSize: '0.9em', color: '#888' }}>
                                        {new Date(review.created_at).toLocaleDateString()} 
                                    </span>
                                </div>
                                
                                <p>{review.translated_text}</p>
                                <small style={{ color: '#aaa' }}>
                                    {/* 원본 언어:  */}
                                    {t('hospitalInfo.originalLanguage')}{": "}
                                    {review.original_language}</small>
                            </Card>
                        ))}
                    </div>
                ) : (
                    // 리뷰가 없을 때 메시지 표시
                    <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                        {/* 아직 등록된 리뷰가 없습니다. */}
                        {t('hospitalInfo.noReviews')}
                    </div>
                )}
            </div>


        </>
    );
}
 
export default HospitalInfoPage;