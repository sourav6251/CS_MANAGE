import { useState } from 'react';
import { useSelector } from 'react-redux';
import { syllabi as initialSyllabi, semesters } from '../../data/mockData';
import { formatDate } from '../../lib/utils';
import { Download, Pencil, Trash2 } from 'lucide-react';

const SyllabusList = () => {
  const role = useSelector((state) => state.user.role);
  const isHod = role === 'hod';

  const [syllabi, setSyllabi] = useState(initialSyllabi);
  const [searchTerm, setSearchTerm] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('All Semesters');

  const filteredSyllabi = syllabi
    .filter((s) =>
      semesterFilter === 'All Semesters' ||
      s.semester.toString() === semesterFilter.replace('Semester ', '')
    )
    .filter((s) =>
      searchTerm === '' ||
      s.paperCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.paperTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleDelete = (id) => {
    setSyllabi((prev) => prev.filter((s) => s.id !== id));
    alert('Syllabus has been deleted successfully');
  };

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
              className="pl-8 pr-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <select
            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
          >
            <option>All Semesters</option>
            {semesters.map((semester) => (
              <option key={semester}>Semester {semester}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-4 overflow-x-auto">
        {filteredSyllabi.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paper Code</th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paper Title</th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSyllabi.map((syllabus) => (
                <tr key={syllabus.id}>
                  <td className="px-4 py-3 whitespace-nowrap">Semester {syllabus.semester}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{syllabus.paperCode}</td>
                  <td className="px-4 py-3">{syllabus.paperTitle}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(syllabus.uploadDate)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="p-1 text-secondary hover:text-blue-700" title="Download">
                        <Download className="h-4 w-4" />
                      </button>
                      {isHod && (
                        <>
                          <button className="p-1 text-primary hover:text-blue-900" title="Edit">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(syllabus.id)}
                            className="p-1 text-accent hover:text-red-700"
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
