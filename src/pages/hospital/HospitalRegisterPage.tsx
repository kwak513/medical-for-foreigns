
import { SafetyOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useLocation } from "react-router-dom";

const HospitalRegisterPage = () => {

    // HospitalInfoPage state로 보낸 값(hospitalDetail)을 location으로 받기
    const location = useLocation();
    const {hospitalDetail} = location.state;
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

    return (
        <>
        <div className="flex justify-center">
            <Title level={2}>{hospitalDetail.length > 0 && hospitalDetail[0].hospital_name} 진료 예약</Title>
            
        </div>
        <div><SafetyOutlined /></div>
        </>
    );
}
 
export default HospitalRegisterPage;