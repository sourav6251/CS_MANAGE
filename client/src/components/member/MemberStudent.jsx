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

const MemberStudent = () => {
    const [search, setSearch] = useState("");

    const student = [
        {
            semester: "1",
            name: "Anirban Ghosh",
            phone: "123456789",
            email: "anirban@college.com",
        },
        {
            semester: "2",
            name: "Tamal Dutta",
            phone: "123456789",
            email: "tamal@college.com",
        },
        {
            semester: "3",
            name: "Soham Paul",
            phone: "123456789",
            email: "soham@college.com",
        },
        {
            semester: "4",
            name: "Anisha Roy",
            phone: "123456789",
            email: "anisha@college.com",
        },
        {
            semester: "5",
            name: "Sudipto Das",
            phone: "123456789",
            email: "sudipto@college.com",
        },
    ];

    const filteredStudents = student.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full h-fit mr-2 border-gray-300 border-[1px] rounded-lg p-4">
            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <Table>
                <TableCaption>List of all Students</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/4 text-center">Semester</TableHead>
                        <TableHead className="w-1/4 text-center">Name</TableHead>
                        <TableHead className="w-1/4 text-center">Phone no</TableHead>
                        <TableHead className="w-1/4 text-center">Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map((items, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{items.semester}</TableCell>
                                <TableCell className="text-center">{items.name}</TableCell>
                                <TableCell className="text-center">{items.phone}</TableCell>
                                <TableCell className="text-center">{items.email}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-400 italic">
                                No matching students found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default MemberStudent;
