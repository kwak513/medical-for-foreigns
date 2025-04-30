import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rate, Input, Button, Typography, message } from 'antd';
// updateHospitalReview API 함수를 import 해야 합니다 (실제 이름은 다를 수 있음)
import { changeReview, updateHospitalReview } from '../../../api/chartboardApi';

const { Title } = Typography;
const { TextArea } = Input;

const ChangeReviewPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // location.state에서 필요한 데이터 추출
    const { reviewId, rate: initialRate, text: initialText, hospitalName } = location.state || {};

    useEffect(() => {
        console.log("Initial Rate:", initialRate); // <-- 추가
    console.log("Initial Text:", initialText); // <-- 추가
    })
    


    // 필수 데이터 (reviewId) 없으면 마이페이지로 리다이렉트 또는 에러 처리
    useEffect(() => {
        if (!reviewId) {
            message.error('수정할 리뷰 정보가 없습니다. 마이페이지로 이동합니다.');
            navigate('/mypage');
        }
        // 로그인 안하고 접근 불가
        if (sessionStorage.getItem("isLoggedIn") !== "true") {
            message.warning('로그인이 필요합니다.');
            navigate("/login");
        }
    }, [reviewId, navigate]); // reviewId와 navigate를 의존성 배열에 추가



    // 리뷰 상태 초기화 (location.state 값 사용)
    const [rating, setRating] = useState<number>(initialRate || 0);
    const [reviewText, setReviewText] = useState<string>(initialText || '');

    // 평점 변경 핸들러
    const handleRatingChange = (value: number) => {
        setRating(value);
    };

    // 리뷰 텍스트 변경 핸들러
    const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReviewText(e.target.value);
    };

    // 리뷰 수정 제출 핸들러
    const handleUpdateReview = () => {
        
        if (rating === 0) {
            message.warning('평점을 선택해주세요.');
            return;
        }
        if (!reviewText.trim()) {
            message.warning('리뷰 내용을 입력해주세요.');
            return;
        }

        const changedReviewData = {
            rate: rating,
            originalTxt: reviewText,
            reviewId: reviewId
        }
        changeReview(changedReviewData)
            .then((bool) => {
                if(bool){
                    alert("리뷰가 수정되었습니다.");
                    navigate(-1);
                }
                else{
                    alert("리뷰 수정에 실패했습니다.")
                }
            })
            .catch((err) => {
                console.log("changeReview 실패: ", err);
                alert("서버 오류로 리뷰 수정에 실패했습니다.")
                
            })

            
    };


    return (
        <>
            {/* 페이지 제목 수정 */}
            <div>
                <Title level={2} style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                    {hospitalName || '병원'} 리뷰 수정하기
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
                {/* 평점 (value 사용) */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', width: '100%' }}>
                    <Title level={4} style={{ marginRight: '10px', width: '30%', marginBottom: 0 }}>
                        평점:
                    </Title>
                    <div style={{ width: '70%' }}>
                        {/* value prop을 사용하여 상태와 바인딩 */}
                        <Rate allowHalf={false} value={rating} onChange={handleRatingChange} style={{ fontSize: 30 }}/>
                    </div>
                </div>

                {/* 리뷰 내용 (value 사용) */}
                <div style={{ display: 'flex', marginBottom: '20px', width: '100%' }}>
                    <Title level={4} style={{ marginRight: '10px', width: '30%', marginTop: 0 }}>
                        리뷰 내용:
                    </Title>
                    <TextArea
                        rows={6}
                        style={{ width: '70%' }}
                        placeholder="수정할 리뷰 내용을 입력해주세요."
                        value={reviewText} // value prop을 사용하여 상태와 바인딩
                        onChange={handleReviewTextChange}
                        maxLength={500}
                        showCount
                    />
                </div>

                {/* 리뷰 수정 버튼 */}
                <div style={{ marginTop: '20px', width: '100%' }}>
                    <Button type="primary" size="large" style={{ width: '100%' }} onClick={handleUpdateReview}>
                        리뷰 수정하기
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ChangeReviewPage;
