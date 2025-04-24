import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import ApiFunction from "../services/ApiFunction";

const MemberExternal = () => {
  const { departmentid } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [externals, setExternals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExternals = async () => {
      setLoading(true);
      try {
        const externalData = await ApiFunction.getUsersByRole("external", departmentid);
        setExternals(externalData);
      } catch (error) {
        setError("Failed to load external members");
        toast.error("Failed to load external members");
      } finally {
        setLoading(false);
      }
    };
    if (departmentid) {
      fetchExternals();
    } else {
      setError("Department not found");
      setLoading(false);
    }
  }, [departmentid]);

  const filteredExternals = externals.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full h-fit mr-2 border border-gray-300 rounded-lg p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading external members...</p>
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
            List of all Externals
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
            {filteredExternals.length > 0 ? (
              filteredExternals.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.department}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.phone}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="border border-gray-300 px-4 py-4 text-center text-gray-400 italic">
                  No matching externals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberExternal;