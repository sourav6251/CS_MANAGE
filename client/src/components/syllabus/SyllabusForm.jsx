import { useState } from 'react';
import { semesters } from '../../data/mockData';

const SyllabusForm = () => {
  const [syllabus, setSyllabus] = useState({
    semester: '',
    paperCode: '',
    paperTitle: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSyllabus((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      setSyllabus((prev) => ({ ...prev, file: e.target.files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!syllabus.semester || !syllabus.paperCode || !syllabus.paperTitle) {
      alert('Please fill all required fields');
      return;
    }

    if (!syllabus.file) {
      alert('Please upload a syllabus PDF');
      return;
    }

    alert('Syllabus has been uploaded successfully');

    setSyllabus({
      semester: '',
      paperCode: '',
      paperTitle: '',
      file: null,
    });
  };

  return (
    <div className="border border-gray-200 rounded-md shadow mb-6 overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-primary">Upload New Syllabus</h2>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
                Semester
              </label>
              <select
                id="semester"
                name="semester"
                value={syllabus.semester}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="">Select Semester</option>
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>
                    Semester {semester}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="paperCode" className="block text-sm font-medium text-gray-700 mb-1">
                Paper Code
              </label>
              <input
                type="text"
                id="paperCode"
                name="paperCode"
                value={syllabus.paperCode}
                onChange={handleChange}
                placeholder="e.g. CS101"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div>
              <label htmlFor="paperTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Paper Title
              </label>
              <input
                type="text"
                id="paperTitle"
                name="paperTitle"
                value={syllabus.paperTitle}
                onChange={handleChange}
                placeholder="e.g. Introduction to Programming"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Syllabus PDF</label>
            <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
              <i className="fas fa-file-upload text-gray-400 text-2xl mb-2"></i>
              <p className="text-sm text-gray-500 mb-1">Drag & drop a PDF file or</p>
              <input
                type="file"
                id="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => document.getElementById('file').click()}
                className="px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
              >
                Browse Files
              </button>
              {syllabus.file && (
                <p className="mt-2 text-sm text-gray-600">Selected: {syllabus.file.name}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-400 hover:bg-blue-700  cursor-pointer text-white rounded-md hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <i className="fas fa-upload mr-1"></i> Upload Syllabus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SyllabusForm;
