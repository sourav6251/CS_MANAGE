import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import ApiFunction from "../services/ApiFunction";

const MemberFaculty = () => {
  const [search, setSearch] = useState("");
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      setLoading(true);
      try {
        const facultyData = await ApiFunction.getUsersByRole("faculty");
        setFaculty(facultyData);
      } catch (error) {
        setError("Failed to load faculty members");
        toast.error("Failed to load faculty members");
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  const filteredFaculty = faculty.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full h-fit mr-2 border border-gray-300 rounded-lg p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading faculty...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-fit mr-2 border border-gray-300 rounded-lg p-4 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-fit mr-2 border border-gray-300 rounded-lg p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <caption className="caption-top text-left text-sm mb-2 text-gray-600">
            List of all Faculty
          </caption>
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">Department</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Phone No</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaculty.length > 0 ? (
              filteredFaculty.map((f, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{f.department}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{f.name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{f.phone}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{f.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="border border-gray-300 px-4 py-4 text-center text-gray-400 italic">
                  No matching faculty found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberFaculty;