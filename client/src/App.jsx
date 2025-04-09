import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { HeaderLayout } from "./components/layout/HeaderLayout";
import { Login } from "./components/auth/Login";
import { Toaster } from "sonner";

import { DashboardPages } from "./pages/DashboardPages";
import MeetingPage from "./pages/MeetingPages";
import NoticeBoardPage from "./pages/NoticeBoardPage";
import SyllabusPage from "./pages/SyllabusPage";
import RoutinePage from "./pages/RoutinePage";
import CertificatePage from "./pages/CertificatePage";
import SettingsPages from "./pages/SettingsPages";

import ProtectedRoute from "./components/common/ProtectedRoute";
import Error from "./components/common/Error";
import { Register } from "./components/auth/Register";
import MemberPages from "./pages/MemberPages";

function App() {
    const isLogin = useSelector((state) => state.user.isLogin);

    return (
        <BrowserRouter>
            <Toaster position="top-right" reverseOrder={false} />

            <Routes>
                <Route path="/" element={<HeaderLayout />}>
                    <Route
                        index
                        element={
                            <ProtectedRoute
                                element={DashboardPages}
                                allowedRoles={[
                                    "hod",
                                    "faculty",
                                    "student",
                                    "external",
                                ]}
                            />
                        }
                    />
                    <Route
                        path="meetings"
                        element={
                            <ProtectedRoute
                                element={MeetingPage}
                                allowedRoles={["hod", "faculty", "external"]}
                            />
                        }
                    />
                    <Route
                        path="notices"
                        element={
                            <ProtectedRoute
                                element={NoticeBoardPage}
                                allowedRoles={["hod", "faculty", "student"]}
                            />
                        }
                    />
                    <Route
                        path="syllabus"
                        element={
                            <ProtectedRoute
                                element={SyllabusPage}
                                allowedRoles={[
                                    "hod",
                                    "faculty",
                                    "student",
                                    "external",
                                ]}
                            />
                        }
                    />
                    <Route
                        path="routine"
                        element={
                            <ProtectedRoute
                                element={RoutinePage}
                                allowedRoles={["hod", "faculty", "student"]}
                            />
                        }
                    />
                    <Route
                        path="certificates"
                        element={
                            <ProtectedRoute
                                element={CertificatePage}
                                allowedRoles={["hod", "external"]}
                            />
                        }
                    />
                    <Route
                        path="settings"
                        element={
                            <ProtectedRoute
                                element={SettingsPages}
                                allowedRoles={[
                                    "hod",
                                    "faculty",
                                    "student",
                                    "external",
                                ]}
                            />
                        }
                    />
                    <Route
                        path="members"
                        element={
                            <ProtectedRoute
                                element={MemberPages}
                                allowedRoles={[
                                    "hod",
                                ]}
                            />
                        }
                    />
                </Route>
                <Route path="/error" element={<Error />} />
                <Route path="*" element={<Error />} />

                <Route
                    path="/login"
                    element={isLogin ? <Navigate to="/" replace /> : <Login />}
                />
                <Route
                    path="/register"
                    element={
                        isLogin ? <Navigate to="/" replace /> : <Register />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
