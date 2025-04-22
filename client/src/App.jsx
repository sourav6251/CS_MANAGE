import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
    NoticeBoard,
    Routines,
    Settings,
    Syllabus,
} from "./pages";

// Create a client
const queryClient = new QueryClient();

const App = () => (
    <Provider store={store}>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Dashboard />} />
                                <Route
                                    path="/routines"
                                    element={<Routines />}
                                />
                                <Route
                                    path="/cirtificates"
                                    element={<Cirtificates />}
                                />
                                <Route
                                    path="/meetings"
                                    element={<Meetings />}
                                />
                                <Route path="/members" element={<Members />} />
                                <Route
                                    path="/notice-board"
                                    element={<NoticeBoard />}
                                />
                                <Route
                                    path="/settings"
                                    element={<Settings />}
                                />
                                <Route
                                    path="/syllabus"
                                    element={<Syllabus />}
                                />
                            </Route>
                            <Route path="/login" element={<Login />} />
                            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </TooltipProvider>
            </QueryClientProvider>
        </ThemeProvider>
    </Provider>
);

export default App;
