import axios from "axios";

const API_SERVER_URL = "http://localhost:8080";

//------------------------ 병원 관련 ------------------------
// 메인 리스트 페이지에서 사용할 강남구와 강동구 병원 정보 가져오기(id, 병원명, 시·구 주소, 가능 언어, 대표과 1개)
export const select15FromGangnamGangDongHospital = async(offsetNum:number) => {
    const res = await axios.get(`${API_SERVER_URL}/select15FromGangnamGangDongHospital`, {params: {offsetNum}});
    return res.data;
}

// 병원 상세 페이지에서 사용할 '강남구' 병원 정보 가져오기
export const selectFromGangnamHospital = async(hospitalId:number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectFromGangnamHospital`, {params: {hospitalId}});
    return res.data;
}

// 병원 상세 페이지에서 사용할 '강동구' 병원 정보 가져오기
export const selectFromGangdongHospital = async(hospitalId:number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectFromGangdongHospital`, {params: {hospitalId}});
    return res.data;
}

// 병원 & 필터링 기능(사용 언어, 진료과목, 지역) 동시에.
export const searchAndFilterHospital = async(hospitalName:string, language:string, department:string, location:string, offsetNum: number) => {
    const res = await axios.get(`${API_SERVER_URL}/searchAndFilterHospital`, {params: {hospitalName, language, department, location, offsetNum}});
    return res.data;
}
//------------------------ 병원 관련(영어 버전) ------------------------	
// *영어* 메인 리스트 페이지에서 사용할 강남구와 강동구 병원 정보 가져오기(id, 병원명, 시·구 주소, 가능 언어, 대표과 1개)
export const select15FromEnHospital = async(offsetNum:number) => {
    const res = await axios.get(`${API_SERVER_URL}/select15FromEnHospital`, {params: {offsetNum}});
    return res.data;
}

// *영어* 병원 상세 페이지에서 사용할 '강남구' 병원 정보 가져오기
export const selectFromEnGangnamHospital = async(hospitalId:number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectFromEnGangnamHospital`, {params: {hospitalId}});
    return res.data;
}

// *영어* 병원 상세 페이지에서 사용할 '강동구' 병원 정보 가져오기
export const selectFromEnGangdongHospital = async(hospitalId:number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectFromEnGangdongHospital`, {params: {hospitalId}});
    return res.data;
}

// *영어* 병원 & 필터링 기능(사용 언어, 진료과목, 지역) 동시에.
export const searchAndFilterEnHospital = async(hospitalName:string, language:string, department:string, location:string, offsetNum: number) => {
    const res = await axios.get(`${API_SERVER_URL}/searchAndFilterEnHospital`, {params: {hospitalName, language, department, location, offsetNum}});
    return res.data;
}


// -------------------------- 회원  --------------------------
interface MemberRegisterDto{
    username: string;
    password: string;
    phoneNum: string;
	gender: string;
	birthDate: string;
	email: string;
}

// 회원가입
export const memberRegister = async(memberRegisterDto: MemberRegisterDto) => {
    const res = await axios.post(`${API_SERVER_URL}/memberRegister`, memberRegisterDto)
    return res.data;
}

// 로그인
export const memberLogin = async(username: string, password: string) => {
    const res = await axios.get(`${API_SERVER_URL}/memberLogin`, {params: {username, password}});
    return res.data;
}

// 회원 정보 조회(username, phone_num, gender, birth_date, email)
export const selectUserInfo = async(memberId: number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectUserInfo`, {params: {memberId}});
    return res.data;
}
// 회원 아이디 찾기
export const selectUserName = async(email: string) => {
    const res = await axios.get(`${API_SERVER_URL}/selectUserName`, {params: {email}});
    return res.data;
}
// 회원 비밀번호 찾기(실제 구현X, 이메일 입력하면 존재하는 회원인지만 체크해서 메일 발송 알림만)
export const isUserExist = async(email: string) => {
    const res = await axios.get(`${API_SERVER_URL}/isUserExist`, {params: {email}});
    return res.data;
}
// 회원 정보 수정
export const changeUserInfo = async(memberInfoChangedDto: MemberInfoChangedDto) => {
    const res = await axios.put(`${API_SERVER_URL}/changeUserInfo`, memberInfoChangedDto)
    return res.data;
}
interface MemberInfoChangedDto{
    id: number;
	phoneNum: string;
	gender: string;
	birthDate: string;
	email: string;
    password: string;
}
// -------------------------- 리뷰  --------------------------
interface HospitalReviewDto{
    memberId: number;
    hospitalId: number;
    source: string;
    rate: number;
    originalTxt: string;
}

// 병원 리뷰 작성 
export const insertHospitalReview = async(hospitalReviewDto: HospitalReviewDto) => {
    const res = await axios.post(`${API_SERVER_URL}/insertHospitalReview`, hospitalReviewDto)
    return res.data;
}

// 병원 id 통해서, hospital_review select 해오기
export const selectFromHospitalReview = async(hospitalId: number, source: string, targetLanguage: string) => {
    const res = await axios.get(`${API_SERVER_URL}/selectFromHospitalReview`, {params: {hospitalId, source, targetLanguage}});
    return res.data;
}


// 회원이 작성한 리뷰 조회
export const selectReviewByMemberId = async(memberId: number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectReviewByMemberId`, {params: {memberId}});
    return res.data;
}

// *영어* 회원이 작성한 리뷰 조회
export const selectReviewByMemberIdEn = async(memberId: number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectReviewByMemberIdEn`, {params: {memberId}});
    return res.data;
}

// 리뷰 수정
export const changeReview = async(changedReviewDto: ChangedReviewDto) => {
    const res = await axios.put(`${API_SERVER_URL}/changeReview`, changedReviewDto)
    return res.data;
}

interface ChangedReviewDto{
    rate: number;
    originalTxt: string;
    reviewId: number;
}

// 리뷰 삭제 - hospital_review, gangnam_review/ gangdong_review, member_review 테이블에서 모두 삭제해야함.
export const deleteReview = async(hospitalReviewId: number, source: string) => {
    const res = await axios.delete(`${API_SERVER_URL}/deleteReview`, {params: {hospitalReviewId, source}});
    return res.data;
}


// -------------------------- 진료예약 관련--------------------------	
interface HospitalReservationDto{
    language: string;
	mainSymptom: string;
	subSymptom: string;
	detailSymptom: string;
	source: string;
	hospitalId: number;
	memberId: number;
    reservationTime: string;
}
// 진료예약 insert
export const insertHospitalReservation = async(hospitalReservationDto: HospitalReservationDto) => {
    const res = await axios.post(`${API_SERVER_URL}/insertHospitalReservation`, hospitalReservationDto)
    return res.data;
}

// member id 통해서, hospital_reservation select 해오기
export const selectFromHospitalReservation = async(memberId: number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectFromHospitalReservation`, {params: {memberId}});
    return res.data;
}

// 예약한 진료 수정
export const changeReservation = async(changedReservationDto: ChangedReservationDto) => {
    const res = await axios.put(`${API_SERVER_URL}/changeReservation`, changedReservationDto)
    return res.data;
}

interface ChangedReservationDto{
    language: string,
    mainSymptom: string,
    subSymptom: string,
    detailSymptom: string,
    reservationTime: string,
    reservationId: number
}

// 예약한 진료 삭제 - hospital_reservation, gangnam_reservation/ gangdong_reservation, member_reservation 테이블에서 모두 삭제해야함.
export const deleteReservation = async(reservationId: number, source: string) => {
    const res = await axios.delete(`${API_SERVER_URL}/deleteReservation`, {params: {reservationId, source}});
    return res.data;
}

// *영어* 회원의 진료 조회 - member id 통해서, hospital_reservation select 해오기(language, main_symptom, sub_symptom, detail_symptom, gangnam_name/ gangdong_name)
export const selectFromHospitalReservationEn = async(memberId: number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectFromHospitalReservationEn`, {params: {memberId}});
    return res.data;
}

// -------------------------- 즐겨찾기 관련--------------------------	
interface MemberFavoriteDto{
    memberId: number;
    hospitalId: number;
    hospitalSource: string;
}

// 즐겨찾기 추가 - member_favorite 테이블에 insert
export const insertIntoMemberFavorite = async(memberFavoriteDto: MemberFavoriteDto) => {
    const res = await axios.post(`${API_SERVER_URL}/insertIntoMemberFavorite`, memberFavoriteDto)
    return res.data;
}

// 회원의 즐겨찾기 조회(병원 id, 병원명, 병원 메인 주소)
export const selectFromMemberFavorite = async(memberId: number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectFromMemberFavorite`, {params: {memberId}});
    return res.data;
}
//------------------------ 병원 관련(영어 버전) ------------------------	
// *영어*  회원의 즐겨찾기 조회(병원 id, 병원명, 병원 메인 주소)
export const selectFromMemberFavoriteEn = async(memberId: number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectFromMemberFavoriteEn`, {params: {memberId}});
    return res.data;
}

// 병원 id와 회원 id로, 회원이 즐겨찾기한 병원인지 확인 
export const isFavoriteCheck = async(memberId: number, hospitalId:number, source: string) => {
    const res = await axios.get(`${API_SERVER_URL}/isFavoriteCheck`, {params: {memberId, hospitalId, source}});
    return res.data;
}

// 즐겨찾기 삭제(취소)
export const deleteMemberFavorite = async(memberId: number, hospitalId:number, source: string) => {
    const res = await axios.delete(`${API_SERVER_URL}/deleteMemberFavorite`, {params: {memberId, hospitalId, source}});
    return res.data;
}

// interface ChartInfoDto{
//     chartType: string;
//     resultTableInfo: Array<Record<string, any>>;
//     chartConfig: Record<string, any>;
//     chartName: string;
// }
// //	'대시보드에 저장' 버튼 누르면, chartInfo 테이블에 해당 차트 정보 저장
// export const insertIntoChartInfo = async(chartInfoDto: ChartInfoDto) => {
//     const res = await axios.post(`${API_SERVER_URL}/insertIntoChartInfo`,chartInfoDto)
//     return res.data;
// }


// // 대시보드 추가
// export const insertIntoDashboardInfo = async(dashboardName: string) => {
//     const res = await axios.post(`${API_SERVER_URL}/insertIntoDashboardInfo`, {dashboardName: dashboardName})
//     return res.data;
// }

// //	대시보드에서 차트의 x, ,y, w, h 수정
// export const updateChartDashboardConnect = async(chartDashboardConnectDto: ChartDashboardConnectDto) => {
//     const res = await axios.put(`${API_SERVER_URL}/updateChartDashboardConnect`,chartDashboardConnectDto)
//     return res.data;
// }
