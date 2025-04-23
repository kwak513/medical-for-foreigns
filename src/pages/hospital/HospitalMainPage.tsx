import { Button, Card, Divider, Dropdown, Space } from "antd";
import hospitalRandom1 from '../../assets/hospitalImg/hospitalRandom1.jpg';
import hospitalRandom2 from '../../assets/hospitalImg/hospitalRandom2.jpg';
import hospitalRandom3 from '../../assets/hospitalImg/hospitalRandom3.jpg';
import hospitalRandom4 from '../../assets/hospitalImg/hospitalRandom4.jpg';
import hospitalRandom5 from '../../assets/hospitalImg/hospitalRandom5.jpg';
import hospitalRandom0 from '../../assets/hospitalImg/hospitalRandom6.jpg';
import { useEffect, useState } from "react";
import { select15FromGangnamGangDongHospital, selectByHospitalName } from "../../api/chartboardApi";
import { AppstoreAddOutlined, DownOutlined, EnvironmentOutlined, GlobalOutlined, SmileOutlined } from "@ant-design/icons";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import Title from "antd/es/typography/Title";
import type { MenuProps } from 'antd';





const HospitalMainPage = () => {

    // 페이지 접속 시, 스크롤바 맨 위로.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // MainLayout에서 
    const location = useLocation();
    const {searchHospitalName} = location.state || {};

    // MainLayout에서 Outlet에 context로 보낸 걸 받아옴.
    const { offset, setOffset} = useOutletContext();


    // 백엔드에서 select15FromGangnamGangDongHospital, selectByHospitalName 호출하면 나올 JSON 형식
    interface HospitalInfo{
        hospital_languages: string;
        source:string;
        hospital_main_category: string;
        hospital_main_address: string;
        hospital_name: string;
        hospital_id: number;
    }
    // select15FromGangnamGangDongHospital, selectByHospitalName 결과 저장
    const [hospitalInfo, setHospitalInfo] = useState<HospitalInfo []>([]);
    // select15FromGangnamGangDongHospital 호출 시, 보낼 offsetNum
    // const [offset, setOffset] = useState(0);

    //  '더보기' 버튼 유무 설정
    const [hasMoreInfo, setHasMoreInfo] = useState(true);


    // '강남구' 데이터에서 '미국/일본/중국/러시아/중동/몽골/베트남'로 넘어오는 걸 언어로 변환
    const languageMapping  = {
        '미국': '영어',
        '일본': '일어',
        '중국': '중국어',
        '러시아': '러시아어',
        '중동': '중동어',
        '몽골': '몽골어',
        '베트남': '베트남어'
    };

    const getRefinedLanguages = (languages: string) => {
        return languages.split('/').map((language) => languageMapping[language.trim() as keyof typeof languageMapping] || language).join(', ');
    }





    // 병원 데이터 불러오기
    const loadHospitalData = (searchHospitalName: string | undefined, offset: number) => {
        if (searchHospitalName) {   // 검색어가 있다면, 
            selectByHospitalName(searchHospitalName, offset)
                .then((list) => {
                    console.log("searchHospitalName 결과: ", list);

                    if (list.length < 30) { // 데이터가 30개 미만이면, '더보기' 버튼 비활성화
                        setHasMoreInfo(false);
                    } else {
                        setHasMoreInfo(true); // 30개면 더보기 버튼 활성화 (백엔드에서 데이터 로딩 시, limit 30임)
                    }
                    setHospitalInfo((prev) => offset === 0 ? list : [...prev, ...list]); // offset 0이면 초기화, 아니면 데이터 누적
                })
                .catch((err) => {
                    console.log("병원 검색 실패: ", err);
                    alert("병원 검색을 실패했습니다.");
                });
        } else {    // 검색어 없으면 기본 정보 (where hospitalName 없는거)
            select15FromGangnamGangDongHospital(offset)
                .then((list) => {
                    console.log("select15FromGangnamGangDongHospital 결과: ", list);

                    if (list.length < 30) { // 데이터가 30개 미만이면, '더보기' 버튼 비활성화
                        setHasMoreInfo(false); 
                    } else {
                        setHasMoreInfo(true); // 30개면 더보기 버튼 활성화 (백엔드에서 데이터 로딩 시, limit 30임)
                    }
                    setHospitalInfo((prev) => offset === 0 ? list : [...prev, ...list]); // offset 0이면 초기화, 아니면 데이터 누적
                })
                .catch((err) => {
                    console.log("병원 정보 불러오기 실패: ", err);
                    alert("병원 정보를 불러오지 못했습니다.");
                });
        }
    };


//  검색어 바뀔때마다, 기존 offset과 hospitalInfo 데이터 초기화
useEffect(() => {
    setOffset(0); 
    setHospitalInfo([]); 
}, [searchHospitalName]); 

// 검색어나 offset이 바뀌면, 데이터 새로 로딩
useEffect(() => {
    loadHospitalData(searchHospitalName, offset);
}, [searchHospitalName, offset]); 


    // 병원 데모 데이터
    // const cards = [
    //     { title: 'Card 1', address: 'Card address 1', language: 'English', category: '치과'},
    //     { title: 'Card 2', address: 'Card address 2', language: 'English', category: '치과'},
    //     { title: 'Card 3', address: 'Card address 3', language: 'English', category: '치과'},
    //     { title: 'Card 4', address: 'Card address 4', language: 'English', category: '치과'},
    //     { title: 'Card 5', address: 'Card address 5', language: 'English', category: '치과'},
    //     { title: 'Card 6', address: 'Card address 6', language: 'English', category: '치과'},
    //     { title: 'Card 7', address: 'Card address 7', language: 'English', category: '치과'},
    //     { title: 'Card 8', address: 'Card address 8', language: 'English', category: '치과'},
    //     { title: 'Card 9', address: 'Card address 9', language: 'English', category: '치과'},

    // ];

    //  병원 이미지 데모 데이터
    const images = [
        hospitalRandom1,
        hospitalRandom2,
        hospitalRandom3,
        hospitalRandom4,
        hospitalRandom5,
        hospitalRandom0
    ];

    // '병원 더보기' 버튼 누르면, offset(시작 인덱스) 값 15씩 증가
    const handleMoreHospitalClick = () => {
        setOffset((prev) => prev + 15);
    }

    // Card(병원) 누르면, HospitalInfoPage로 navigate, state로 hospital_id, source 보냄
    const navigate = useNavigate();
    const handleHospitalCardClick = (hospitalId: number, hospitalSource: string, index: number) => {
        navigate("/hospital/info", {state: {hospitalId, hospitalSource, index}})
    }

    //  필터링 기준 - 가능 언어
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const languageItems: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <span>
                    한국어
                </span>
            ),
        },
        {
            key: '2',
            label: (
                <span>
                    영어
                </span>
            ),
        },
        {
            key: '3',
            label: (
                <span>
                    영어
                </span>
            ),
        },
        {
            key: '4',
            label: (
                <span>
                    중국어
                </span>
            ),
        },
        {
            key: '5',
            label: (
                <span>
                    러시아어
                </span>
            ),
        },
        {
            key: '6',
            label: (
                <span>
                    베트남어
                </span>
            ),
        },
        {
            key: '7',
            label: (
                <span>
                    몽골어
                </span>
            ),
        },
        {
            key: '8',
            label: (
                <span>
                    중동어
                </span>
            ),
        },
        {
            key: '9',
            label: (
                <span>
                    우즈베키스탄어
                </span>
            ),
        }
        
    ];

    const departmentItems: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <span>
                    소아청소년과
                </span>
            ),
        },
        {
            key: '2',
            label: (
                <span>
                    치과
                </span>
            ),
        },
        {
            key: '3',
            label: (
                <span>
                    이비인후과
                </span>
            ),
        },
        {
            key: '4',
            label: (
                <span>
                    피부과
                </span>
            ),
        },
        {
            key: '5',
            label: (
                <span>
                    산부인과
                </span>
            ),
        },
        {
            key: '6',
            label: (
                <span>
                    안과
                </span>
            ),
        },
        {
            key: '7',
            label: (
                <span>
                    정신의학과
                </span>
            ),
        },
        {
            key: '8',
            label: (
                <span>
                    성형외과
                </span>
            ),
        },
        {
            key: '9',
            label: (
                <span>
                    정형외과
                </span>
            ),
        },
        {
            key: '10',
            label: (
                <span>
                    한의과
                </span>
            ),
        },
        {
            key: '11',
            label: (
                <span>
                    비뇨기과
                </span>
            ),
        },
        {
            key: '12',
            label: (
                <span>
                    가정의학과
                </span>
            ),
        },
        {
            key: '13',
            label: (
                <span>
                    외과
                </span>
            ),
        },
        {
            key: '14',
            label: (
                <span>
                    흉부외과
                </span>
            ),
        },
        {
            key: '15',
            label: (
                <span>
                    마취통증과
                </span>
    
    
            ),
        },
        {
            key: '16',
            label: (
                <span>
                    영상의학과
                </span>
            ),
        },
        {
            key: '179',
            label: (
                <span>
                    신경과
                </span>
            ),
        },
        {
            key: '18',
            label: (
                <span>
                    재활의학과
                </span>
            ),
        }
    ];
    
    
    return (  
        <>
        {/* 필터링 */}
        <div>
        {/* <Dropdown menu={{ languageItems }}>
            <a onClick={(e) => {
                e.preventDefault()
                // setSelectedLanguage(e.target.key)
                }}>
            <Space>
                가능 언어
                <DownOutlined />
            </Space>
            </a>
        </Dropdown> */}
        
        {/* <Dropdown menu={{ departmentItems }}>
            <a onClick={(e) => {
                e.preventDefault()
                // setSelectedLanguage(e.target.key)
                }}>
            <Space>
                진료과
                <DownOutlined />
            </Space>
            </a>
        </Dropdown> */}

        


        </div>
        <Divider />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {hospitalInfo.map((info, index) => (
                <Card
                    key={index}
                    title={info.hospital_name}
                    variant="borderless"
                    style={{ width: 'calc(50% - 8px)', minHeight: '160px', cursor: "pointer"}}
                    className="border-1 border-gray-200"
                    onClick={() => {handleHospitalCardClick(info.hospital_id, info.source, index)}}
                >
                    <div className="flex justify-between items-center">
                        <div >
                            {/* p 태그 3개를 하나의 div로 묶음 */}
                            <p><EnvironmentOutlined /> {info.hospital_main_address}</p>
                            <p><GlobalOutlined /> 
                                {/* {"한국어, " + getRefinedLanguages(info.hospital_languages)} */}
                                {getRefinedLanguages(info.hospital_languages) ? " 한국어, " + getRefinedLanguages(info.hospital_languages) : " 한국어"}

                            </p>
                            <p><AppstoreAddOutlined /> {info.hospital_main_category}</p>
                        </div>

                        <div style={{ width: '100px', height: '100px', overflow: 'hidden', borderRadius: '8px' }}>
                            {/* 이미지를 div로 감싸고 스타일링 */}
                            <img alt="병원 이미지" src={images[index % 6]} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </Card>
            
            ))}
        </div>

        {hasMoreInfo && hospitalInfo.length > 0 &&
            <div className="flex justify-center items-center mt-7">
                <Button size="large" className="w-80" onClick={handleMoreHospitalClick}>병원 더보기</Button>
            </div>
        }


        {hospitalInfo == null || hospitalInfo.length <= 0 &&
            <div className="flex justify-center">
                <Title level={5}>검색한 병원명과 일치하는 병원 정보가 없습니다.</Title>
            </div>
            
        }
        </>
    );
}
 
export default HospitalMainPage;