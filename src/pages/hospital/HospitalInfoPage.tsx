import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteMemberFavorite, insertIntoMemberFavorite, isFavoriteCheck, selectFromGangdongHospital, selectFromGangnamHospital, selectFromHospitalReview, selectFromMemberFavorite } from "../../api/chartboardApi";
import hospitalRandom1 from '../../assets/hospitalImg/hospitalRandom1.jpg';
import hospitalRandom2 from '../../assets/hospitalImg/hospitalRandom2.jpg';
import hospitalRandom3 from '../../assets/hospitalImg/hospitalRandom3.jpg';
import hospitalRandom4 from '../../assets/hospitalImg/hospitalRandom4.jpg';
import hospitalRandom5 from '../../assets/hospitalImg/hospitalRandom5.jpg';
import hospitalRandom0 from '../../assets/hospitalImg/hospitalRandom6.jpg';
import Title from "antd/es/typography/Title";
import { Button,  Card,  Divider, Rate, Tag } from "antd";
import { AppstoreAddOutlined, ClockCircleOutlined, CopyOutlined, EnvironmentOutlined, GlobalOutlined, MessageOutlined, PhoneOutlined, StarFilled, StarOutlined } from "@ant-design/icons";

const HospitalInfoPage = () => {

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
        if(hospitalSource == "gangnam"){
            selectFromGangnamHospital(hospitalId)
                .then((data) => {
console.log("selectFromGangnamHospital data: ", data);
                    setHospitalDetail(data);
                })
                .catch((err) => {
                    console.log("selectFromGangnamHospital 실패: ", err);
                    alert("병원 상세 정보를 불러오지 못했습니다.")
                })
        }
        else if(hospitalSource == "gangdong"){
            selectFromGangdongHospital(hospitalId)
                .then((data) => {
console.log("selectFromGangdongHospital data: ", data);                    
                    setHospitalDetail(data);
                })
                .catch((err) => {
                    console.log("selectFromGangdongHospital 실패: ", err);
                    alert("병원 상세 정보를 불러오지 못했습니다.")
                })

        }
    }, [])

    interface HospitalReview{
        "original_language": string;
        "rate": number;
        "created_at": string;
        "id": number;
        "original_text": string;
    }
    // 병원의 리뷰 정보 가져오기
    const [hospitalReview, setHospitalReview] = useState<HospitalReview[]>([]);
    useEffect(() => {
        selectFromHospitalReview(hospitalId, hospitalSource)
            .then((list) => {
                setHospitalReview(list);

            })
            .catch((err) => {
                console.log("selectFromHospitalReview 실패: ", err);
                alert("병원 리뷰를 불러오지 못했습니다.")
            })
    }, [])

    //  병원 이미지 데모 데이터
    const images = [
        hospitalRandom1,
        hospitalRandom2,
        hospitalRandom3,
        hospitalRandom4,
        hospitalRandom5,
        hospitalRandom0
    ];

    // '강남구' 데이터에서 '미국/일본/중국/러시아/중동/몽골/베트남'로 넘어오는 걸 언어로 변환
    const languageMapping  = {
        '미국': '영어',
        '일본': '일본어',
        '중국': '중국어',
        '러시아': '러시아어',
        '중동': '중동어',
        '몽골': '몽골어',
        '베트남': '베트남어'
    };

    const getRefinedLanguages = (languages: string) => {
        return languages.split('/').map((language) => languageMapping[language.trim() as keyof typeof languageMapping] || language).join(', ');
    }

    // 주소 '복사' 버튼 로직
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert("주소가 복사되었습니다.");
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
                alert("즐겨찾기 여부를 불러오지 못했습니다.")
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
                        alert("즐겨찾기에 추가되었습니다.");
                    }
                    
                })
                .catch((err) => {
                    console.log("insertIntoMemberFavorite 실패: ", err);
                    alert("즐겨찾기를 추가하지 못했습니다.")
                })
        } 
        //  즐겨찾기 취소
        else if(isBookmarked){
            deleteMemberFavorite(Number(sessionStorage.getItem("userId")), hospitalId, hospitalSource)
                .then((bool) => {
                    if(bool == true){
                        setIsBookmarked(false);
                        alert("즐겨찾기에서 해제되었습니다.");
                    }
                    
                })
                .catch((err) => {
                    console.log("deleteMemberFavorite 실패: ", err);
                    alert("즐겨찾기를 해제하지 못했습니다.")
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
                <div className="w-full max-w-xs sm:max-w-sm md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] overflow-hidden rounded-lg flex-shrink-0"> 
                    <img alt="병원 이미지" src={images[hospitalId % 6]} className="w-full h-full object-cover" />
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
                        <Button variant="solid" style={{backgroundColor: "rgb(14 137 136)", color: "#fff"}} className="mt-3 self-start md:self-auto" onClick={handleRegisterHospitalClick}>
                            진료 예약하기
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
                        {isBookmarked ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                    </Button>
                </div>
            )}

            </div>

            <Divider /> {/* 구분선 */}



            <div>
                <Title level={4}>
                    <GlobalOutlined />  가능 언어:
                    
                </Title>

                <Title level={5}>
                    {/* {
                    hospitalDetail.length > 0 && 
                        (hospitalDetail[0].hospital_languages.length > 0 ?
                            ` 한국어, ${getRefinedLanguages(hospitalDetail[0].hospital_languages)}` :
                            " 한국어"
                        )
                    } */}
                    <Tag style={{fontSize: '16px', padding: '5px'}}>한국어</Tag>
                    {hospitalDetail.length > 0 &&  hospitalDetail[0].hospital_languages.length > 0 &&
                        getRefinedLanguages(hospitalDetail[0].hospital_languages).split(",").map((language, idx) => {
                            return (
                                <Tag key={idx} style={{ fontSize: '16px', marginBottom: '10px',  marginRight: '10px', padding: '5px'}}>
                                    {language.trim()}
                                </Tag>
                            );
                        })
                    }
                </Title>

                <Title level={4}>
                    <AppstoreAddOutlined />  진료 과목:
                    
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
                    <ClockCircleOutlined />  진료 시간:
                    
                </Title>

                <Title level={5}>
                    <div className="mb-1">• 월~금 09:00~18:00 (점심시간 12:00~13:00)</div>
                    <div className="mb-1">• 토요일 09:00~13:00</div>
                    <div className="mb-1">• 일요일/공휴일 휴무</div>
                </Title>

                <small style={{ color: "#888", display: "block", marginTop: "10px" }}>
                    ※ 해당 정보는 실제 병원 데이터가 아닌 더미 데이터입니다.
                </small>

            </div>



            <Divider />

            <div>
                <Title level={3}>
                    <EnvironmentOutlined />  오시는 길
                    
                </Title>
            

                {hospitalDetail.length > 0 &&
                    <div style={{ width: "100%", height: "450px", marginTop: "30px", marginBottom: "30px"}}>
                        <iframe
                            title="hospital-location"
                            src={`https://www.google.com/maps?q=${encodeURIComponent(hospitalDetail[0].hospital_name + ' ' + hospitalDetail[0].hospital_address)}&output=embed`}
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
                        복사
                    </Button>
                </div>
            </div>
            <Divider />

            

            {/* --- 리뷰 --- */}
            <div>
                <div className="flex justify-between items-center mb-4"> 
                    <Title level={3} style={{ marginBottom: 0 }}> 
                        <MessageOutlined />  리뷰 ({hospitalReview.length})
                    </Title>

                    {/* 로그인 상태일 때만 리뷰 작성 버튼 표시 */}
                    {sessionStorage.getItem("isLoggedIn") === "true" &&
                        <Button onClick={handleWriteReviewClick}>리뷰 작성하기</Button>
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
                                
                                <p>{review.original_text}</p>
                                <small style={{ color: '#aaa' }}>원본 언어: {review.original_language}</small>
                            </Card>
                        ))}
                    </div>
                ) : (
                    // 리뷰가 없을 때 메시지 표시
                    <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                        아직 등록된 리뷰가 없습니다.
                    </div>
                )}
            </div>


        </>
    );
}
 
export default HospitalInfoPage;