import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { PenIcon, Trash2, ScanEyeIcon, ArrowDownToLine } from "lucide-react";

const SyllabusContent = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const syllabusData = [
        {
            semester: "1",
            papercode: "CC1",
            papername: "Data Structures",
        },
        {
            semester: "1",
            papercode: "CC2",
            papername: "Mathematics",
        },
        {
            semester: "1",
            papercode: "CC3",
            papername: "Computer Fundamentals",
        },
        {
            semester: "1",
            papercode: "CC4",
            papername: "Programming in C",
        },
    ];

    const filteredData = syllabusData.filter(
        (item) =>
            item.papercode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.papername.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* Search Input */}
            <div className="mb-4 w-full">
                <input
                    type="text"
                    placeholder="Search by paper code or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <Table>
                <TableCaption>List of all syllabus papers</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left pl-6">Semester</TableHead>
                        <TableHead className="text-center">Paper Code</TableHead>
                        <TableHead className="text-center">Paper Name</TableHead>
                        <TableHead className="text-right pr-[120px]">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.length > 0 ? (
                        filteredData.map((items, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-left pl-10">{items.semester}</TableCell>
                                <TableCell className="text-center">{items.papercode}</TableCell>
                                <TableCell className="text-center">{items.papername}</TableCell>
                                <TableCell className="text-left">
                                    <div className="w-full flex justify-end pr-5 gap-1">
                                        <Sheet>
                                            <SheetTrigger>
                                                <ScanEyeIcon />
                                            </SheetTrigger>
                                            <SheetContent>
                                                <SheetHeader>
                                                    <SheetTitle className="h-20 w-full flex flex-col justify-center items-center">
                                                        <span className="font-normal">{items.semester}</span>
                                                        <span className="font-normal">{items.papercode}</span>
                                                        <span className="font-normal">{items.papername}</span>
                                                    </SheetTitle>
                                                    <SheetDescription>
                                                        This is just a mock view section. You can customize this
                                                        message depending on your feature.
                                                    </SheetDescription>
                                                </SheetHeader>
                                            </SheetContent>
                                        </Sheet>

                                        <Button variant={"ghost"}>
                                            <ArrowDownToLine />
                                        </Button>
                                        <Button variant={"ghost"}>
                                            <PenIcon />
                                        </Button>
                                        <Button variant={"ghost"}>
                                            <Trash2 />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-400 italic">
                                No matching syllabus found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
};

export default SyllabusContent;
