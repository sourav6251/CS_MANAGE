import { useEffect, useState } from "react";
import ApiFunction from "../services/ApiFunction";
import { toast } from "sonner";

const NoticeForm = ({ edit, noticeData, onSuccess }) => {
    const [notice, setNotice] = useState({
        title: "",
        description: "",
        publishDate: new Date().toISOString().split("T")[0],
        file: null,
    });

    useEffect(() => {
        if (edit && noticeData) {
            setNotice({
                title: noticeData.title,
                description: noticeData.description,
                publishDate: noticeData.createdAt.split("T")[0],
                file: noticeData.file,
            });
        }
    }, [edit, noticeData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotice((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files?.length) {
            setNotice((prev) => ({ ...prev, file: e.target.files[0] }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!notice.title.trim()) {
            toast.error("Please enter a notice title");
            return;
        }
        console.log(FormData);

        try {
            // const formData = new FormData();
            // formData.append('title', notice.title);
            // formData.append('description', notice.description);
            // formData.append('date', notice.publishDate);
            // if (notice.file) {
            //   formData.append('file', notice.file);
            // }
            // setNotice({
            //   title:'',
            //   description:'',
            //   file:
            // })
            console.log(notice);

            if (edit) {
                await ApiFunction.updateNotice(noticeData._id, notice);
                toast.success("Notice updated successfully");
            } else {
                await ApiFunction.uploadNotice(notice);
                toast.success("Notice published successfully");
            }

            onSuccess?.();
            setNotice({
                title: "",
                description: "",
                publishDate: new Date().toISOString().split("T")[0],
                file: null,
            });
        } catch (error) {
            toast.error(`Failed to ${edit ? "update" : "publish"} notice`);
            console.error(error);
        }
    };

    return (
        <div className="rounded-lg shadow-md border border-gray-200 bg-white">
            <div className="px-6 py-4 border-b bg-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">
                    {edit ? "✏️ Edit Notice" : "📢 Add New Notice"}
                </h2>
            </div>
            <div className="px-6 py-5">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label
                                htmlFor="title"
                                className="block mb-2 text-sm font-medium text-gray-700"
                            >
                                Notice Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={notice.title}
                                onChange={handleChange}
                                placeholder="Enter notice title"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="publishDate"
                                className="block mb-2 text-sm font-medium text-gray-700"
                            >
                                Publish Date
                            </label>
                            <input
                                type="date"
                                id="publishDate"
                                name="publishDate"
                                value={notice.publishDate}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={notice.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Enter notice details"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Attachment (PDF/Image)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center bg-gray-50">
                            <i className="fas fa-file-upload text-3xl text-gray-400 mb-2"></i>
                            <p className="text-sm text-gray-600">
                                {edit
                                    ? "Upload new file to update"
                                    : "Drag & drop or select a file"}
                            </p>
                            <input
                                type="file"
                                id="file"
                                onChange={handleFileChange}
                                className="hidden"
                                accept=".pdf,.jpg,.jpeg,.png"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    document.getElementById("file").click()
                                }
                                className="mt-2 px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Browse Files
                            </button>
                            {notice.file && (
                                <p className="mt-2 text-sm text-blue-600">
                                    {typeof notice.file === "string"
                                        ? `Current file: ${notice.file
                                              .split("/")
                                              .pop()}`
                                        : `Selected: ${notice.file.name}`}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            {edit ? "Update Notice" : "Publish Notice"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoticeForm;
