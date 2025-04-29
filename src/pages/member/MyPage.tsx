import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectFromHospitalReservation, selectFromMemberFavorite, selectReviewByMemberId, selectUserInfo, selectUsername } from "../../api/chartboardApi";
import { CalendarOutlined, DeleteOutlined, EnvironmentOutlined, HeartOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { Button, Card, Descriptions, Divider, List, Popconfirm, Rate, Tag, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
const { Text } = Typography;

const MyPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        // 로그인 안되어있으면 접근 X
        if (sessionStorage.getItem('isLoggedIn') !== 'true') {
            alert('로그인이 필요합니다.');
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
        sub_symptom: string;
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
        rate: number;
        created_at: string;
        original_text: string;
        hospital_name: string;
    }

    const [favoriteHospital, setFavoriteHospital] = useState<FavoriteHospitalDto[]>([]);

    interface FavoriteHospitalDto{
        hospital_id: number;
        hospital_name: string;
        hospital_main_address: string;
    }




    useEffect(() => {
        // 회원의 username
        selectUserInfo(Number(sessionStorage.getItem("userId")))
            .then((data) => {setUserinfo(data)})
            .catch((err) => {
                console.log("selectUsername 실패: ", err);
                alert("회원 정보를 불러오지 못했습니다.")
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
                alert("작성한 리뷰 정보를 불러오지 못했습니다.")
            })

        // 즐겨찾기한 병원 조회
        selectFromMemberFavorite(Number(sessionStorage.getItem("userId")))
        .then((data) => {
            setFavoriteHospital(data);
        })
        .catch((err) => {
            console.log("selectFromMemberFavorite 실패: ", err);
            alert("즐겨찾기한 병원 정보를 불러오지 못했습니다.")
        })
    }, [])
    


    


    return (
        <>
            <div style={{ padding: '20px' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
                <UserOutlined /> 마이페이지
            </Title>

            {/* --- 회원 정보 --- */}
            <section style={{ marginBottom: '40px' }}>
                <Title level={3}>회원 정보</Title>
                {userinfo ? (
                    <Card>
                        <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }} size="default">
                            <Descriptions.Item label="아이디">{userinfo.username}</Descriptions.Item>
                            <Descriptions.Item label="이메일">{userinfo.email}</Descriptions.Item>
                            <Descriptions.Item label="전화번호">{userinfo.phone_num}</Descriptions.Item>
                            <Descriptions.Item label="생년월일">{userinfo.birth_date}</Descriptions.Item>
                            <Descriptions.Item label="성별" span={2}>{userinfo.gender}</Descriptions.Item>
                        </Descriptions>
                        <Button type="link" style={{ marginTop: '10px' }}>정보 수정</Button>
                    </Card>
                ) : (
                    <Text type="secondary">회원 정보를 불러오는 중...</Text>
                )}
            </section>

            <Divider />

            {/* 예약한 진료 섹션 */}
            <section style={{ marginBottom: '40px' }}>
                <Title level={3}><CalendarOutlined /> 예약한 진료 ({reservationInfo.length})</Title>
                {reservationInfo.length > 0 ? (
                    <List
                        grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }} 
                        dataSource={reservationInfo}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    title={item.hospital_name}
                                    extra={ // Delete Icon Added Here
                                        <Popconfirm
                                            title="예약을 삭제하시겠습니까?"
                                            // onConfirm={() => handleDeleteReservation(item)}
                                            okText="삭제"
                                            cancelText="취소"
                                            
                                        >
                                            <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: '16px' }}/>
                                        </Popconfirm>
                                    }
                                >
                                    {/* reservation_time을 직접 출력 */}
                                    <p><strong>예약 시간:</strong> {item.reservation_time}</p>

                                    <p><strong>주요 증상:</strong> {item.main_symptom} ({item.sub_symptom})</p>
                                    
                                    <p><strong>희망 언어:</strong> <Tag>{item.language}</Tag></p>

                                    {item.detail_symptom && <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: '더보기' }}><strong>상세 증상:</strong> {item.detail_symptom}</Paragraph>}
                                
                                
                                </Card>
                            </List.Item>
                        )}
                    />
                ) : (
                    <Text type="secondary">예약된 진료가 없습니다.</Text>
                )}
            </section>

            <Divider />

            {/* 작성한 리뷰 섹션 */}
            <section style={{ marginBottom: '40px' }}>
                <Title level={3}><MessageOutlined /> 작성한 리뷰 ({writtenReview.length})</Title>
                {writtenReview.length > 0 ? (
                    <List
                        grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
                        dataSource={writtenReview}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    title={item.hospital_name}
                                    extra={ // Delete Icon Added Here
                                        <Popconfirm
                                            title="리뷰를 삭제하시겠습니까?"
                                            // onConfirm={() => handleDeleteReview(item)}
                                            okText="삭제"
                                            cancelText="취소"
                                        >
                                            <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: '16px' }}/>
                                        </Popconfirm>
                                    }
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <Rate disabled defaultValue={item.rate} style={{ fontSize: '16px' }} />
                                        {/* Apply formatDate */}
                                        <Text type="secondary" style={{ fontSize: '0.9em' }}>{(item.created_at)}</Text>
                                    </div>
                                    <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: '더보기' }}>
                                        {item.original_text}
                                    </Paragraph>
                                </Card>
                            </List.Item>
                        )}
                    />
                ) : (
                    <Text type="secondary">작성한 리뷰가 없습니다.</Text>
                )}
            </section>

            <Divider />

            {/* 즐겨찾기한 병원 섹션 */}
            <section>
                <Title level={3}><HeartOutlined /> 즐겨찾기한 병원 ({favoriteHospital.length})</Title>
                {favoriteHospital.length > 0 ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={favoriteHospital}
                        renderItem={item => (
                            <List.Item
                                actions={[ // Delete Icon Added Here using Button
                                    <Popconfirm
                                        key={`delete-${item.hospital_id}`} // Add key for list actions
                                        title="즐겨찾기를 삭제하시겠습니까?"
                                        // onConfirm={() => handleDeleteFavorite(item)}
                                        okText="삭제"
                                        cancelText="취소"
                                    >
                                        <Button type="text" danger icon={<DeleteOutlined />} />
                                    </Popconfirm>
                                ]}
                            >
                                <List.Item.Meta
                                    title={<Text>{item.hospital_name}</Text>}
                                    description={<><EnvironmentOutlined /> {item.hospital_main_address}</>}
                                />
                            </List.Item>
                        )}
                    />
                ) : (
                    <Text type="secondary">즐겨찾기한 병원이 없습니다.</Text>
                )}
            </section>
        </div>
        </>
    );
}

export default MyPage;