import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { store } from "@/redux/store";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "./components/layout/Layout";
import {
    Cirtificates,
    Dashboard,
    Login,
    Meetings,
    Members,
    NotFound,
    Routines,
    Settings,
    Syllabus,
} from "./pages";
import NoticeBoard from "./pages/NoticeBoard";

// Create a client
const queryClient = new QueryClient();


const PrivateRoute = ({ children }) => {
    const isLogin = useSelector((state) => state.user.isLogin);
    return isLogin ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
    const isLogin = useSelector((state) => state.user.isLogin);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Layout />
                    </PrivateRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="/routines" element={<Routines />} />
                <Route path="/cirtificates" element={<Cirtificates />} />
                <Route path="/meetings" element={<Meetings />} />
                <Route path="/members" element={<Members />} />
                <Route path="/notice-board" element={<NoticeBoard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/syllabus" element={<Syllabus />} />
            </Route>
            <Route
                path="/login"
                element={
                    isLogin ? <Navigate to="/" replace /> : <Login />
                }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

const App = () => (
    <Provider store={store}>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                        <AppRoutes />
                    </BrowserRouter>
                </TooltipProvider>
            </QueryClientProvider>
        </ThemeProvider>
    </Provider>
);

export default App;
