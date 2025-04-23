import React, { useState, useEffect } from "react";

import { Plus } from "lucide-react";
import { motion } from "framer-motion";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import NoticeContent from "../components/notices/NoticeContent";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { useSelector } from "react-redux";
import ApiFunction from "../services/ApiFunction";

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1, // controls delay between children
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const NoticeBoard = () => {
    const role = useSelector((state) => state.user.role); // Get role from Redux store

    // State to store the fetched notices
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        // Call the showNotices API when the component mounts
        const fetchNotices = async () => {
            try {
                const response = await ApiFunction.showNotice();
                if (response) {
                    setNotices(response); // Assuming the API response has a `data` field with the notices
                }
                console.log("Notice",notices);
                
            } catch (error) {
                console.error("Error fetching notices:", error);
            }
        };

        fetchNotices();
    }, []); // Empty dependency array ensures this runs once on mount

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        file: null,
    });

    const formChanges = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const noticeSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        await ApiFunction.uploadNotice(formData);
    };

    return (
        <>
            <div className="p-6 flex-col flex gap-4">
                <motion.div
                    className="flex flex-row items-center justify-between pb-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h1 className="text-3xl font-bold">Notice Board</h1>

                    {/* Only show the "Create Notice" button if the user is HOD */}
                    {role === "hod" && (
                        <Dialog>
                            <DialogTrigger>
                                <Button
                                    variant="outline"
                                    className="flex flex-row items-center justify-center"
                                >
                                    <Plus />
                                    <span>Create Notice</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Create a new notice
                                    </DialogTitle>
                                    <DialogDescription>
                                        <form
                                            onSubmit={noticeSubmit}
                                            className="mt-6 flex flex-col gap-5"
                                        >
                                            <div>
                                                <Label htmlFor="title">
                                                    Notice title
                                                </Label>
                                                <Input
                                                    id="title"
                                                    name="title"
                                                    type="text"
                                                    value={formData.title}
                                                    onChange={formChanges}
                                                />

                                                <Label htmlFor="description">
                                                    Notice description
                                                </Label>
                                                <Textarea
                                                    id="description"
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={formChanges}
                                                    rows={6}
                                                />

                                                <Label htmlFor="doc">
                                                    Upload notice
                                                </Label>
                                                <Input
                                                    id="doc"
                                                    name="file"
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={formChanges}
                                                />
                                            </div>
                                            <Button
                                                variant={"default"}
                                                className="w-full bg-slate-900"
                                            >
                                                Create
                                            </Button>
                                        </form>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    )}
                </motion.div>

                <motion.div
                    className="flex flex-col gap-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {Array.isArray(notices) && notices.length > 0 ? (
  notices.map((notice, index) => (
    <motion.div variants={itemVariants} key={index}>
      <NoticeContent {...notice} />
    </motion.div>
  ))
) : (
  <motion.div variants={itemVariants}>
    <div>No notices availabledfgf</div>
  </motion.div>
)}

                    {/* {notices.length > 0 ? (
                        notices.map((notice, index) => (
                            <motion.div variants={itemVariants} key={index}>
                                <NoticeContent {...notice} />

                            </motion.div>
                        ))
                    ) : (
                        <motion.div variants={itemVariants}>
                            <div>No notices availablefghdfhg</div>
                        </motion.div>
                    )} */}
                </motion.div>
            </div>
        </>
    );
};

export default NoticeBoard;
// import React, { useState } from "react";

// import { Plus } from "lucide-react";
// import { motion } from "framer-motion";

// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import { Button } from "../components/ui/button";
// import { Textarea } from "../components/ui/textarea";
// import NoticeContent from "../components/notices/NoticeContent";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "../components/ui/dialog";
// import { useSelector } from "react-redux";
// import ApiFunction from "../services/ApiFunction";

// const containerVariants = {
//     hidden: {},
//     show: {
//         transition: {
//             staggerChildren: 0.1, // controls delay between children
//         },
//     },
// };

// const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
// };

// const NoticeBoard = () => {
//     const role = useSelector((state) => state.user.role); // Get role from Redux store

//     useEffect(() => {
//         // Call the showNotices API when the component mounts
//         const fetchNotices = async () => {
//             try {
//                 const response = await ApiFunction.showNotice();
//                 if (response && response.data) {
//                     setNotices(response.data); // Assuming the API response has a `data` field with the notices
//                 }
//             } catch (error) {
//                 console.error("Error fetching notices:", error);
//             }
//         };

//         fetchNotices();
//     }, []); // Empty dependency array ensures this runs once on mount

//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         file: null,
//     });

//     const formChanges = (e) => {
//         const { name, value, files } = e.target;

//         setFormData((prev) => ({
//             ...prev,
//             [name]: files ? files[0] : value,
//         }));
//     };

//     const noticeSubmit = async (e) => {
//         e.preventDefault();
//         console.log(formData);
//         await ApiFunction.uploadNotice(formData);
//     };

//     return (
//         <>
//             <div className="p-6 flex-col flex gap-4">
//                 <motion.div
//                     className="flex flex-row items-center justify-between pb-2"
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                 >
//                     <h1 className="text-3xl font-bold">Notice Board</h1>

//                     {/* Only show the "Create Notice" button if the user is HOD */}
//                     {role === "hod" && (
//                         <Dialog>
//                             <DialogTrigger>
//                                 <Button
//                                     variant="outline"
//                                     className="flex flex-row items-center justify-center"
//                                 >
//                                     <Plus />
//                                     <span>Create Notice</span>
//                                 </Button>
//                             </DialogTrigger>
//                             <DialogContent>
//                                 <DialogHeader>
//                                     <DialogTitle>
//                                         Create a new notice
//                                     </DialogTitle>
//                                     <DialogDescription>
//                                         <form
//                                             onSubmit={noticeSubmit}
//                                             className="mt-6 flex flex-col gap-5"
//                                         >
//                                             <div>
//                                                 <Label htmlFor="title">
//                                                     Notice title
//                                                 </Label>
//                                                 <Input
//                                                     id="title"
//                                                     name="title"
//                                                     type="text"
//                                                     value={formData.title}
//                                                     onChange={formChanges}
//                                                 />

//                                                 <Label htmlFor="description">
//                                                     Notice description
//                                                 </Label>
//                                                 <Textarea
//                                                     id="description"
//                                                     name="description"
//                                                     value={formData.description}
//                                                     onChange={formChanges}
//                                                     rows={6}
//                                                 />

//                                                 <Label htmlFor="doc">
//                                                     Upload notice
//                                                 </Label>
//                                                 <Input
//                                                     id="doc"
//                                                     name="file"
//                                                     type="file"
//                                                     accept=".pdf"
//                                                     onChange={formChanges}
//                                                 />
//                                             </div>
//                                             <Button
//                                                 variant={"default"}
//                                                 className="w-full bg-slate-900"
//                                             >
//                                                 Create
//                                             </Button>
//                                         </form>
//                                     </DialogDescription>
//                                 </DialogHeader>
//                             </DialogContent>
//                         </Dialog>
//                     )}
//                 </motion.div>

//                 <motion.div
//                     className="flex flex-col gap-3"
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="show"
//                 >
//                     {Array.from({ length: 10 }).map((_, index) => (
//                         <motion.div variants={itemVariants} key={index}>
//                             <NoticeContent />
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             </div>
//         </>
//     );
// };

// export default NoticeBoard;
