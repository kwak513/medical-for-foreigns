
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const HospitalMainPage = lazy(() => import("../pages/hospital/HospitalMainPage"));
const PharmacyMainPage = lazy(() => import("../pages/pharmacy/PharmacyMainPage"));
const EmergencyMainPage = lazy(() => import("../pages/emergency/EmergencyMainPage"));
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
            {path: "/hospital", element: <Suspense fallback={<LoadingScreen />}><HospitalMainPage /></Suspense>},
            {path: "/pharmacy", element: <Suspense fallback={<LoadingScreen />}><PharmacyMainPage /></Suspense>},
            {path: "/emergency", element: <Suspense fallback={<LoadingScreen />}><EmergencyMainPage /></Suspense>},
            // {path: "chartlist", element: <Suspense fallback={<LoadingScreen />}><CollectionChartList /></Suspense>},
            // {path: "dashboardlist", element: <Suspense fallback={<LoadingScreen />}><CollectionDashboardList /></Suspense>},
            // {path: "rowtochart", element: <Suspense fallback={<LoadingScreen />}><RowToChart /></Suspense>},
            // {path: "rowtodashboard", element: <Suspense fallback={<LoadingScreen />}><RowToDashboard /></Suspense>},
            
            // {path: "dblist", element: <Suspense fallback={<LoadingScreen />}><DatabaseList /></Suspense>},
            // {path: "customsql", element: <Suspense fallback={<LoadingScreen />}><CustomSqlSearch /></Suspense>},
        ]

    }
])

export default router;