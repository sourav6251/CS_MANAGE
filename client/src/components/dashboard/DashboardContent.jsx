import { motion } from "framer-motion";
import { AwardIcon,Users2 } from "lucide-react";

import { useAppSelector } from "@/redux/hooks";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardContext() {
    const routineData = [
        {
            startTime: "10:00 AM",
            endTime: "11:00 AM",
            semester: "4th",
            room: "PC201",
        },
        {
            startTime: "11:15 AM",
            endTime: "12:15 PM",
            semester: "6th",
            room: "PC202",
        },
    ];
    const MotionRow = motion(TableRow);
    const rowVariant = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    };
    const { stats } = useAppSelector((state) => state.dashboard);

    return (
        <>
            <div className="h-full w-full bg-[#d3cbcb27] rounded-lg p-2 flex flex-col">
                <div className="flex w-full h-fit">
                    <Card
                        icon={AwardIcon}
                        cardData="3"
                        cardName="Certificate Request"
                        className="bg-[#d3cbcb49]  h-[7rem] w-1/2 m-5 flex flex-col items-center justify-center rounded-lg"
                    />
                    <Card
                        icon={Users2}
                        cardData="4"
                        cardName="Upcomming Meeting"
                        className="bg-[#d3cbcb49] h-[7rem] w-1/2 m-5 flex flex-col items-center justify-center rounded-lg"
                    />
                </div>
                <div className="self-start pl-6 text-2xl pb-5 flex flex-col w-full mt-12">
                    <span className="text-[#213e75]  font-bold">
                        Today's teaching schedule
                    </span>
                    <Table>
                        <TableCaption>
                            A list of your Today's teaching schedules.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">
                                    Starting Time
                                </TableHead>
                                <TableHead className="">Ending Time</TableHead>
                                <TableHead>Semester</TableHead>
                                <TableHead className="text-right">
                                    Room no
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {routineData.map((item, index) => (
                                <MotionRow
                                    key={index}
                                    variants={rowVariant}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.1,
                                    }}
                                    className="w-full"
                                >
                                    <TableCell className="font-medium">
                                        {item.startTime}
                                    </TableCell>
                                    <TableCell>{item.endTime}</TableCell>
                                    <TableCell>{item.semester}</TableCell>
                                    <TableCell className="text-right">
                                        {item.room}
                                    </TableCell>
                                </MotionRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

function Card({ icon: Icon, cardName, cardData, className }) {
    return (
        <div className={`${className} `}>
            <div className="h-12 w-12 bg-[#89da1f75] rounded-[50%]  p-3">
                <Icon className="h-full w-full text-[#7ac21c]" />
            </div>
            <span>{cardData}</span>
            <span>{cardName}</span>
        </div>
    );
}
