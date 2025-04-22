import { useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Home,
    ChevronLeft,
    ChevronRight,
    Users,
    Settings,
    Calendar,
    BarChart3,
    HelpCircle,
    ClipboardList,
    LibraryBig,
    User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ icon: Icon, label, isCollapsed, link }) => {
    return (
        <NavLink to={link}>
            {({ isActive }) => (
                <motion.div
                    className={`w-full relative flex flex-row h-10 items-center justify-start rounded-md transition-colors duration-200
                        ${
                            isActive
                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                        }
                        ${isCollapsed ? "justify-center rounded-lg" : "px-5"}
                    `}
                    initial={false}
                    animate={{
                        backgroundColor: isActive ? "" : "transparent",
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {isActive && (
                        <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 w-1 h-full dark:bg-slate-200 bg-slate-800 rounded"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}

                    <motion.div
                        animate={{
                            marginRight: isCollapsed ? 0 : 8,
                            scale: isActive ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <Icon className="h-5 w-5 text-xl" size={24} />
                    </motion.div>

                    {!isCollapsed && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {label}
                        </motion.span>
                    )}
                </motion.div>
            )}
        </NavLink>
    );
};

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { isDarkMode } = useAppSelector((state) => state.theme);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const sidebarVariants = {
        expanded: { width: 240 },
        collapsed: { width: 80 },
    };

    return (
        <motion.div
            variants={sidebarVariants}
            initial={false}
            animate={isCollapsed ? "collapsed" : "expanded"}
            transition={{ duration: 0.3 }}
            className="h-screen sticky top-0 z-30 bg-sidebar border-r border-sidebar-border flex flex-col"
        >
            <div className="flex items-center justify-between px-4 h-16">
                <motion.div
                    initial={false}
                    animate={{ opacity: isCollapsed ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className={`font-semibold text-xl ${
                        isCollapsed ? "hidden" : "block"
                    }`}
                >
                    <div className="flex gap-1 items-end justify-center">
                        PBC Online{" "}
                        <div className="h-2 w-2 mb-1 bg-green-500 rounded-full"></div>
                    </div>
                </motion.div>
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    {isCollapsed ? (
                        <ChevronRight className="h-4 w-4" />
                    ) : (
                        <ChevronLeft className="h-4 w-4" />
                    )}
                </Button>
            </div>

            <Separator className="bg-sidebar-border" />

            <div className="flex-1 overflow-auto p-3 flex flex-col gap-1">
                <SidebarLink
                    icon={Home}
                    label="Dashboard"
                    isActive={true}
                    isCollapsed={isCollapsed}
                    link={"/"}
                />
                <SidebarLink
                    icon={ClipboardList}
                    label="Notices"
                    isCollapsed={isCollapsed}
                    link={"/notice-board"}
                />
                <SidebarLink
                    icon={LibraryBig}
                    label="Syllabus"
                    isCollapsed={isCollapsed}
                    link={"/syllabus"}
                />
                <SidebarLink
                    icon={BarChart3}
                    label="Cirtificates"
                    isCollapsed={isCollapsed}
                    link={"/cirtificates"}
                />
                <SidebarLink
                    icon={Users}
                    label="Meetings"
                    isCollapsed={isCollapsed}
                    link={"/meetings"}
                />
                <SidebarLink
                    icon={Calendar}
                    label="Routines"
                    isCollapsed={isCollapsed}
                    link={"/routines"}
                />
                <SidebarLink
                    icon={User}
                    label="Members"
                    isCollapsed={isCollapsed}
                    link={"/members"}
                />

                <div
                    className={`mt-auto flex flex-col gap-1 ${
                        isCollapsed ? "" : "pt-4"
                    }`}
                >
                    <SidebarLink
                        icon={Settings}
                        label="Settings"
                        isCollapsed={isCollapsed}
                        link={"/settings"}
                    />
                    <SidebarLink
                        icon={HelpCircle}
                        label="Help"
                        isCollapsed={isCollapsed}
                        link={"/help"}
                    />
                </div>
            </div>
        </motion.div>
    );
}
