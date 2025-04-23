import React, { useState } from "react";

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
// import React, { useState } from "react";
// Keep rest of your imports...

const NoticeContent = ({ title, description, media, user, department }: Props) => {
    const [pdfFailed, setPdfFailed] = useState(false);

    const isPdf = media[0]?.url.endsWith(".pdf");

    return (
        <Card className="flex-row flex items-start justify-between shadow-sm">
            <div className="w-full">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-justify line-clamp-3">
                        {description}
                    </CardDescription>
                </CardHeader>
                <CardContent />
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

                            {isPdf ? (
                                !pdfFailed ? (
                                    <iframe
                                        src={media[0].url}
                                        title="PDF Preview"
                                        className="w-full h-[500px] border rounded"
                                        onError={() => setPdfFailed(true)}
                                    />
                                ) : (
                                    <div className="text-center p-4">
                                        <p className="text-red-500 font-semibold">
                                            Failed to load PDF document.
                                        </p>
                                        <a
                                            href={media[0].url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            Open PDF in new tab
                                        </a>
                                    </div>
                                )
                            ) : (
                                <img
                                    src={media[0].url}
                                    alt="Notice Attachment"
                                    className="w-full max-h-[500px] object-contain border rounded"
                                />
                            )}
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
