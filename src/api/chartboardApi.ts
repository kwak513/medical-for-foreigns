import axios from "axios";

const API_SERVER_URL = "http://localhost:8080";

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

// // 병원명 검색하기
// export const selectByHospitalName = async(hospitalName:string, offsetNum: number) => {
//     const res = await axios.get(`${API_SERVER_URL}/selectByHospitalName`, {params: {hospitalName, offsetNum}});
//     return res.data;
// }

// // 필터링 기능(사용 언어, 진료과목, 지역)
// export const filterHospitalByLangDepartLocation = async(language:string, department:string, location:string, offsetNum: number) => {
//     const res = await axios.get(`${API_SERVER_URL}/filterHospitalByLangDepartLocation`, {params: {language, department, location, offsetNum}});
//     return res.data;
// }

// 병원 & 필터링 기능(사용 언어, 진료과목, 지역) 동시에.
export const searchAndFilterHospital = async(hospitalName:string, language:string, department:string, location:string, offsetNum: number) => {
    const res = await axios.get(`${API_SERVER_URL}/searchAndFilterHospital`, {params: {hospitalName, language, department, location, offsetNum}});
    return res.data;
}

// -------------------------- 회원  --------------------------
interface MemberRegisterDto{
    username: string;
    password: string;
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

// 회원 정보 조회(username)
export const selectUsername = async(memberId: number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectUsername`, {params: {memberId}});
    return res.data;
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
export const selectFromHospitalReview = async(hospitalId: number, source: string) => {
    const res = await axios.get(`${API_SERVER_URL}/selectFromHospitalReview`, {params: {hospitalId, source}});
    return res.data;
}


// 회원이 작성한 리뷰 조회
export const selectReviewByMemberId = async(memberId: number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectReviewByMemberId`, {params: {memberId}});
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
