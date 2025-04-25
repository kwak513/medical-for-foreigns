import { Button, Card, Divider, Dropdown, Menu, Modal, Space } from "antd";
import hospitalRandom1 from '../../assets/hospitalImg/hospitalRandom1.jpg';
import hospitalRandom2 from '../../assets/hospitalImg/hospitalRandom2.jpg';
import hospitalRandom3 from '../../assets/hospitalImg/hospitalRandom3.jpg';
import hospitalRandom4 from '../../assets/hospitalImg/hospitalRandom4.jpg';
import hospitalRandom5 from '../../assets/hospitalImg/hospitalRandom5.jpg';
import hospitalRandom0 from '../../assets/hospitalImg/hospitalRandom6.jpg';
import { useEffect, useState } from "react";
import { filterHospitalByLangDepartLocation, searchAndFilterHospital, select15FromGangnamGangDongHospital, selectByHospitalName } from "../../api/chartboardApi";
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

    //  필터링 기준 - 가능 언어
    const [selectedLanguage, setSelectedLanguage] = useState('가능 언어');
    //  선택한 진료과
    const [selectedDepartment, setSelectedDepartment] = useState('진료 과목');
    //  선택한 지역
    const [selectedLocation, setSelectedLocation] = useState('지역');


    const isFilterSelected = (
        selectedLanguage !== '가능 언어' ||
        selectedDepartment !== '진료 과목' ||
        selectedLocation !== '지역'
      );


    // //  필터링 하기
    // useEffect(() => {
    // if (selectedLanguage !== '가능 언어' || selectedDepartment !== '진료 과목' || selectedLocation !== '지역'){
    //     filterHospitalByLangDepartLocation(
    //         filterMapping.language[selectedLanguage as keyof typeof filterMapping.language] ?? selectedLanguage,
    //         filterMapping.department[selectedDepartment as keyof typeof filterMapping.department] ?? selectedDepartment,
    //         filterMapping.location[selectedLocation as keyof typeof filterMapping.location] ?? selectedLocation,
    
            
    //         offset
    //     )
    //     .then((list) => {
    //         console.log("filterHospitalByLangDepartLocation 결과: ", list);

    //         if (list.length < 30) { // 데이터가 30개 미만이면, '더보기' 버튼 비활성화
    //             setHasMoreInfo(false);
    //         } else {
    //             setHasMoreInfo(true); // 30개면 더보기 버튼 활성화 (백엔드에서 데이터 로딩 시, limit 30임)
    //         }
    //         setHospitalInfo((prev) => offset === 0 ? list : [...prev, ...list]); // offset 0이면 초기화, 아니면 데이터 누적
    //     })
    //         .catch((err) => {
    //             console.log("filterHospitalByLangDepartLocation 병원 필터링 실패: ", err);
    //             alert("병원 필터링을 실패했습니다.");
    //         });
    // }
    // }, [selectedLanguage, selectedDepartment, selectedLocation, offset])






    // 병원 데이터 불러오기
    const loadHospitalData = () => {
        if(searchHospitalName || isFilterSelected){
            searchAndFilterHospital(
                searchHospitalName,
                filterMapping.language[selectedLanguage as keyof typeof filterMapping.language] ?? selectedLanguage,
                filterMapping.department[selectedDepartment as keyof typeof filterMapping.department] ?? selectedDepartment,
                filterMapping.location[selectedLocation as keyof typeof filterMapping.location] ?? selectedLocation,
            
                    
                offset
            )
            .then((list) => {
                console.log("searchAndFilterHospital 결과: ", list);
    
                if (list.length < 15) { // 데이터가 15개 미만이면, '더보기' 버튼 비활성화
                    setHasMoreInfo(false);
                } else {
                    setHasMoreInfo(true); // 15개면 더보기 버튼 활성화 (백엔드에서 데이터 로딩 시, limit 15임)
                }
                setHospitalInfo((prev) => offset === 0 ? list : [...prev, ...list]); // offset 0이면 초기화, 아니면 데이터 누적
            })
                .catch((err) => {
                    console.log("searchAndFilterHospital 병원 필터링 실패: ", err);
                    alert("병원 필터링을 실패했습니다.");
                });
        }
        // if(searchHospitalName && isFilterSelected){
            // searchAndFilterHospital(
            //     searchHospitalName,
            //     filterMapping.language[selectedLanguage as keyof typeof filterMapping.language] ?? selectedLanguage,
            //     filterMapping.department[selectedDepartment as keyof typeof filterMapping.department] ?? selectedDepartment,
            //     filterMapping.location[selectedLocation as keyof typeof filterMapping.location] ?? selectedLocation,
            
                    
            //     offset
            // )
            // .then((list) => {
            //     console.log("searchAndFilterHospital 결과: ", list);
    
            //     if (list.length < 15) { // 데이터가 15개 미만이면, '더보기' 버튼 비활성화
            //         setHasMoreInfo(false);
            //     } else {
            //         setHasMoreInfo(true); // 15개면 더보기 버튼 활성화 (백엔드에서 데이터 로딩 시, limit 15임)
            //     }
            //     setHospitalInfo((prev) => offset === 0 ? list : [...prev, ...list]); // offset 0이면 초기화, 아니면 데이터 누적
            // })
            //     .catch((err) => {
            //         console.log("searchAndFilterHospital 병원 필터링 실패: ", err);
            //         alert("병원 필터링을 실패했습니다.");
            //     });
        // }
        // if (searchHospitalName) {   // 검색어가 있다면, 
        //     selectByHospitalName(searchHospitalName, offset)
        //         .then((list) => {
        //             console.log("searchHospitalName 결과: ", list);

        //             if (list.length < 30) { // 데이터가 30개 미만이면, '더보기' 버튼 비활성화
        //                 setHasMoreInfo(false);
        //             } else {
        //                 setHasMoreInfo(true); // 30개면 더보기 버튼 활성화 (백엔드에서 데이터 로딩 시, limit 30임)
        //             }
        //             setHospitalInfo((prev) => offset === 0 ? list : [...prev, ...list]); // offset 0이면 초기화, 아니면 데이터 누적
        //         })
        //         .catch((err) => {
        //             console.log("병원 검색 실패: ", err);
        //             alert("병원 검색을 실패했습니다.");
        //         });
        // } 
        // else if(isFilterSelected){
        //     if (selectedLanguage !== '가능 언어' || selectedDepartment !== '진료 과목' || selectedLocation !== '지역'){
        //         filterHospitalByLangDepartLocation(
        //             filterMapping.language[selectedLanguage as keyof typeof filterMapping.language] ?? selectedLanguage,
        //             filterMapping.department[selectedDepartment as keyof typeof filterMapping.department] ?? selectedDepartment,
        //             filterMapping.location[selectedLocation as keyof typeof filterMapping.location] ?? selectedLocation,
            
                    
        //             offset
        //         )
        //         .then((list) => {
        //             console.log("filterHospitalByLangDepartLocation 결과: ", list);
        
        //             if (list.length < 15) { // 데이터가 15개 미만이면, '더보기' 버튼 비활성화
        //                 setHasMoreInfo(false);
        //             } else {
        //                 setHasMoreInfo(true); // 15개면 더보기 버튼 활성화 (백엔드에서 데이터 로딩 시, limit 15임)
        //             }
        //             setHospitalInfo((prev) => offset === 0 ? list : [...prev, ...list]); // offset 0이면 초기화, 아니면 데이터 누적
        //         })
        //             .catch((err) => {
        //                 console.log("filterHospitalByLangDepartLocation 병원 필터링 실패: ", err);
        //                 alert("병원 필터링을 실패했습니다.");
        //             });
        //     }
        // }
        else {    // 검색어 없으면 기본 정보 (where hospitalName 없는거)
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
}, [searchHospitalName, selectedLanguage, selectedDepartment, selectedLocation]); 

// 검색어나 offset이 바뀌면, 데이터 새로 로딩
useEffect(() => {
    loadHospitalData();
}, [searchHospitalName, offset, selectedLanguage, selectedDepartment, selectedLocation]); 


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

    // //  필터링 기준 - 가능 언어
    // const [selectedLanguage, setSelectedLanguage] = useState('가능 언어');

    const languageItems: MenuProps['items'] = [
        {key: '0',label: (<span>전체 언어</span>), onClick: () => {setSelectedLanguage('전체 언어')}},
        {key: '1',label: (<span>한국어</span>), onClick: () => {setSelectedLanguage('한국어')}},
        {key: '2',label: (<span>영어</span>), onClick: () => {setSelectedLanguage('영어')},},
        {key: '3',label: (<span>중국어</span>), onClick: () => {setSelectedLanguage('중국어')},},
        {key: '4',label: (<span>일어</span>), onClick: () => {setSelectedLanguage('일어')}},
        {key: '5',label: (<span>러시아어</span>), onClick: () => {setSelectedLanguage('러시아어')},},
        {key: '6',label: (<span>베트남어</span>), onClick: () => {setSelectedLanguage('베트남어')},},
        {key: '7',label: (<span>몽골어</span>), onClick: () => {setSelectedLanguage('몽골어')},},
        {key: '8',label: (<span>중동어</span>), onClick: () => {setSelectedLanguage('중동어')},},
        {key: '9',label: (<span>우즈베키스탄어</span>), onClick: () => {setSelectedLanguage('우즈베키스탄어')}}
        
    ];

// -----------------------------------

    // //  선택한 진료과
    // const [selectedDepartment, setSelectedDepartment] = useState('진료 과목');

    // 진료과 관련 모달
    const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);

    const showModal = () => {
        setIsDepartmentModalOpen(true);
    };

    const handleOk = () => {
        setIsDepartmentModalOpen(false);
    };

    const handleCancel = () => {
        setIsDepartmentModalOpen(false);
    };

    // 진료과 모달 내부의 카드 css
    const gridStyle: React.CSSProperties = {
        width: 'calc(100% / 3)',
        textAlign: 'center',
    };
    

    


// -----------------------------------

    // //  선택한 지역
    // const [selectedLocation, setSelectedLocation] = useState('지역');

    // 지역 관련 모달
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

    const showLocationModal = () => {
        setIsLocationModalOpen(true);
    };

    const handleLocationOk = () => {
        setIsLocationModalOpen(false);
    };

    const handleLocationCancel = () => {
        setIsLocationModalOpen(false);
    };

    
    
    // 진료지역 모달 내부의 카드 css
    const gridStyle25: React.CSSProperties = {
        width: '25%',
        textAlign: 'center',
    };

// -------------------------------------
    const filterMapping = {
    language: {
        '가능 언어': '',
        '전체 언어': '',
        '한국어': ''
    },
    department: {
        '진료 과목': '',
        '전체 과목': ''
        
    },
    location: {
        '지역': '',
        '서울시 전체': ''
    }
    };






    return (  
        <>
        {/* 언어 필터링 */}
        <div className="flex gap-2 items-baseline">
            <div>
            <Dropdown menu={{ items: languageItems }}>
                <a onClick={(e) => {
                    e.preventDefault()
                    // setSelectedLanguage(e.target.key)
                    }}>
                <Space>
                    {selectedLanguage}
                    <DownOutlined />
                </Space>
                </a>
            </Dropdown>
            </div>
            {/* 진료과목 필터링 */}
            <div>
                <Button onClick={showModal} style={{color: 'rgb(22 119 255)'}}>
                    {selectedDepartment}
                </Button>
                <Modal title="진료 과목 선택" open={isDepartmentModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    {/* <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p> */}
                    <Card>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('전체 과목')}>전체 과목</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('소아청소년과')}>소아청소년과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('치과')}>치과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('이비인후과')}>이비인후과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('피부과')}>피부과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('산부인과')}>산부인과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('안과')}>안과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('정신건강의학과')}>정신건강의학과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('성형외과')}>성형외과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('정형외과')}>정형외과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('한방각과')}>한방각과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('비뇨기과')}>비뇨기과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('가정의학과')}>가정의학과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('내과')}>내과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('외과')}>외과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('흉부외과')}>흉부외과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('마취통증의학과')}>마취통증의학과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('영상의학과')}>영상의학과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('신경과')}>신경과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('신경외과')}>신경외과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('재활의학과')}>재활의학과</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartment('정신건강의학과')}>정신건강의학과</Card.Grid>
                    </Card>
                </Modal>
            </div>       

            {/* 지역 필터링 */}
            <div>
                <Button onClick={showLocationModal} style={{color: 'rgb(22 119 255)'}}>
                    {selectedLocation}
                </Button>
                <Modal title="지역 선택" open={isLocationModalOpen} onOk={handleLocationOk} onCancel={handleLocationCancel}>
                    {/* <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p> */}
                    <small style={{ color: "#888", display: "block", marginTop: "10px", marginBottom: "10px" }}>
                        ※ 현재 강남구와 강동구 정보만 제공됩니다. 
                    </small>

                    <Card>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedLocation('서울시 전체')}>서울시 전체</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedLocation('강남구')}>강남구</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedLocation('강동구')}>강동구</Card.Grid>
                        {/* <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('강북구')}>강북구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('강서구')}>강서구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('관악구')}>관악구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('광진구')}>광진구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('구로구')}>구로구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('금천구')}>금천구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('노원구')}>노원구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('도봉구')}>도봉구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('동대문구')}>동대문구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('동작구')}>동작구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('마포구')}>마포구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('서대문구')}>서대문구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('서초구')}>서초구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('성동구')}>성동구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('성북구')}>성북구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('송파구')}>송파구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('양천구')}>양천구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('영등포구')}>영등포구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('용산구')}>용산구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('은평구')}>은평구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('종로구')}>종로구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('중구')}>중구</Card.Grid>
                        <Card.Grid style={gridStyle25} onClick={() => setSelectedLocation('중랑구')}>중랑구</Card.Grid> */}
                    </Card>
                </Modal>
            </div>   

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