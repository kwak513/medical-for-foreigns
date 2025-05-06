import { Button, Card, Divider, Dropdown, Menu, Modal, Space } from "antd";
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

import { useEffect, useState, useMemo } from "react"; // Re-add useMemo for clarity if preferred, or remove later
import { searchAndFilterEnHospital, searchAndFilterHospital, select15FromEnHospital, select15FromGangnamGangDongHospital } from "../../api/chartboardApi";
import { AppstoreAddOutlined, DownOutlined, EnvironmentOutlined, GlobalOutlined, SmileOutlined } from "@ant-design/icons";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import Title from "antd/es/typography/Title";
import type { MenuProps } from 'antd';
import { useTranslation } from "react-i18next";





const HospitalMainPage = () => {

    const { t, i18n } = useTranslation();
    const currentLang = i18n.language; // 'ko' or 'en'

    // 페이지 접속 시, 스크롤바 맨 위로.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // MainLayout에서 
    const location = useLocation();
    const {searchHospitalName} = location.state || {};

    // 컨텍스트 타입을 정의하는 인터페이스 추가
interface HospitalMainPageContext {
    offset: number;
    setOffset: React.Dispatch<React.SetStateAction<number>>;
    }
    
    // MainLayout에서 Outlet에 context로 보낸 걸 받아옴.
    const { offset, setOffset} = useOutletContext<HospitalMainPageContext>();


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


    // 필터링 조건 바뀌면 키 값
    const [selectedLanguageKey, setSelectedLanguageKey] = useState(' ');
    const [selectedDepartmentKey, setSelectedDepartmentKey] = useState('allDepartments');
    const [selectedLocationKey, setSelectedLocationKey] = useState('allRegions');

    // 필터링 조건 바뀔때 화면에 보여줄 값
    const selectedLanguageDisplay = t(`filter.${selectedLanguageKey}`);

    const selectedDepartmentDisplay = selectedDepartmentKey === 'allDepartments' ? t('filter.allDepartments') : t(`filter.department.${selectedDepartmentKey}`); 
    
    const selectedLocationDisplay = selectedLocationKey === 'allRegions' ? t('filter.allRegions') : t(`filter.regions.${selectedLocationKey}`);

    // 필터링 조건 선택되었는지 확인
    const isFilterSelected = 
        // selectedLanguageKey !== 'allLanguages' && ' ' ||
        (selectedLanguageKey !== ' ' && selectedLanguageKey !== 'allLanguages') ||
        selectedDepartmentKey !== 'allDepartments' ||
        selectedLocationKey !== 'allRegions';

    // 사용자가 선택한 key를 보고, 백엔드에 보낼 값으로 매핑
    const getApiFilterValue = (key: string) => {
        // 필터링 조건 선택 X,
        if (key === 'allLanguages' || key === 'allDepartments' || key === 'allRegions') {
            return ''; 
        }

        const koMap = {
            // Languages
            korean: '', english: '영어', chinese: '중국어', japanese: '일본어', russian: '러시아어', vietnamese: '베트남어', mongolian: '몽골어', middleEastern: '아랍어', uzbek: '우즈베키스탄어',
            // Departments
            pediatrics: '소아청소년과', dentistry: '치과', ent: '이비인후과', dermatology: '피부과', obgyn: '산부인과', ophthalmology: '안과', psychiatry: '정신건강의학과', plasticSurgery: '성형외과', orthopedics: '정형외과', oriental: '한방각과', urology: '비뇨기과', familyMedicine: '가정의학과', internal: '내과', surgery: '외과', thoracicSurgery: '흉부외과', anesthesiology: '마취통증의학과', radiology: '영상의학과', neurology: '신경과', neurosurgery: '신경외과', rehabilitation: '재활의학과',
            // Regions
            gangnam: '강남구', gangdong: '강동구'
        };
        const enMap = {
                // Languages
            korean: '', english: 'English', chinese: 'Chinese', japanese: 'Japanese', russian: 'Russian', vietnamese: 'Vietnamese', mongolian: 'Mongolian', middleEastern: 'Arabic', uzbek: 'Uzbek',
            // Departments
            // Match case/format from DB examples (mostly lowercase) based on provided list
            pediatrics: 'pediatrics', dentistry: 'dentistry', ent: 'otolaryngology', dermatology: 'dermatology', obgyn: 'obstetrics and gynecology', ophthalmology: 'ophthalmology', psychiatry: 'psychiatry', plasticSurgery: 'plastic surgery', orthopedics: 'orthopedics', oriental: 'oriental medicine department', urology: 'urology', familyMedicine: 'family medicine', internal: 'internal medicine', surgery: 'surgery', thoracicSurgery: 'thoracic surgery', anesthesiology: 'anesthesiology and pain medicine', radiology: 'radiology', neurology: 'neurology', neurosurgery: 'neurosurgery', rehabilitation: 'rehabilitation medicine',
            // Regions // Keep region mapping as is
            gangnam: 'Gangnam-gu', gangdong: 'Gangdong-gu'
        };

        const map = currentLang === 'ko' ? koMap : enMap;
        return map[key as keyof typeof map] || ''; 
    };

    // 로딩
    const [isLoading, setIsLoading] = useState(true);

    // 병원 데이터 불러오기
    const loadHospitalData = () => {

        setIsLoading(true); // 로딩 중

        // key 값 기준으로, 백엔드에 보낼 값 매핑하는 getApiFilterValue 호출
        const apiLangValue = getApiFilterValue(selectedLanguageKey);
        const apiDeptValue = getApiFilterValue(selectedDepartmentKey);
        const apiLocValue = getApiFilterValue(selectedLocationKey);

        if(searchHospitalName || isFilterSelected){
            const searchFn = currentLang === 'ko' ? searchAndFilterHospital : searchAndFilterEnHospital;
            // 필터링 결과
            searchFn(searchHospitalName, apiLangValue, apiDeptValue, apiLocValue, offset)
            .then((list) => {
                console.log("searchAndFilterHospital/searchAndFilterEnHospital 결과: ", list);
    
                if (list.length < 15) { // 데이터가 15개 미만이면, '더보기' 버튼 비활성화
                    setHasMoreInfo(false);
                } else {
                    setHasMoreInfo(true); // 15개면 더보기 버튼 활성화 (백엔드에서 데이터 로딩 시, limit 15임)
                }
                setHospitalInfo((prev) => offset === 0 ? list : [...prev, ...list]); // offset 0이면 초기화, 아니면 데이터 누적
                setIsLoading(false); // 로딩 X
            })
                .catch((err) => {
                    setIsLoading(false); // 로딩 X
                    console.log("searchAndFilterHospital 병원 필터링 실패: ", err);
                    // alert("병원 필터링을 실패했습니다.");
                    alert(t('alert.filterFailed'));
                });
        }
        else {    // 검색어 없으면 기본 정보 (where hospitalName 없는거)
            const selectFn = currentLang === 'ko' ? select15FromGangnamGangDongHospital : select15FromEnHospital;

            selectFn(offset)
                .then((list) => {
                    console.log("select15FromGangnamGangDongHospital/select15FromEnHospital 결과: ", list);

                    if (list.length < 30) { // 데이터가 30개 미만이면, '더보기' 버튼 비활성화
                        setHasMoreInfo(false); 
                    } else {
                        setHasMoreInfo(true); // 30개면 더보기 버튼 활성화 (백엔드에서 데이터 로딩 시, limit 30임)
                    }
                    setHospitalInfo((prev) => offset === 0 ? list : [...prev, ...list]); // offset 0이면 초기화, 아니면 데이터 누적
                    setIsLoading(false); // 로딩 X
                })
                .catch((err) => {
                    setIsLoading(false); // 로딩 X
                    console.log("병원 정보 불러오기 실패: ", err);
                    alert(t('alert.loadFailed'));
                });
        }
    };


//  검색어 바뀔때마다, 기존 offset과 hospitalInfo 데이터 초기화
useEffect(() => {
    setOffset(0); 
    setHospitalInfo([]);
}, [searchHospitalName, selectedLanguageKey, selectedDepartmentKey, selectedLocationKey, currentLang]); // Use key states

// 검색어나 offset이 바뀌면, 데이터 새로 로딩
useEffect(() => {
    loadHospitalData();
}, [searchHospitalName, offset, selectedLanguageKey, selectedDepartmentKey, selectedLocationKey, currentLang]); // Use key states


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

    // '병원 더보기' 버튼 누르면, offset(시작 인덱스) 값 15씩 증가
    const handleMoreHospitalClick = () => {
        setOffset((prev) => prev + 15);
    }

    // Card(병원) 누르면, HospitalInfoPage로 navigate, state로 hospital_id, source 보냄
    const navigate = useNavigate();
    const handleHospitalCardClick = (hospitalId: number, hospitalSource: string) => {
        navigate("/hospital/info", {state: {hospitalId, hospitalSource}})
    }

    const languageItems: MenuProps['items'] = [
        // Set the key state on click
        {key: 'allLanguages', label: (<span>{t('filter.allLanguages')}</span>), onClick: () => {setSelectedLanguageKey('allLanguages')}},
        {key: 'korean', label: (<span>{t('filter.korean')}</span>), onClick: () => {setSelectedLanguageKey('korean')}},
        {key: 'english', label: (<span>{t('filter.english')}</span>), onClick: () => {setSelectedLanguageKey('english')}},
        {key: 'chinese', label: (<span>{t('filter.chinese')}</span>), onClick: () => {setSelectedLanguageKey('chinese')}},
        {key: 'japanese', label: (<span>{t('filter.japanese')}</span>), onClick: () => {setSelectedLanguageKey('japanese')}},
        {key: 'russian', label: (<span>{t('filter.russian')}</span>), onClick: () => {setSelectedLanguageKey('russian')}},
        {key: 'vietnamese', label: (<span>{t('filter.vietnamese')}</span>), onClick: () => {setSelectedLanguageKey('vietnamese')}},
        {key: 'mongolian', label: (<span>{t('filter.mongolian')}</span>), onClick: () => {setSelectedLanguageKey('mongolian')}},
        {key: 'middleEastern', label: (<span>{t('filter.middleEastern')}</span>), onClick: () => {setSelectedLanguageKey('middleEastern')}},
        {key: 'uzbek', label: (<span>{t('filter.uzbek')}</span>), onClick: () => {setSelectedLanguageKey('uzbek')}}
    
    ];

// -----------------------------------

    // //  필터링 기준 - 가능 언어
    // const [selectedLanguage, setSelectedLanguage] = useState('가능 언어');


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
        // setSelectedDepartment('전체 과목');
        // Reset key state
        setSelectedDepartmentKey('allDepartments');
    };

    // 진료과 모달 내부의 카드 css
    const gridStyle: React.CSSProperties = {
        width: 'calc(100% / 3)',
        textAlign: 'center',
    };
    

    


// -----------------------------------

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
        // setSelectedLocation('서울시 전체');
        // Reset key state
        setSelectedLocationKey('allRegions');
    };

    
    
    // 진료지역 모달 내부의 카드 css
    const gridStyle25: React.CSSProperties = {
        width: '25%',
        textAlign: 'center',
    };

// -------------------------------------
    // const filterMapping = {
    // language: {
    //     '가능 언어': '',
    //     '전체 언어': '',
    //     '한국어': ''
    // },
    // department: {
    //     '진료 과목': '',
    //     '전체 과목': ''
        
    // },
    // location: {
    //     '지역': '',
    //     '서울시 전체': ''
    // }
    // };


    



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
                    {/* {selectedLanguageDisplay}  */}

                    {/* 초기 상태('')일 때는 '가능 언어', 그 외에는 선택된 언어 표시 */}
                    {selectedLanguageKey === ' '
                        ? t('filter.availableLanguages')
                        : t(`filter.${selectedLanguageKey}`)} 
                

                    
                    <DownOutlined />
                </Space>
                </a>
            </Dropdown>
            </div>
            {/* 진료과목 필터링 */}
            <div>
                <Button onClick={showModal} style={{color: 'rgb(22 119 255)'}}>
                    {selectedDepartmentDisplay} 
                </Button>
                <Modal title={t('filter.selectDepartment')} //"진료 과목 선택" 
                    open={isDepartmentModalOpen} onOk={handleOk} onCancel={handleCancel} 
                    styles={{ body: {maxHeight: '60vh', overflowY: 'auto'} }}
                    >
                    <Card>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('allDepartments')}>{t('filter.allDepartments')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('pediatrics')}>{t('filter.department.pediatrics')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('dentistry')}>{t('filter.department.dentistry')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('ent')}>{t('filter.department.ent')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('dermatology')}>{t('filter.department.dermatology')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('obgyn')}>{t('filter.department.obgyn', '산부인과')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('ophthalmology')}>{t('filter.department.ophthalmology')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('psychiatry')}>{t('filter.department.psychiatry')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('plasticSurgery')}>{t('filter.department.plasticSurgery')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('orthopedics')}>{t('filter.department.orthopedics')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('oriental')}>{t('filter.department.oriental')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('urology')}>{t('filter.department.urology')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('familyMedicine')}>{t('filter.department.familyMedicine')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('internal')}>{t('filter.department.internal', '내과')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('surgery')}>{t('filter.department.surgery')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('thoracicSurgery')}>{t('filter.department.thoracicSurgery')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('anesthesiology')}>{t('filter.department.anesthesiology')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('radiology')}>{t('filter.department.radiology')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('neurology')}>{t('filter.department.neurology')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('neurosurgery')}>{t('filter.department.neurosurgery')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedDepartmentKey('rehabilitation')}>{t('filter.department.rehabilitation')}</Card.Grid>
                        
                    </Card>
                </Modal>
            </div>       

            {/* 지역 필터링 */}
            <div>
                <Button onClick={showLocationModal} style={{color: 'rgb(22 119 255)'}}>
                    {selectedLocationDisplay} {/* Display translated text */}
                </Button>
                <Modal title={t('filter.selectRegion')} //"지역 선택" 
                    open={isLocationModalOpen} onOk={handleLocationOk} onCancel={handleLocationCancel}
                    styles={{ body: {maxHeight: '60vh', overflowY: 'auto'} }}
                    >
                    <small style={{ color: "#888", display: "block", marginTop: "10px", marginBottom: "10px" }}>
                        {/* ※ 현재 강남구와 강동구 정보만 제공됩니다.  */}
                        {t('filter.regionNotice')}
                    </small>

                    <Card>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedLocationKey('allRegions')}>{t('filter.allRegions')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedLocationKey('gangnam')}>{t('filter.regions.gangnam')}</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={() => setSelectedLocationKey('gangdong')}>{t('filter.regions.gangdong')}</Card.Grid>
                        
                    </Card>
                </Modal>
            </div>   

            {/* 거리순 정렬 버튼 (보여주기용) */}
            {/* <div>
                <Button style={{color: 'rgb(22 119 255)'}}>
                    <EnvironmentOutlined />
                    {t('layout.sortByDistance')}
                </Button>
            </div> */}


        </div>
        <Divider />
        
        {/* 병원 카드 목록  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {hospitalInfo.map((info, index) => (
                <Card
                    key={index}
                    title={info.hospital_name}
                    className="min-h-[160px] cursor-pointer border border-gray-200 hover:shadow-md transition-shadow duration-200"
                    onClick={() => {handleHospitalCardClick(info.hospital_id, info.source)}}
                >
                    <div className="flex justify-between items-start h-full">
                        <div className="flex flex-col justify-between h-full flex-grow pr-2">
                            <div> 
                                <p className="text-sm text-gray-600 mb-1 line-clamp-2"> 
                                    <EnvironmentOutlined className="mr-1" /> {info.hospital_main_address}
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                    <GlobalOutlined className="mr-1"/> {info.hospital_languages || (currentLang === 'ko' ? t('filter.korean') : t('filter.english'))} 
                                
                                </p>
                                <p className="text-sm text-gray-600">
                                    <AppstoreAddOutlined className="mr-1" /> {info.hospital_main_category}
                                </p>
                            </div>
                        </div>

                        {/* 오른쪽 이미지*/}
                        <div className="w-24 h-24 overflow-hidden rounded-lg flex-shrink-0"> 
                            <img alt="병원 이미지" src={images[info.hospital_id % 40]} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </Card>
            ))}
        </div>

        {!isLoading && (hospitalInfo == null || hospitalInfo.length <= 0) &&
            <div className="flex justify-center">
                <Title level={5}>
                    {/* 검색한 병원명과 일치하는 병원 정보가 없습니다. */}
                    {t('noResults')}
                </Title>
            </div>
            
        }

        {/* 로딩 중일떄 화면 */}
        {isLoading && 
            <div className="flex justify-center">
                <Title level={5}>
                    {/* 불러오는 중 */}
                    {t('loading')}
                </Title>
            </div>
        }


        {hasMoreInfo && hospitalInfo.length > 0 &&
            <div className="flex justify-center items-center mt-7">
                <Button size="large" className="w-80" onClick={handleMoreHospitalClick}>
                    {/* 병원 더보기 */}
                    {t('moreHospitals')}
                </Button>
            </div>
        }


        
        </>
    );
}
 
export default HospitalMainPage;