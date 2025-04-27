import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyPage = () => {

    const navigate = useNavigate();
    useEffect(() => {
        // 로그인 안되어있으면 접근 X
        if (sessionStorage.getItem('isLoggedIn') !== 'true') {
            alert('로그인이 필요합니다.');
            navigate('/login'); 
        }
    }, [])
    

    return (
        <>MyPage</>
    );
}

export default MyPage;