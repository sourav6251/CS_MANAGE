import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {
    Home,
    Bell,
    BookOpen,
    Calendar,
    Users,
    Award,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    UserCog,
} from "lucide-react";
import { logoutUser } from "../../redux/UserState";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const role = useSelector((state) => state.user.role);

    const getRoleDisplay = () => {
        switch (role) {
            case "hod":
                return "Admin HOD";
            case "faculty":
                return "Faculty Member";
            case "student":
                return "Student";
            case "external":
                return "External User";
            default:
                return "User";
        }
    };

    const getRoleInitials = () => {
        switch (role) {
            case "hod":
                return "AH";
            case "faculty":
                return "FM";
            case "student":
                return "ST";
            case "external":
                return "EU";
            default:
                return "U";
        }
    };

    const navItems = [
        {
            label: "Dashboard",
            icon: Home,
            path: "/",
            roles: ["hod", "faculty", "student", "external"],
        },
        {
            label: "Notice Board",
            icon: Bell,
            path: "/notices",
            roles: ["hod", "faculty", "student"],
        },
        {
            label: "Syllabus",
            icon: BookOpen,
            path: "/syllabus",
            roles: ["hod", "faculty", "student", "external"],
        },
        {
            label: "Routine",
            icon: Calendar,
            path: "/routine",
            roles: ["hod", "student", "faculty"],
        },
        {
            label: "Meetings",
            icon: Users,
            path: "/meetings",
            roles: ["hod", "faculty", "external"],
            badge: role === "faculty" ? "2" : null,
        },
        {
            label: "Certificate Requests",
            icon: Award,
            path: "/certificates",
            roles: ["hod", "external"],
            badge: role === "hod" ? "3" : null,
        },
        { label: "Members", icon: UserCog, path: "/members", roles: ["hod"] },
        {
            label: "Settings",
            icon: Settings,
            path: "/settings",
            roles: ["hod", "faculty", "student", "external"],
        }
    ];

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <aside
            className={`${
                isCollapsed ? "w-20" : "w-64"
            } bg-gradient-to-b from-white to-gray-50 shadow-xl h-full flex flex-col justify-between border-r border-gray-100 transition-all duration-300 relative`}
        >
            {/* Collapse Button */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-6 bg-white rounded-full p-1 shadow-md border border-gray-200 hover:bg-gray-50 z-10"
            >
                {isCollapsed ? (
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                ) : (
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                )}
            </button>

            {/* Profile Section */}
            <div className="px-4 pt-1 overflow-hidden">
                <div
                    className={`flex ${
                        isCollapsed ? "justify-center" : "flex-col items-center"
                    } mb-5`}
                >
                    <div
                        className={`${
                            isCollapsed ? "w-12 h-12" : "w-20 h-20"
                        } rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg`}
                    >
                        <span
                            className="text-white font-semibold"
                            style={{
                                fontSize: isCollapsed ? "1rem" : "1.5rem",
                            }}
                        >
                            {getRoleInitials()}
                        </span>
                    </div>
                    {!isCollapsed && (
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {getRoleDisplay()}
                            </h3>
                            <p className="text-sm text-primary/80">
                                Computer Science
                            </p>
                        </div>
                    )}
                </div>

                {/* Navigation Items */}
                <nav className="space-y-1">
                    {navItems.map(
                        ({ label, icon: Icon, path, roles, badge }) =>
                            roles.includes(role) && (
                                <NavLink
                                    key={path}
                                    to={path}
                                    className={({ isActive }) =>
                                        `group flex items-center px-3  py-2.5 rounded-xl transition-all duration-200 ${
                                            isActive
                                                ? "bg-primary/10 border-l-4 border-primary text-primary font-semibold"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                        } ${
                                            isCollapsed ? "justify-center " : ""
                                        }`
                                    }
                                    title={isCollapsed ? label : ""}
                                >
                                    <Icon
                                        className={`${
                                            isCollapsed ? "w-6 h-6" : "w-5 h-5"
                                        } ${role === "hod" ? "stroke-2" : ""}`}
                                    />
                                    {!isCollapsed && (
                                        <>
                                            <span className="ml-3 text-sm">
                                                {label}
                                            </span>
                                            {badge && (
                                                <span className="ml-auto bg-accent text-white text-xs px-2 py-1 rounded-full">
                                                    {badge}
                                                </span>
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            )
                    )}
                </nav>
            </div>

            {/* Logout Section */}
            <div className="border-t border-gray-100 px-4 py-5">
                <button
                    onClick={() => dispatch(logoutUser())}
                    className={`w-full flex items-center ${
                        isCollapsed ? "justify-center" : "justify-center px-4"
                    } py-2.5 text-red-600 rounded-lg hover:bg-red-50/80 transition-all`}
                    title={isCollapsed ? "Logout" : ""}
                >
                    <LogOut className="w-5 h-5 stroke-red-600" />
                    {!isCollapsed && (
                        <span className="ml-2 text-sm font-medium">Logout</span>
                    )}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
