import { motion } from "framer-motion";
import { Users, DollarSign, Activity, BarChart } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";


import { useAppSelector } from "@/redux/hooks";
import { DashboardContext } from "../components/dashboard/DashboardContent";

export default function Dashboard() {
    const { stats } = useAppSelector((state) => state.dashboard);

    return (
        <>
        <DashboardContext />
        </>
    );
}
