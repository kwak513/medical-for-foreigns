import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMemberFavorite, deleteReservation, deleteReview, selectFromHospitalReservation, selectFromMemberFavorite, selectReviewByMemberId, selectUserInfo, selectUsername } from "../../api/chartboardApi";
import { CalendarOutlined, DeleteOutlined, EditOutlined, EnvironmentOutlined, HeartOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { Button, Card, Descriptions, Divider, List, Popconfirm, Rate, Space, Tag, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useTranslation } from "react-i18next";
const { Text } = Typography;

const MyPage = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        // 로그인 안되어있으면 접근 X
        if (sessionStorage.getItem('isLoggedIn') !== 'true') {
            // alert('로그인이 필요합니다.');
            alert(t('myPage.loginRequired'));
            navigate('/login'); 
        }
    }, [])

    const [userinfo, setUserinfo] = useState<UserinfoDto | undefined>(undefined);
    interface UserinfoDto{
        username: string;
        phone_num: string;
        gender: string;
        birth_date: string;
        email: string;
    }

    const [reservationInfo, setReservationInfo] = useState<ReservationDto[]>([]);
    
    interface ReservationDto{
        hospital_reservation_id: number
        sub_symptom: string;
        hospital_languages: string;
        language: string;
        main_symptom: string;
        detail_symptom: string;
        hospital_name: string;
        reservation_time: string;
        source: string;
        hospital_id: number; 
    }
    const [writtenReview, setWrittenReview] = useState<ReviewDto[]>([]);

    interface ReviewDto{    
        review_id: number;    
        rate: number;
        created_at: string;
        original_text: string;
        hospital_name: string;
        source: string;
    }

    const [favoriteHospital, setFavoriteHospital] = useState<FavoriteHospitalDto[]>([]);

    interface FavoriteHospitalDto{
        hospital_source: string;
        hospital_id: number;
        hospital_name: string;
        hospital_main_address: string;
    }




    useEffect(() => {
        // 회원의 기본 정보
        selectUserInfo(Number(sessionStorage.getItem("userId")))
            .then((data) => {setUserinfo(data)})
            .catch((err) => {
                console.log("selectUserInfo 실패: ", err);
                // alert("회원 정보를 불러오지 못했습니다.")
                alert(t('myPage.userInfo.fetchError'));
            })
        
        // 회원이 예약한 진료 조회
        selectFromHospitalReservation(Number(sessionStorage.getItem("userId")))
            .then((data) => {
                setReservationInfo(data);
            })
            .catch((err) => {
                console.log("selectFromHospitalReservation 실패: ", err);
                alert("회원의 예약된 진료 정보를 불러오지 못했습니다.")
            })
        
        // 작성한 리뷰 조회
        selectReviewByMemberId(Number(sessionStorage.getItem("userId")))
            .then((data) => {
                setWrittenReview(data);
            })
            .catch((err) => {
                console.log("selectReviewByMemberId 실패: ", err);
                // alert("작성한 리뷰 정보를 불러오지 못했습니다.")
                alert(t('myPage.reviews.fetchError'));
            })

        // 즐겨찾기한 병원 조회
        selectFromMemberFavorite(Number(sessionStorage.getItem("userId")))
        .then((data) => {
            setFavoriteHospital(data);
        })
        .catch((err) => {
            console.log("selectFromMemberFavorite 실패: ", err);
            // alert("즐겨찾기한 병원 정보를 불러오지 못했습니다.")
            alert(t('myPage.favorites.fetchError'));
        })
    }, [])
    
    // 회원 정보 수정
    const handleUserInfoChange = () => {
        navigate("/changeuserinfo")
    }

    const handleDeleteFavorite = (uid, hid, hsource) => {
        deleteMemberFavorite(uid, hid, hsource)
            .then((bool) => {
                if(bool){
                    // alert("즐겨찾기에서 해제되었습니다.");
                    alert(t('myPage.favorites.deleteSuccess'));
                    
                    // 즐겨찾기한 병원 조회
                    selectFromMemberFavorite(Number(sessionStorage.getItem("userId")))
                    .then((data) => {
                        setFavoriteHospital(data);
                    })
                    .catch((err) => {
                        console.log("selectFromMemberFavorite 실패: ", err);
                        // alert("즐겨찾기한 병원 정보를 불러오지 못했습니다.")
                        alert(t('myPage.favorites.fetchError'));
                    })


                }
            })
            .catch((err) => {
                console.log("deleteMemberFavorite 실패: ", err);
                // alert("즐겨찾기를 해제하지 못했습니다.")
                alert(t('myPage.favorites.deleteError'));
            })
    }


    const handleFavoriteHospitalClick = (hospitalId, hospitalSource) => {
        navigate("/hospital/info", {state: {hospitalId,hospitalSource}})
    }
    // 리뷰 수정 클릭 시,
    const handleChangeReview = (reviewId, rate, text, hospitalName) => {
        navigate("/changereview", {state: {reviewId, rate, text, hospitalName}})
    }

    // 리뷰 삭제 클릭 시, 
    const handleDeleteReview = (reviewId, hSource) => {
        deleteReview(reviewId, hSource)
        .then((bool) => {
            if(bool){
                // alert("리뷰가 삭제되었습니다.");
                alert(t('myPage.reviews.deleteSuccess'));
                
                // 작성한 리뷰 조회
                selectReviewByMemberId(Number(sessionStorage.getItem("userId")))
                .then((data) => {
                    setWrittenReview(data);
                })
                .catch((err) => {
                    console.log("selectReviewByMemberId 실패: ", err);
                    // alert("작성한 리뷰 정보를 불러오지 못했습니다.")
                    alert(t('myPage.reviews.fetchError'));
                })


            }
        })
        .catch((err) => {
            console.log("deleteReview 실패: ", err);
            // alert("서버 오류로 리뷰를 삭제하지 못했습니다.")
            alert(t('myPage.reviews.deleteError'));
        })


    }

    // 진료 수정 클릭 시,
    const handleEditReservation = (
        hospitalId, hospitalName, source, language, mainSymptom, subSymptom, detailSymptom, reservationTime, hospitalLanguages,hospitalReservationId) => {
        navigate("/changereservation", {state: {hospitalId, hospitalName, source, language, mainSymptom, subSymptom, detailSymptom, reservationTime, hospitalLanguages, hospitalReservationId}})
    }

    // 진료 삭제 클릭 시,
    const handleDeleteReservation = (reservationId, source) => {
        deleteReservation(reservationId, source)
        .then((bool) => {
            if(bool){
                // alert("예약한 진료가 취소되었습니다.");
                alert(t('myPage.reservations.deleteSuccess'));
                
                // 회원이 예약한 진료 조회
                selectFromHospitalReservation(Number(sessionStorage.getItem("userId")))
                .then((data) => {
                    setReservationInfo(data);
                })
                .catch((err) => {
                    console.log("selectFromHospitalReservation 실패: ", err);
                    // alert("회원의 예약된 진료 정보를 불러오지 못했습니다.")
                    alert(t('myPage.reservations.fetchError'));
                })


            }
        })
        .catch((err) => {
            console.log("deleteReservation 실패: ", err);
            // alert("서버 오류로 진료를 취소하지 못했습니다.")
            alert(t('myPage.reservations.deleteError'));
        })
    }
    return (
        <>
            <div style={{ padding: '20px' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
                <UserOutlined /> {" "}
                {/* 마이페이지 */}
                {t('mypage')}
            </Title>

            {/* --- 회원 정보 --- */}
            <section style={{ marginBottom: '40px' }}>
                <Title level={3}>
                    {/* 회원 정보 */}
                    {t('myPage.userInfo.title')}
                </Title>
                {userinfo ? (
                    <Card>
                        <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }} size="default">
                            {/* <Descriptions.Item label="아이디">{userinfo.username}</Descriptions.Item>
                            <Descriptions.Item label="이메일">{userinfo.email}</Descriptions.Item>
                            <Descriptions.Item label="전화번호">{userinfo.phone_num}</Descriptions.Item>
                            <Descriptions.Item label="생년월일">{userinfo.birth_date}</Descriptions.Item>
                            <Descriptions.Item label="성별" span={2}>{userinfo.gender}</Descriptions.Item> */}

                            <Descriptions.Item label={t('myPage.userInfo.idLabel')}>{userinfo.username}</Descriptions.Item> 
                            <Descriptions.Item label={t('myPage.userInfo.emailLabel')}>{userinfo.email}</Descriptions.Item> 
                            <Descriptions.Item label={t('myPage.userInfo.phoneLabel')}>{userinfo.phone_num}</Descriptions.Item> 
                            <Descriptions.Item label={t('myPage.userInfo.birthDateLabel')}>{userinfo.birth_date}</Descriptions.Item> 
                            <Descriptions.Item label={t('myPage.userInfo.genderLabel')} span={2}>{userinfo.gender}</Descriptions.Item> 
                        </Descriptions>
                        <Button type="link" style={{ marginTop: '10px' }} onClick={handleUserInfoChange}>
                            {/* 정보 수정 */}
                            {t('myPage.userInfo.editButton')}
                        </Button>
                    </Card>
                ) : (
                    <Text type="secondary">
                        {/* 회원 정보를 불러오는 중... */}
                        {t('myPage.userInfo.loading')}
                    </Text>
                )}
            </section>

            <Divider />

            {/* 예약한 진료 섹션 */}
            <section style={{ marginBottom: '40px' }}>
                <Title level={3}>
                    <CalendarOutlined /> {" "}
                    {/* 예약한 진료 ({reservationInfo.length}) */}

                    {t('myPage.reservations.title', { count: reservationInfo.length })}
                </Title>
                {reservationInfo.length > 0 ? (
                    <List
                        grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }} 
                        dataSource={reservationInfo}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    title={item.hospital_name}
                                    extra={ // Delete Icon Added Here
                                        <Space>
                                <Button
                                    type="text"
                                    icon={<EditOutlined />}
                                    onClick={() =>  handleEditReservation(item.hospital_id, item.hospital_name, item.source, item.language, item.main_symptom, item.sub_symptom, item.detail_symptom, item.reservation_time, item.hospital_languages, item.hospital_reservation_id) } 
                                    aria-label={t('myPage.reservations.editAriaLabel')} // 예약 수정
                                /> 
                                <Popconfirm
                                    title={t('myPage.reservations.deleteConfirmTitle')} //"예약을 삭제하시겠습니까?"
                                    onConfirm={() => handleDeleteReservation(item.hospital_reservation_id, item.source)} 
                                    okText={t('myPage.reservations.deleteOkText')} //"삭제"
                                    cancelText={t('myPage.reservations.deleteCancelText')} //"취소"
                                >
                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined />}
                                        aria-label={t('myPage.reservations.deleteAriaLabel')} //"예약 삭제" // Accessibility
                                    />
                                </Popconfirm>
                            </Space>
                                    }
                                >
                                    {/* reservation_time을 직접 출력 */}
                                    <p><strong>
                                        {/* 예약 시간: */}
                                        {t('myPage.reservations.timeLabel')}
                                    </strong> {item.reservation_time}</p>

                                    <p><strong>
                                        {/* 주요 증상: */}
                                        {t('myPage.reservations.symptomLabel')}
                                    </strong> {item.main_symptom} ({item.sub_symptom})</p>
                                    
                                    <p><strong>
                                        {/* 희망 언어: */}
                                        {t('myPage.reservations.languageLabel')}
                                    </strong> <Tag>{item.language}</Tag></p>

                                    {item.detail_symptom && <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: t('myPage.reservations.expandSymbol') }}><strong>
                                        {/* 상세 증상: */}
                                        {t('myPage.reservations.detailsLabel')}
                                    </strong> {item.detail_symptom}</Paragraph>}
                                
                                
                                </Card>
                            </List.Item>
                        )}
                    />
                ) : (
                    <Text type="secondary">
                        {/* 예약된 진료가 없습니다. */}
                        {t('myPage.reservations.noReservations')}
                    </Text>
                )}
            </section>

            <Divider />

            {/* 작성한 리뷰 섹션 */}
            <section style={{ marginBottom: '40px' }}>
                <Title level={3}>
                    <MessageOutlined /> {" "}
                    {/* 작성한 리뷰 ({writtenReview.length}) */}
                    {t('myPage.reviews.title', { count: writtenReview.length })}
                </Title>
                {writtenReview.length > 0 ? (
                    <List
                        grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
                        dataSource={writtenReview}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    title={item.hospital_name}
                                    extra={ // Delete Icon Added Here
                                        <Space>
                                            <Button
                                                type="text"
                                                icon={<EditOutlined />}
                                                onClick={() =>  handleChangeReview(item.review_id, item.rate, item.original_text, item.hospital_name)} 
                                                aria-label={t('myPage.reviews.editAriaLabel')} //"리뷰 수정" 
                                            />
                                            <Popconfirm
                                                title="리뷰를 삭제하시겠습니까?"
                                                onConfirm={() => handleDeleteReview(item.review_id, item.source)} 
                                                okText={t('myPage.reviews.deleteOkText')} //"삭제"
                                                cancelText={t('myPage.reviews.deleteCancelText')}  //"취소"
                                            >
                                                <Button
                                                    type="text"
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    aria-label={t('myPage.reviews.deleteAriaLabel')} //"리뷰 삭제" 
                                                />
                                            </Popconfirm>
                                        </Space>
                                    }
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <Rate disabled defaultValue={item.rate} style={{ fontSize: '16px' }} />
                                        {/* Apply formatDate */}
                                        <Text type="secondary" style={{ fontSize: '0.9em' }}>
                                            {new Date(item.created_at).toLocaleString('ko-KR')}
                                        </Text>
                                    </div>
                                    <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: t('myPage.reviews.expandSymbol') }}>
                                        {item.original_text}
                                    </Paragraph>
                                </Card>
                            </List.Item>
                        )}
                    />
                ) : (
                    <Text type="secondary">
                        {/* 작성한 리뷰가 없습니다. */}
                        {t('myPage.reviews.noReviews')}
                    </Text>
                )}
            </section>

            <Divider />

            {/* 즐겨찾기한 병원 섹션 */}
            <section>
                <Title level={3}>
                    <HeartOutlined /> {" "}
                    {/* 즐겨찾기한 병원 ({favoriteHospital.length}) */}
                    {t('myPage.favorites.title', { count: favoriteHospital.length })}
                </Title>
                {favoriteHospital.length > 0 ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={favoriteHospital}
                        renderItem={item => (
                            <List.Item
                                actions={[ 
                                    <Popconfirm
                                        key={`delete-${item.hospital_id}`} // Add key for list actions
                                        title={t('myPage.favorites.deleteConfirmTitle')} //"즐겨찾기를 삭제하시겠습니까?"
                                        onConfirm={() => handleDeleteFavorite(Number(sessionStorage.getItem("userId")), item.hospital_id, item.hospital_source)}
                                        okText={t('myPage.favorites.deleteOkText')} //"삭제"
                                        cancelText={t('myPage.favorites.deleteCancelText')} //"취소"
                                    >
                                        <Button type="text" danger icon={<DeleteOutlined />} />
                                    </Popconfirm>
                                ]}
                            >
                                <List.Item.Meta
                                    title={
                                        <Button
                                            type="link"
                                            style={{ padding: 0, height: 'auto', textAlign: 'left', color: 'black'}} 
                                            onClick={() => handleFavoriteHospitalClick(item.hospital_id, item.hospital_source)}
                                        >
                                            {item.hospital_name}
                                        </Button>
                                    }
                                    description={<><EnvironmentOutlined /> {item.hospital_main_address}</>}
                                />
                            </List.Item>
                        )}
                    />
                ) : (
                    <Text type="secondary">
                        {/* 즐겨찾기한 병원이 없습니다. */}
                        {t('myPage.favorites.noFavorites')}
                    </Text>
                )}
            </section>
        </div>
        </>
    );
}

export default MyPage;