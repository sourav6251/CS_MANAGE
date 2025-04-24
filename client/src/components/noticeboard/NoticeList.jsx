import { useEffect, useState } from "react";
import NoticeCard from "./NoticeCard";
import ApiFunction from "../services/ApiFunction";
import { toast } from "sonner";
import store from "../../redux/Store";

const NoticeList = ({ onEditNotice }) => {
  const { role } = store.getState().user;
  const isHod = role === "hod";
  const [notices, setNotices] = useState([]); // Always initialize as array
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteNotice = async (id) => {
    try {
      await ApiFunction.deleteNotice(id);
      setNotices((prev) => prev.filter((notice) => notice._id !== id));
      toast.success("Notice deleted successfully");
    } catch (error) {
      toast.error("Failed to delete notice");
      console.error("Delete notice error:", error);
    }
  };

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await ApiFunction.showNotice();
        // Ensure data is an array; fallback to empty array if not
        setNotices(Array.isArray(data) ? data : []);
      } catch (error) {
        setError("Failed to load notices");
        toast.error("Failed to load notices");
        setNotices([]); // Reset to empty array on error
        console.error("Fetch notices error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  if (loading) {
    return (
      <div className="border-0 rounded-md overflow-hidden shadow p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading notices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-0 rounded-md overflow-hidden shadow p-4 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="border-0 rounded-md overflow-hidden shadow">
      <div className="p-4 border-b flex justify-between items-center flex-wrap gap-2 bg-gray-50">
        <h2 className="text-lg font-semibold text-primary">Published Notices</h2>
        <div className="relative">
          <input
            type="text"
            className="pl-8 pr-3 py-1 border-0 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            placeholder="Search notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>

      <div className="p-4">
        {filteredNotices.length > 0 ? (
          <div className="space-y-4">
            {filteredNotices.map((notice) => (
              <NoticeCard
                key={notice._id}
                notice={notice}
                isHod={isHod}
                onDelete={handleDeleteNotice}
                onEdit={onEditNotice}
              />
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-500">No notices found</p>
        )}
      </div>
    </div>
  );
};

export default NoticeList;