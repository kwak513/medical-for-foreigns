
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const HospitalMainPage = lazy(() => import("../pages/hospital/HospitalMainPage"));
const HospitalInfoPage = lazy(() => import("../pages/hospital/HospitalInfoPage"));
const HospitalRegisterPage = lazy(() => import("../pages/hospital/HospitalRegisterPage"));
const HospitalReviewPage = lazy(() => import("../pages/hospital/review/HospitalReviewPage"));

const LoginPage = lazy(() => import("../pages/member/LoginPage"));
const SignupPage = lazy(() => import("../pages/member/SignupPage"));
const MyPage = lazy(() => import("../pages/member/MyPage"));
const FindIdPage = lazy(() => import("../pages/member/FindIdPage"));
const FindPasswordPage = lazy(() => import("../pages/member/FindPasswordPage"));

// const Collection1 = lazy(() => import("../pages/collections/Collection1Page"));
// const CollectionMain = lazy(() => import("../pages/collections/CollectionMainPage"));
// const CollectionChartList = lazy(() => import("../pages/collections/CollectionChartListPage"));
// const CollectionDashboardList = lazy(() => import("../pages/collections/CollectionDashboardListPage"));

// const RowToChart = lazy(() => import("../pages/collections/RowToChartPage"));
// const RowToDashboard = lazy(() => import("../pages/collections/RowToDashboard"));


// const DatabaseList = lazy(() => import("../pages/datas/DatabaseListPage"));
// const CustomSqlSearch = lazy(() => import("../pages/customSqlSearch/CustomSqlSearchPage"));


const LoadingScreen = () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <h2>페이지 로딩 중...</h2>
    </div>
  );

const router = createBrowserRouter([
    {
        path: "",
        element:(
                <MainLayout />
        ),
        children: [
            {path: "/", element: <Suspense fallback={<LoadingScreen />}><HospitalMainPage /></Suspense>},
            {path: "/hospital", element: <Suspense fallback={<LoadingScreen />}><HospitalMainPage /></Suspense>},
            {path: "/hospital/info", element: <Suspense fallback={<LoadingScreen />}><HospitalInfoPage /></Suspense>},
            {path: "/hospital/register", element: <Suspense fallback={<LoadingScreen />}><HospitalRegisterPage /></Suspense>},
            {path: "/hospital/review", element: <Suspense fallback={<LoadingScreen />}><HospitalReviewPage /></Suspense>},
            

            {path: "/login", element: <Suspense fallback={<LoadingScreen />}><LoginPage /></Suspense>},
            {path: "/signup", element: <Suspense fallback={<LoadingScreen />}><SignupPage /></Suspense>},
            {path: "/mypage", element: <Suspense fallback={<LoadingScreen />}><MyPage /></Suspense>},
            {path: "/findid", element: <Suspense fallback={<LoadingScreen />}><FindIdPage /></Suspense>},
            {path: "/findpassword", element: <Suspense fallback={<LoadingScreen />}><FindPasswordPage /></Suspense>},
        ]

    }
])

export default router;