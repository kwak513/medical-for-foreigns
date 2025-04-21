import { Button, Card, Divider } from "antd";
import hospitalRandom1 from '../../assets/hospitalImg/hospitalRandom1.jpg';
import hospitalRandom2 from '../../assets/hospitalImg/hospitalRandom2.jpg';
import hospitalRandom3 from '../../assets/hospitalImg/hospitalRandom3.jpg';
import hospitalRandom4 from '../../assets/hospitalImg/hospitalRandom4.jpg';
import hospitalRandom5 from '../../assets/hospitalImg/hospitalRandom5.jpg';
import hospitalRandom0 from '../../assets/hospitalImg/hospitalRandom6.jpg';
import { useEffect, useState } from "react";
import { select15FromGangnamGangDongHospital } from "../../api/chartboardApi";
import { AppstoreAddOutlined, EnvironmentOutlined, GlobalOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const HospitalMainPage = () => {
    // 백엔드에서 select15FromGangnamGangDongHospital 호출하면 나올 JSON 형식
    interface HospitalInfo{
        hospital_languages: string;
        source:string;
        hospital_main_category: string;
        hospital_main_address: string;
        hospital_name: string;
        hospital_id: number;
    }
    // select15FromGangnamGangDongHospital 결과 저장
    const [hospitalInfo, setHospitalInfo] = useState<HospitalInfo []>([]);
    // select15FromGangnamGangDongHospital 호출 시, 보낼 offsetNum
    const [offset, setOffset] = useState(0);

    const [hasMoreInfo, setHasMoreInfo] = useState(true);


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

    // useEffect로 백엔드의 select15FromGangnamGangDongHospital 호출
    useEffect(() => {
        select15FromGangnamGangDongHospital(offset)
            .then((list) => {

                if(list.length < 15){
                    setHasMoreInfo(false);
                }
                setHospitalInfo((prev) => [...prev, ...list]);
            })
            .catch((err) => {
                console.log("select15FromGangnamGangDongHospital 실패: ", err);
                alert("병원 정보를 불러오지 못했습니다.")
            })
    }, [offset])

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
    
    return (  
        <>
        <div>정렬기준 추후에 추가 예정</div>
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

        {hasMoreInfo &&
            <div className="flex justify-center items-center mt-7">
                <Button size="large" className="w-80" onClick={handleMoreHospitalClick}>병원 더보기</Button>
            </div>
        }


        </>
    );
}
 
export default HospitalMainPage;