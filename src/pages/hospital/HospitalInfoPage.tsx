import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { selectFromGangdongHospital, selectFromGangnamHospital } from "../../api/chartboardApi";
import hospitalRandom1 from '../../assets/hospitalImg/hospitalRandom1.jpg';
import hospitalRandom2 from '../../assets/hospitalImg/hospitalRandom2.jpg';
import hospitalRandom3 from '../../assets/hospitalImg/hospitalRandom3.jpg';
import hospitalRandom4 from '../../assets/hospitalImg/hospitalRandom4.jpg';
import hospitalRandom5 from '../../assets/hospitalImg/hospitalRandom5.jpg';
import hospitalRandom0 from '../../assets/hospitalImg/hospitalRandom6.jpg';
import Title from "antd/es/typography/Title";
import { Button, Card, Col, Divider, Tag } from "antd";
import { AppstoreAddOutlined, CopyOutlined, EnvironmentOutlined, GlobalOutlined, MessageOutlined, PhoneOutlined, StarOutlined } from "@ant-design/icons";

const HospitalInfoPage = () => {

    // HospitalMainPage에서 state로 보낸 값(hospitalId, hospitalSource)을 location으로 받기
    const location = useLocation();
    const {hospitalId, hospitalSource, index} = location.state;

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
        navigate("/hospital/register", {state: {hospitalDetail}})
    }
    return (
        <>
            <div className="flex gap-20 items-center">
                
                <div style={{ width: '300px', height: '300px', overflow: 'hidden', borderRadius: '8px' }}>
                    {/* 이미지를 div로 감싸고 스타일링 */}
                    <img alt="병원 이미지" src={images[index % 6]} className="w-full h-full object-cover" />
                </div>

                <div>
                    {/* div 태그 3개, Button을 하나의 div로 묶음 */}
                    <div>
                        <Title level={2}>{hospitalDetail.length > 0 && hospitalDetail[0].hospital_name}</Title>
                    </div>
                    <div className="flex items-baseline">
                        <EnvironmentOutlined />
                        <span>&nbsp;&nbsp;</span>

                        <Title level={5} className="text-gray-600">{hospitalDetail.length > 0 && hospitalDetail[0].hospital_main_address}</Title>
                    </div>
                    <div className="flex items-baseline">
                        <PhoneOutlined />
                        <span>&nbsp;&nbsp;</span>

                        <Title level={5}>{hospitalDetail.length > 0 && hospitalDetail[0].hospital_phone_number}</Title>
                    </div>
                    
                    <Button variant="solid" style={{backgroundColor: "rgb(14 137 136)", color: "#fff", marginTop: "10px"}} onClick={handleRegisterHospitalClick}>
                        진료 예약하기
                    </Button>
                </div>
            </div>

            <Divider />

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
                    {hospitalDetail.length > 0 && 
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

            <div>
                <Title level={3}>
                    <MessageOutlined />  리뷰
                    
                </Title>
            </div>
        

        </>
    );
}
 
export default HospitalInfoPage;