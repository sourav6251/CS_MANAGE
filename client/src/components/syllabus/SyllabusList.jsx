import { useEffect, useState } from 'react';
import { Eye, X, Download, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { formatDate } from '../../lib/utils';
import store from '../../redux/Store';
import ApiFunction from '../services/ApiFunction';

const SyllabusList = ({ onEdit }) => {
  const { role } = store.getState().user;
  const isHod = role === 'hod';

  const [syllabi, setSyllabi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('All Semesters');
  const [viewingSyllabus, setViewingSyllabus] = useState(null);

  useEffect(() => {
    const fetchSyllabi = async () => {
      try {
        const data = await ApiFunction.getSyllabi();
        setSyllabi(data);
      } catch (error) {
        toast.error('Failed to load syllabi');
      } finally {
        setLoading(false);
      }
    };
    fetchSyllabi();
  }, []);

  const filteredSyllabi = syllabi
    .filter(
      (s) =>
        semesterFilter === 'All Semesters' ||
        s.semester.toString() === semesterFilter.replace('Semester ', '')
    )
    .filter(
      (s) =>
        searchTerm === '' ||
        s.paperCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.paperName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleDelete = async (id) => {
    try {
      await ApiFunction.deleteSyllabus(id);
      setSyllabi((prev) => prev.filter((s) => s._id !== id));
      toast.success('Syllabus deleted successfully');
    } catch (error) {
      toast.error('Failed to delete syllabus');
    }
  };

  const ViewModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Syllabus Details</h3>
          <button
            onClick={() => setViewingSyllabus(null)}
            className="text-gray-500 hover:text-red-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {viewingSyllabus?.media?.[0]?.mediaUrl && (
          <>
            {viewingSyllabus.media[0].mediaUrl.endsWith('.pdf') ? (
              <iframe
                src={viewingSyllabus.media[0].mediaUrl}
                className="w-full h-[400px] border rounded"
                title="PDF Viewer"
              />
            ) : (
              <img
                src={viewingSyllabus.media[0].mediaUrl}
                alt="Syllabus Attachment"
                className="max-w-full max-h-[400px] rounded border"
              />
            )}
            <a
              href={viewingSyllabus.media[0].mediaUrl}
              download
              className="inline-flex items-center text-blue-600 hover:underline text-sm mt-2 p-4"
            >
              Download Attachment <Download className="ml-2 h-4 w-4" />
            </a>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="border border-gray-200 rounded-md shadow mb-6 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-lg font-semibold text-primary">Available Syllabi</h2>
        <div className="flex space-x-2 flex-wrap gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by code or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <select
            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
          >
            <option>All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
              <option key={semester}>Semester {semester}</option>
            ))}
          </select>
        </div>
      </div>

      {viewingSyllabus && <ViewModal />}

      <div className="p-4 overflow-x-auto">
        {loading ? (
          <div className="text-center py-8">
            <i className="fas fa-spinner fa-spin text-2xl text-blue-500"></i>
            <p className="mt-2 text-gray-600">Loading syllabi...</p>
          </div>
        ) : filteredSyllabi.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paper Code
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paper Title
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSyllabi.map((syllabus) => (
                <tr key={syllabus._id}>
                  <td className="px-4 py-3 whitespace-nowrap">Semester {syllabus.semester}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{syllabus.paperCode}</td>
                  <td className="px-4 py-3">{syllabus.paperName}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(syllabus.updatedAt)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setViewingSyllabus(syllabus)}
                        className="p-1 text-gray-600 hover:text-blue-600"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <a
                        href={syllabus.media?.[0]?.mediaUrl}
                        download
                        className="p-1 text-blue-500 hover:text-blue-700"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                      {isHod && (
                        <>
                          <button
                            onClick={() => onEdit(syllabus)}
                            className="p-1 text-green-600 hover:text-green-700"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(syllabus._id)}
                            className="p-1 text-red-600 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-8 text-gray-500">No syllabi found matching your criteria</p>
        )}
      </div>
    </div>
  );
};

export default SyllabusList;