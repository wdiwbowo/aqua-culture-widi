import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Teknologi from "./pages/Teknologi";
import Layanan from "./pages/Layanan";
import Developer from "./pages/Developer";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import DashboardPeta from "./pages/DashboardPeta";
import Salintas from "./pages/Salintas";
import Instrumentasi from "./pages/Instrumentasi";
import Pakan from "./pages/Pakan";
import Kesehatan from "./pages/Kesehatan";
import Konfigurasi from "./pages/Konfigurasi";
import Analytics from "./pages/Analytics";
import UserProfile from "./pages/UserProfile";


export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/teknologi', element: <Teknologi/>},
    { path: '/layanan', element: <Layanan/>},
    { path: '/developer', element: <Developer/>},
    { path: '/dashboard', element: <Dashboard/>},
    { path: '/register', element: <Register/>},
    { path: '/dashboardpeta', element: <DashboardPeta/>},
    { path: '/salintas', element: <Salintas/>},
    { path: '/instrumentasi', element: <Instrumentasi/>},
    { path: '/pakan', element: <Pakan/>},
    { path: '/kesehatan', element: <Kesehatan/>},
    { path: '/konfigurasi', element: <Konfigurasi/>},
    { path: '/Analytics', element: <Analytics/>},
    { path: '/UserProfile', element: <UserProfile/>},
    
])