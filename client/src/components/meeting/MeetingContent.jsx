import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Calendar,
    Clock,
    Users,
    MapPin,
    Trash2,
    FilePenLine,
} from "lucide-react";

const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("-");
    return new Date(`${year}-${month}-${day}`);
};
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { CalendarPlus } from "lucide-react";
import { DatePickerDemo } from "@/components/layout/DatePicker";
const MeetingContent = ({
    title,
    description,
    date,
    time,
    participants,
    location,
}) => {
    const [meetingData, setMeetingData] = useState({
        title: title,
        description: description,
        date: date,
        time: time,
        location:location,
        listParticipent: {},
    });

    let status;
    let background;
    const meetingDate = parseDate(date);
    const currentDate = new Date();
    if (meetingDate.toDateString() === currentDate.toDateString()) {
        status = "Today";
        background = "bg-[#35c735]";
    } else if (meetingDate.toDateString() > currentDate.toDateString()) {
        status = "Upcoming";
        background = `bg-[#1e87b8]`;
    } else {
        status = "Completed";
        background = `bg-[#838586]`;
    }

    return (
        <>
            <Card className="my-4 shadow-lg border border-gray-200 rounded-2xl transition hover:shadow-xl">
                <CardHeader className=" rounded-t-2xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex">
                            <CardTitle className="text-xl text-blue-800 flex flex-row">
                                <div className="w-full flex flex-row gap-4">
                                    {/* <div className={`h-5 w-fit rounded-[10px] mt-[2px] justify-center items-center ${background} text-black font-normal  text-[14px]`}>{status}</div> */}
                                    <div
                                        className={`px-2  rounded-full text-white text-[12px] font-normal  shadow-sm ${background} flex items-center justify-center`}
                                    >
                                        {status}
                                    </div>

                                    <div className=" justify-center items-center">
                                        {title}
                                    </div>
                                </div>
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500 mt-1"></CardDescription>
                        </div>
                        <div className="flex w-fit gap-3">
                            <Dialog>
                                <DialogTrigger className="justify-around items-center px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-700 transition  flex gap-2">
                                    Delete
                                    <Trash2 className="p-1" />
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Are you absolutely sure?
                                        </DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This
                                            will permanently delete your account
                                            and remove your data from our
                                            servers.
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>

                            <Dialog>
                                <DialogTrigger className="justify-around items-center px-4 py-2 text-sm bg-[#28449ede] text-white rounded-md hover:bg-[#28439e] transition  flex gap-2">
                                    Edit <FilePenLine className="p-1" />
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Are you absolutely sure?
                                        </DialogTitle>
                                        <DialogDescription>
                                            <form
                                                // onSubmit={submitMeetingData}
                                                className="space-y-6 p-6 bg-white max-w-xl mx-auto"
                                            >
                                                <div className="flex flex-col gap-1.5">
                                                    <Label htmlFor="title">
                                                        Title
                                                    </Label>
                                                    <Input
                                                        id="title"
                                                        placeholder="Enter meeting title"
                                                        value={
                                                            meetingData.title
                                                        }
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-1.5">
                                                    <Label htmlFor="description">
                                                        Description
                                                    </Label>
                                                    <Textarea
                                                        id="description"
                                                        placeholder="Meeting purpose, agenda..."
                                                        value={
                                                            meetingData.description
                                                        }
                                                    />
                                                </div>

                                                <div className="flex flex-col sm:flex-row gap-4">
                                                    <div className="flex flex-col gap-1.5 w-full  ">
                                                        <Label htmlFor="date">
                                                            Date
                                                        </Label>
                                                        <DatePickerDemo
                                                            value={
                                                                meetingData.date
                                                            }
                                                        />
                                                    </div>

                                                    <div className="flex flex-col gap-1.5 w-full  ">
                                                        <Label htmlFor="time">
                                                            Time
                                                        </Label>
                                                        <Input
                                                            value={
                                                                meetingData.time
                                                            }
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
                                                        value={meetingData.location}
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
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            <Sheet>
                                <SheetTrigger className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                                    View Details /Notify
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>
                                            Are you absolutely sure?
                                        </SheetTitle>
                                        <SheetDescription>
                                            This action cannot be undone. This
                                            will permanently delete your account
                                            and remove your data from our
                                            servers.
                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {description}
                    {status}
                </CardContent>

                <CardFooter className="flex justify-around px-6 py-[10px]rounded-b-2xl  ">
                    {/**  h-[3rem] */}
                    <div className="flex flex-col items-center gap-[3px]">
                        <Calendar className="w-4 h-4  " />
                        <div className=" flex   gap-2 items-center">
                            <p className="text-[13px] ">Date</p>
                            <p className="text-[13px] ">{date}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-[3px]">
                        <Clock className="w-4 h-4  " />
                        <div className=" flex   gap-2 items-center">
                            <p className="text-[13px] ">Time</p>
                            <p className="text-[13px] ">
                                {(() => {
                                    if (!time) return "";
                                    const [hourStr, minuteStr] =
                                        time.split(":");
                                    const hour = parseInt(hourStr, 10);
                                    const suffix = hour < 12 ? "AM" : "PM";
                                    const formattedHour =
                                        hour % 12 === 0 ? 12 : hour % 12;
                                    return `${formattedHour}:${minuteStr} ${suffix}`;

                                })()}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-[3px]">
                        <Users className="w-4 h-4  " />
                        <div className=" flex   gap-2 items-center">
                            <p className="text-[13px] ">Participants</p>
                            <p className="text-[13px] ">{participants}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-[3px]">
                        <MapPin className="w-4 h-4  " />
                        <div className=" flex   gap-2 items-center">
                            <p className="text-[13px] ">Location</p>
                            <p className="text-[13px] ">{location}</p>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
};

export default MeetingContent;
