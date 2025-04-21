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
