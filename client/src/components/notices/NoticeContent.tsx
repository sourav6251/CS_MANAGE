import React from "react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../components/ui/sheet";

import { Button } from "../../components/ui/button";
import { DownloadCloud, Edit3, Eye, Trash2 } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";

type Props = {};

const NoticeContent = (props: Props) => {
    return (
        <Card className="flex-row flex items-start justify-between shadow-sm">
            <div className="w-full">
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription className="text-justify line-clamp-3">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Ad laboriosam, ipsam libero reprehenderit facilis
                        assumenda nesciunt molestias, tempore optio numquam
                        asperiores ea iusto repellat sequi, enim facere ipsa
                        doloremque voluptatum quod ipsum! Tempore pariatur
                        delectus accusantium soluta ipsam vitae. Numquam placeat
                        culpa ipsum eaque doloremque ducimus fugit doloribus
                        illo laboriosam nobis officia eos, libero totam alias
                        unde possimus iusto nam eveniet. Earum minima eum quam
                        nemo maxime ex? Adipisci odio voluptatum earum molestiae
                        deleniti blanditiis pariatur tempore, sed optio itaque?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
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
                            <SheetTitle>Are you absolutely sure?</SheetTitle>
                            <SheetDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                            </SheetDescription>
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
