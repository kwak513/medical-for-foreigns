import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rate, Input, Button, Typography, message } from 'antd';
// updateHospitalReview API 함수를 import 해야 합니다 (실제 이름은 다를 수 있음)
import { changeReview, selectFromEnGangdongHospital, selectFromEnGangnamHospital, selectFromGangdongHospital, selectFromGangnamHospital } from '../../../api/chartboardApi';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
const { TextArea } = Input;

const ChangeReviewPage = () => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;

    const navigate = useNavigate();
    const location = useLocation();

    // location.state에서 필요한 데이터 추출
    const { reviewId, rate: initialRate, text: initialText, hospitalName, source, hospitalId } = location.state || {};

    useEffect(() => {
        console.log("Initial Rate:", initialRate); // <-- 추가
    console.log("Initial Text:", initialText); // <-- 추가
    })
    


    // 필수 데이터 (reviewId) 없으면 마이페이지로 리다이렉트 또는 에러 처리
    useEffect(() => {
        if (!reviewId) {
            // alert('수정할 리뷰 정보가 없습니다. 마이페이지로 이동합니다.')
            alert(t('changeReviewPage.missingInfoError'))
            navigate('/mypage');
        }
        // 로그인 안하고 접근 불가
        if (sessionStorage.getItem("isLoggedIn") !== "true") {
            // alert('로그인이 필요합니다.');
            alert(t('alert.loginRequired'))
            navigate("/login");
        }
    }, [reviewId, navigate]); // reviewId와 navigate를 의존성 배열에 추가



    // 리뷰 상태 초기화 (location.state 값 사용)
    const [rating, setRating] = useState<number>(initialRate || 0);
    const [reviewText, setReviewText] = useState<string>(initialText || '');

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
    
    
        
    // en, ko에 따라서 병원명 다시 불러오기
        useEffect(() => {
    
        const searchFromGangnam = currentLang === 'ko' ? selectFromGangnamHospital : selectFromEnGangnamHospital;
        const searchFromGangdong = currentLang === 'ko' ? selectFromGangdongHospital : selectFromEnGangdongHospital;

        if(source == "gangnam"){
            searchFromGangnam(hospitalId)
                .then((data) => {
console.log("searchFromGangnam data: ", data);
                    setHospitalDetail(data);
                })
                .catch((err) => {
                    console.log("searchFromGangnam 실패: ", err);
                    // alert("병원 상세 정보를 불러오지 못했습니다.")
                    alert(t('alert.loadHospitalDetailFailed'));
                })
        }
        else if(source == "gangdong"){
            searchFromGangdong(hospitalId)
                .then((data) => {
console.log("searchFromGangdong data: ", data);                    
                    setHospitalDetail(data);
                })
                .catch((err) => {
                    console.log("searchFromGangdong 실패: ", err);
                    // alert("병원 상세 정보를 불러오지 못했습니다.")
                    alert(t('alert.loadHospitalDetailFailed'));
                })

        }
    }, [currentLang])


    // 평점 변경 
    const handleRatingChange = (value: number) => {
        setRating(value);
    };

    // 리뷰 텍스트 변경 
    const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReviewText(e.target.value);
    };

    // 리뷰 수정 제출 
    const handleUpdateReview = () => {
        
        if (rating === 0) {
            // alert('평점을 선택해주세요.');
            alert(t('hospitalReviewPage.validationRating'));
            return;
        }
        if (!reviewText.trim()) {
            // alert('리뷰 내용을 입력해주세요.');
            alert(t('hospitalReviewPage.validationText'));
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
                    // alert("리뷰가 수정되었습니다.");
                    alert(t('changeReviewPage.successMessage'));
                    navigate(-1);
                }
                else{
                    // alert("리뷰 수정에 실패했습니다.")
                    alert(t('changeReviewPage.failureMessage'));
                }
            })
            .catch((err) => {
                console.log("changeReview 실패: ", err);
                // alert("서버 오류로 리뷰 수정에 실패했습니다.")
                alert(t('changeReviewPage.serverErrorMessage'));
                
            })

            
    };


    return (
        <>
            {/* 페이지 제목 수정 */}
            <div>
                <Title level={2} style={{ width: '100%', textAlign: 'center', marginTop: '20px' }} className="!text-[20px] md:!text-[30px]">
                    {/* {hospitalName || '병원'}  */}
                    {hospitalDetail.length > 0 && hospitalDetail[0].hospital_name}
                    {/* 리뷰 수정하기 */}
                    {" "}{t('changeReviewPage.pageTitleSuffix')}
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
                    <Title level={4} style={{ marginRight: '10px', width: '30%', marginBottom: 0 }} className="!text-[15px] md:!text-[21px]">
                        {/* 평점: */}
                        {t('hospitalReviewPage.ratingLabel')}
                    </Title>
                    <div style={{ width: '70%' }}>
                        {/* value prop을 사용하여 상태와 바인딩 */}
                        <Rate allowHalf={false} value={rating} onChange={handleRatingChange} className='text-[24px] md:!text-[30px]'/>
                    </div>
                </div>

                {/* 리뷰 내용 (value 사용) */}
                <div style={{ display: 'flex', marginBottom: '20px', width: '100%' }}>
                    <Title level={4} style={{ marginRight: '10px', width: '30%', marginTop: 0 }} className="!text-[15px] md:!text-[21px]">
                        {/* 리뷰 내용: */}
                        {t('hospitalReviewPage.reviewTextLabel')}
                    </Title>
                    <TextArea
                        rows={6}
                        style={{ width: '70%' }}
                        placeholder={t('changeReviewPage.reviewTextPlaceholder')} //"수정할 리뷰 내용을 입력해주세요."
                        value={reviewText} // value prop을 사용하여 상태와 바인딩
                        onChange={handleReviewTextChange}
                        maxLength={500}
                        showCount
                    />
                </div>

                {/* 리뷰 수정 버튼 */}
                <div style={{ marginTop: '20px', width: '100%' }}>
                    <Button type="primary" size="large" style={{ width: '100%' }} onClick={handleUpdateReview}>
                        {/* 리뷰 수정하기 */}
                        {t('changeReviewPage.submitButton')} 
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ChangeReviewPage;
