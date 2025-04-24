import { useState } from "react";
import { useSelector } from "react-redux";
import MeetingForm from "./MeetingForm";
import MeetingList from "./MeetingList";

import store from "../../redux/Store";
const MeetingSection = () => {
    const { role } = store.getState().user;
    const isHod = role === "hod";
    const [showForm, setShowForm] = useState(false);

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Meetings
                    </h1>
                    <p className="text-gray-600">
                        {isHod
                            ? "Schedule and manage faculty meetings"
                            : "View your upcoming meetings"}
                    </p>
                </div>
                {isHod && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        {showForm ? "Hide Form" : "New Meeting"}
                    </button>
                )}
            </div>

            {isHod && showForm ? (
                <div className="grid gap-6 lg:grid-cols-2">
                    <MeetingForm onClose={handleCloseForm} />
                    <MeetingList />
                </div>
            ) : (
                <MeetingList />
            )}
        </div>
    );
};

export default MeetingSection;
