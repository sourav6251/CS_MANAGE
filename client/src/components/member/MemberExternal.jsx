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

const MemberExternal = () => {
    const [search, setSearch] = useState("");

    const students = [
        {
            department: "CS",
            name: "Aritra Sen",
            phone: "123456789",
            email: "aritrasen@example.com",
        },
        {
            department: "CS",
            name: "Sourav Das",
            phone: "123456789",
            email: "sourav@example.com",
        },
        {
            department: "CS",
            name: "Sneha Paul",
            phone: "123456789",
            email: "sneha@example.com",
        },
        {
            department: "CS",
            name: "Ritika Roy",
            phone: "123456789",
            email: "ritika@example.com",
        },
    ];

    const filteredStudents = students.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full h-fit mr-2 border-gray-300 border-[1px] rounded-lg p-4">
            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 bg-transparent py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Table */}
            <Table>
                <TableCaption>List of all Externals</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/4 text-center">
                            Department
                        </TableHead>
                        <TableHead className="w-1/4 text-center">
                            Name
                        </TableHead>
                        <TableHead className="w-1/4 text-center">
                            Phone No
                        </TableHead>
                        <TableHead className="w-1/4 text-center">
                            Email
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">
                                    {item.department}
                                </TableCell>
                                <TableCell className="text-center">
                                    {item.name}
                                </TableCell>
                                <TableCell className="text-center">
                                    {item.phone}
                                </TableCell>
                                <TableCell className="text-center">
                                    {item.email}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="text-center text-gray-400 italic"
                            >
                                No matching results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default MemberExternal;
