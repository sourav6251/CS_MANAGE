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

const HOD = [
    {
        department: "CS",
        name: "aaaa bbb",
        phone: "123456789",
        email: "aaaa@ddd.com",
    },
    {
        department: "Bengali",
        name: "asdf ad",
        phone: "123456789",
        email: "sdsds@sdf.com",
    },
    {
        department: "History",
        name: "asd sad",
        phone: "123456789",
        email: "sadf@da.com",
    },
    {
        department: "Physic",
        name: "adsf sdfgj",
        phone: "123456789",
        email: "ad@ece.com",
    },
    {
        department: "Math",
        name: "asf r",
        phone: "123456789",
        email: "ads@me.com",
    },
];

const MemberHOD = () => {
    const [search, setSearch] = useState("");

    const filteredHOD = HOD.filter((hod) =>
        hod.name.toLowerCase().includes(search.toLowerCase())
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <Table>
                <TableCaption>List of all HODs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/4 text-center">Department</TableHead>
                        <TableHead className="w-1/4 text-center">Name</TableHead>
                        <TableHead className="w-1/4 text-center">Phone No</TableHead>
                        <TableHead className="w-1/4 text-center">Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredHOD.length > 0 ? (
                        filteredHOD.map((hod, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{hod.department}</TableCell>
                                <TableCell className="text-center">{hod.name}</TableCell>
                                <TableCell className="text-center">{hod.phone}</TableCell>
                                <TableCell className="text-center">{hod.email}</TableCell>
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

export default MemberHOD;
