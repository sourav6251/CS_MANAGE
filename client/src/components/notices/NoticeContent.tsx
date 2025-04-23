import React from "react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";

import { Button } from "../ui/button";
import { DownloadCloud, Edit3, Eye, Trash2 } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

type Props = {
    title: string;
    description: string;
    media: { url: string; id: string }[];
    user: string;
    department: string;
};

const NoticeContent = ({ title, description, media, user, department }: Props) => {
    return (
        <Card className="flex-row flex items-start justify-between shadow-sm">
            <div className="w-full">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-justify line-clamp-3">
                        {description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm font-semibold">Uploaded by: {user}</p>
                    <p className="text-sm">Department: {department}</p>
                    {(media?.length ?? 0) > 0 && (
                        <a
                            href={media[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            View Attachment
                        </a>
                    )}

                </CardContent>
            </div>
            <CardFooter className="py-3 px-3 flex-col gap-3">
                <Sheet>
                    <SheetTrigger>
                        <Button
                            variant={"outline"}
                            className="border-green-600 dark:border-green-500 rounded-full"
                        >
                            <Eye className="text-xl" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>{title}</SheetTitle>
                            <SheetDescription>{description}</SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                <Button
                    variant={"outline"}
                    className="border-green-600 dark:border-green-500 rounded-full"
                >
                    <DownloadCloud />
                </Button>
                <Button
                    variant={"outline"}
                    className="border-green-600 dark:border-green-500 rounded-full"
                >
                    <Edit3 />
                </Button>
                <Button
                    variant={"destructive"}
                    className="border-red-600 dark:border-red-500 rounded-full"
                >
                    <Trash2 />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default NoticeContent;
