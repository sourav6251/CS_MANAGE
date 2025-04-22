import React, { useEffect } from "react";
import MeetingContent from "../components/meeting/MeetingContent";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { motion } from "framer-motion";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

import { CalendarPlus } from "lucide-react";
import { DatePickerDemo } from "../components/layout/DatePicker";
const meetingDetails = [
    {
        title: "Research Review",
        description: "Discussing project milestones and issues",
        date: "20-08-2025",
        time: "10:00",
        participants: 10,
        location: "VS201",
    },
    {
        title: "Research Review",
        description: "Discussing project milestones and issues",
        date: "20-02-2025",
        time: "10:00",
        participants: 10,
        location: "VS201",
    },
    {
        title: "Research Review",
        description: "Discussing project milestones and issues",
        date: "15-04-2025",
        time: "10:00",
        participants: 10,
        location: "VS201",
    },
];
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};
const Meetings = () => {
    console.log(new Date());
    const submitMeetingData = () => {};

    return (
        <>
            <div className=" h-[2.7rem] pr-8 flex justify-end items-end">
                <Dialog>
                    <DialogTrigger>
                        <Button
                            variant="outline"
                            className="flex flex-row items-center justify-center"
                        >
                            <CalendarPlus className="text-[5px] p-[2px]" />
                            <span>Organize meeting</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Organize new meeting</DialogTitle>
                            <DialogDescription className="gap-4 flex flex-col">
                                <form
                                    onSubmit={submitMeetingData}
                                    className="space-y-6 p-6 bg-white max-w-xl mx-auto"
                                >
                                    <div className="flex flex-col gap-1.5">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="Enter meeting title"
                                            // value={meetinfData}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Meeting purpose, agenda..."
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex flex-col gap-1.5 w-full  ">
                                            <Label htmlFor="date">Date</Label>
                                            <DatePickerDemo />
                                        </div>

                                        <div className="flex flex-col gap-1.5 w-full  ">
                                            <Label htmlFor="time">Time</Label>
                                            <Input
                                                id="time"
                                                type="time"
                                                className="w-full "
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <Label htmlFor="location">
                                            Location
                                        </Label>
                                        <Input
                                            id="location"
                                            placeholder="Enter room/building"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <Label htmlFor="email">
                                            User email
                                        </Label>
                                        <Input
                                            placeholder="Email"
                                            id="email"
                                            type="email"
                                        />
                                    </div>
                                </form>

                                <Button>Submit</Button>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {meetingDetails.map((meeting, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <MeetingContent
                            key={index}
                            title={meeting.title}
                            description={meeting.description}
                            date={meeting.date}
                            time={meeting.time}
                            participants={meeting.participants}
                            location={meeting.location}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
};

export default Meetings;
