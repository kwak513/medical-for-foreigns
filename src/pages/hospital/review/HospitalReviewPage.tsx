import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rate, Input, Button, Typography, message } from 'antd'; // Rate, message 추가
import { insertHospitalReview } from '../../../api/chartboardApi';

const { Title } = Typography;
const { TextArea } = Input;

const HospitalReviewPage = () => {

    // 로그인 안하고 접근 불가
    useEffect(() => {
        if(sessionStorage.getItem("isLoggedIn") !== "true"){
            navigate("/login");
        }
    }, [])

    // HospitalInfoPage에서 state로 보낸 값을 location으로 받기
    const location = useLocation();
    // state가 없을 경우를 대비하여 기본값 또는 에러 처리 추가 가능
    const { hospitalDetail, hospitalId, hospitalSource } = location.state || { hospitalDetail: [], hospitalId: '', hospitalSource: '' };

    const navigate = useNavigate();

    // 리뷰
    const [rating, setRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>('');

    // 병원 이름 가져오기 (데이터가 배열 형태이고 첫 번째 요소를 사용한다고 가정)
    const hospitalName = hospitalDetail.length > 0 ? hospitalDetail[0].hospital_name : '병원 정보 없음';

    // 평점 변경
    const handleRatingChange = (value: number) => {
        setRating(value);
    };

    // 리뷰 텍스트 변경
    const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReviewText(e.target.value);
    };

    // 리뷰 제출
    const handleSubmitReview = () => {
        if (rating === 0) {
            message.warning('평점을 선택해주세요.');
            return;
        }
        if (!reviewText.trim()) {
            message.warning('리뷰 내용을 입력해주세요.');
            return;
        }

        // 서버로 보낼 데이터 구성
        const reviewData = {
            memberId: Number(sessionStorage.getItem('userId')),
            hospitalId: hospitalId,
            source: hospitalSource,
            rate: rating,
            originalTxt: reviewText,
        };
console.log("reviewData: ", reviewData);
        insertHospitalReview(reviewData)
            .then((res) => {
                if(res){
                    alert("리뷰를 등록했습니다.")
                    navigate(-1);
                }
                else{
                    alert("리뷰를 등록하지 못했습니다.")
                }
            })
            .catch((err) => {
                console.log("insertHospitalReview 실패: ", err);
                alert("리뷰를 등록하지 못했습니다.")
            })
    };



    return (
        <>
            {/* 페이지 제목 */}
            <div>
                <Title level={2} style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                    {hospitalName} 리뷰 작성하기
                </Title>
            </div>

            {/* 리뷰 폼 영역 */}
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
                {/* 평점 */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', width: '100%' }}>
                    <Title level={4} style={{ marginRight: '10px', width: '30%', marginBottom: 0 }}>
                        평점:
                    </Title>
                    <div style={{ width: '70%' }}>
                        <Rate defaultValue={0} value={rating} onChange={handleRatingChange} style={{ fontSize: 30 }}/>
                    </div>
                </div>

                {/* 리뷰 내용 */}
                <div style={{ display: 'flex', marginBottom: '20px', width: '100%' }}>
                    <Title level={4} style={{ marginRight: '10px', width: '30%', marginTop: 0 }}>
                        리뷰 내용:
                    </Title>
                    <TextArea
                        rows={6} // 텍스트 영역 높이 조절
                        style={{ width: '70%' }}
                        placeholder="병원 이용 경험에 대한 솔직한 리뷰를 남겨주세요."
                        value={reviewText}
                        onChange={handleReviewTextChange}
                        maxLength={500}
                        showCount
                    />
                </div>

                {/* 리뷰 등록 버튼 */}
                <div style={{ marginTop: '20px', width: '100%' }}>
                    <Button type="primary" size="large" style={{ width: '100%' }} onClick={handleSubmitReview}>
                        리뷰 등록하기
                    </Button>
                </div>
            </div>
        </>
    );
}

export default HospitalReviewPage;
