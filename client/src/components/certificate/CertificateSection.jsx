import { useState } from "react";
import { useSelector } from "react-redux";
import CertificateForm from "./CertificateForm";
import CertificateList from "./CertificateList";

const CertificateSection = () => {
    const role = useSelector((state) => state.user.role);
    const isExternal = role === "external";
    const isHod = role === "hod";

    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => setShowForm((prev) => !prev);

    const showSideBySide = isExternal && showForm;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-primary">
                    Certificate Requests
                </h1>
                <div className="flex w-full  justify-between items-center pr-5">
                    <p className="text-gray-600">
                        {isExternal
                            ? "Request certificates for external purposes"
                            : "Manage certificate requests from external users"}
                    </p>

                    {isExternal && (
                        <button
                            onClick={toggleForm}
                            className="cursor-pointer mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-all"
                        >
                            {showForm
                                ? "Hide Request Form"
                                : "New Certificate Request"}
                        </button>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className={`${showSideBySide ? "flex gap-6" : ""} w-full`}>
                {/* Form - only if external and toggled */}
                {isExternal && showForm && (
                    <div className="w-full md:w-1/2">
                        <CertificateForm />
                    </div>
                )}

                {/* List - takes full width if not side-by-side, half if side-by-side */}
                <div
                    className={`${
                        showSideBySide ? "w-full md:w-1/2" : "w-full"
                    }`}
                >
                    <CertificateList />
                </div>
            </div>
        </div>
    );
};

export default CertificateSection;
