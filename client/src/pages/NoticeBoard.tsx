import React from "react";

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
                                <DialogTitle>Create a new notice</DialogTitle>
                                <DialogDescription>
                                    <form className="mt-6 flex flex-col gap-5">
                                        <div>
                                            <Label htmlFor="title">
                                                Notice title
                                            </Label>
                                            <Input id="title" type="text" />
                                            <Label htmlFor="description">
                                                Notice description
                                            </Label>
                                            <Textarea
                                                id="description"
                                                rows={6}
                                            />
                                            <Label htmlFor="doc">
                                                Upload notice
                                            </Label>
                                            <Input
                                                id="doc"
                                                type="file"
                                                accept=".pdf"
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
                </motion.div>

                <motion.div
                    className="flex flex-col gap-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {Array.from({ length: 10 }).map((_, index) => (
                        <motion.div variants={itemVariants} key={index}>
                            <NoticeContent />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </>
    );
};

export default NoticeBoard;
