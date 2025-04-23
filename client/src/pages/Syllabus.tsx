// import React from "react";
// import { useSelector } from "react-redux"; // Make sure to import useSelector
// import SyllabusContent from "../components/syllabus/SyllabusContent";
// import { motion } from "framer-motion";

// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "../components/ui/select";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import { Button } from "../components/ui/button";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "../components/ui/dialog";

// // Framer Motion Variants
// const containerVariants = {
//     hidden: {},
//     show: {
//         transition: {
//             staggerChildren: 0.1,
//         },
//     },
// };

// const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
// };

// const Syllabus = () => {
//     // Get the role from Redux store
//     const role = useSelector((state: any) => state.user.role); // Adjust this based on your store shape

//     return (
//         <>
//             {/* <Helmet>
//                 <title>Syllabus | PBC Online</title>
//             </Helmet> */}

//             {/* Header with button */}
//             <motion.div
//                 className="flex items-center justify-between px-8 py-4"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//             >
//                 <h1 className="text-3xl font-bold">Syllabus</h1>

//                 {/* Conditionally render the "Add Syllabus" button only if the role is "HOD" */}
//                 {role === "hod" && (
//                     <Dialog>
//                         <DialogTrigger>
//                             <Button variant="outline">+ Add Syllabus</Button>
//                         </DialogTrigger>
//                         <DialogContent>
//                             <DialogHeader>
//                                 <DialogTitle>ADD new Syllabus</DialogTitle>
//                                 <DialogDescription>
//                                     <form className="mt-6 flex flex-col gap-5 py-3">
//                                         <div className="w-full flex gap-4">
//                                             <div className="w-1/2">
//                                                 <Label htmlFor="role">Semester</Label>
//                                                 <Select>
//                                                     <SelectTrigger className="w-full">
//                                                         <SelectValue placeholder="Semester" />
//                                                     </SelectTrigger>
//                                                     <SelectContent>
//                                                         {[...Array(8)].map((_, i) => (
//                                                             <SelectItem key={i} value={`${i + 1}`}>
//                                                                 {`${i + 1}st Semester`.replace("1st", `${i + 1}th`).replace("11th", "11th").replace("12th", "12th").replace("13th", "13th")}
//                                                             </SelectItem>
//                                                         ))}
//                                                     </SelectContent>
//                                                 </Select>
//                                             </div>
//                                             <div>
//                                                 <Label>Paper Code</Label>
//                                                 <Input id="doc" type="text" />
//                                             </div>
//                                         </div>
//                                         <div className="w-full">
//                                             <Label htmlFor="title">Paper Name</Label>
//                                             <Input id="title" type="text" />
//                                         </div>
//                                         <div>
//                                             <Label htmlFor="doc">Upload Syllabus</Label>
//                                             <Input
//                                                 placeholder="Upload Syllabus"
//                                                 id="doc"
//                                                 type="file"
//                                                 className="h-[5rem] w-full border-2 border-dashed border-gray-400 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition text-center"
//                                             />
//                                         </div>
//                                         <Button variant="default" className="w-full bg-slate-900">
//                                             Create
//                                         </Button>
//                                     </form>
//                                 </DialogDescription>
//                             </DialogHeader>
//                         </DialogContent>
//                     </Dialog>
//                 )}
//             </motion.div>

//             {/* Animate Syllabus Content */}
//             <motion.div
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="show"
//             >
//                 <motion.div variants={itemVariants}>
//                     <SyllabusContent />
//                 </motion.div>
//             </motion.div>
//         </>
//     );
// };

// export default Syllabus;
import React, { useState } from "react";
import { useSelector } from "react-redux"; // Make sure to import useSelector
import SyllabusContent from "../components/syllabus/SyllabusContent";
import { motion } from "framer-motion";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";

// Framer Motion Variants
const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Syllabus = () => {
    const role = useSelector((state: any) => state.user.role); // Get role from Redux store
    const [semester, setSemester] = useState<string>(""); // Store semester
    const [paperCode, setPaperCode] = useState<string>(""); // Store paper code
    const [paperName, setPaperName] = useState<string>(""); // Store paper name
    const [syllabusFile, setSyllabusFile] = useState<File | null>(null); // Store syllabus file
    const [formData, setFormData] = useState<any>(null); // Store the form data locally

    // Handle form submission (no API call)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create a new form data object
        const newFormData = {
            semester,
            paperCode,
            paperName,
            syllabusFile,
        };

        // Store the form data in the state
        setFormData(newFormData);

        // Optionally, log the data to check if it has been stored
        console.log("Form Data Stored:", newFormData);

        // Handle any other UI logic (e.g., show success message, clear form)
    };

    return (
        <>
            {/* <Helmet>
                <title>Syllabus | PBC Online</title>
            </Helmet> */}

            {/* Header with button */}
            <motion.div
                className="flex items-center justify-between px-8 py-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h1 className="text-3xl font-bold">Syllabus</h1>

                {/* Conditionally render the "Add Syllabus" button only if the role is "HOD" */}
                {role === "hod" && (
                    <Dialog>
                        <DialogTrigger>
                            <Button variant="outline">+ Add Syllabus</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>ADD new Syllabus</DialogTitle>
                                <DialogDescription>
                                    <form
                                        onSubmit={handleSubmit}
                                        className="mt-6 flex flex-col gap-5 py-3"
                                    >
                                        <div className="w-full flex gap-4">
                                            <div className="w-1/2">
                                                <Label htmlFor="semester">Semester</Label>
                                                <Select
                                                    value={semester}
                                                    onValueChange={setSemester}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Semester" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {[...Array(8)].map((_, i) => (
                                                            <SelectItem key={i} value={`${i + 1}`}>
                                                                {`${i + 1}st Semester`.replace("1st", `${i + 1}th`).replace("11th", "11th").replace("12th", "12th").replace("13th", "13th")}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label>Paper Code</Label>
                                                <Input
                                                    id="paperCode"
                                                    type="text"
                                                    value={paperCode}
                                                    onChange={(e) => setPaperCode(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor="paperName">Paper Name</Label>
                                            <Input
                                                id="paperName"
                                                type="text"
                                                value={paperName}
                                                onChange={(e) => setPaperName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="syllabusFile">Upload Syllabus</Label>
                                            <Input
                                                id="syllabusFile"
                                                type="file"
                                                onChange={(e) => setSyllabusFile(e.target.files?.[0] ?? null)}
                                                className="h-[5rem] w-full border-2 border-dashed border-gray-400 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition text-center"
                                            />
                                        </div>
                                        <Button type="submit" variant="default" className="w-full bg-slate-900">
                                            Create
                                        </Button>
                                    </form>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
            </motion.div>

            {/* Animate Syllabus Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                <motion.div variants={itemVariants}>
                    <SyllabusContent />
                </motion.div>
            </motion.div>

            {/* Optionally, display stored form data */}
            {formData && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                    <h3 className="font-bold text-lg">Stored Form Data:</h3>
                    <pre>{JSON.stringify(formData, null, 2)}</pre>
                </div>
            )}
        </>
    );
};

export default Syllabus;
