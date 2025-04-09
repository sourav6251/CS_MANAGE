import { useState } from 'react';
import { generateId } from '../../lib/utils';

const NoticeForm = () => {
  const [notice, setNotice] = useState({
    title: '',
    description: '',
    publishDate: new Date().toISOString().split('T')[0],
    category: 'General',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotice((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      setNotice((prev) => ({ ...prev, file: e.target.files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!notice.title.trim()) {
      alert('Please enter a notice title');
      return;
    }

    // Simulate success
    alert('Notice has been published successfully');

    // Reset form
    setNotice({
      title: '',
      description: '',
      publishDate: new Date().toISOString().split('T')[0],
      category: 'General',
      file: null,
    });
  };

  return (
    <div className="border-0 rounded-md overflow-hidden shadow mb-6">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-primary">Add New Notice</h2>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Notice Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={notice.title}
                onChange={handleChange}
                placeholder="Enter notice title"
                className="w-full px-3 py-2 border-0 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div>
              <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700 mb-1">
                Publish Date
              </label>
              <input
                type="date"
                id="publishDate"
                name="publishDate"
                value={notice.publishDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border-0 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={notice.description}
              onChange={handleChange}
              rows="3"
              placeholder="Enter notice details"
              className="w-full px-3 py-2 border-0 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={notice.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border-0 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="General">General</option>
              <option value="Examination">Examination</option>
              <option value="Meeting">Meeting</option>
              <option value="Registration">Registration</option>
              <option value="Admission">Admission</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attachment (PDF)
            </label>
            <div className="border-0 border-dashed border-gray-300 rounded-md p-4 text-center">
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
              {notice.file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {notice.file.name}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="cursor-pointer px-4 bg-blue-400 py-2 bg-secondary text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <i className="fas fa-plus mr-1"></i> Publish Notice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoticeForm;
