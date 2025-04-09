import { formatDate } from '../../lib/utils';
import { MoreVertical, Pencil, Trash2, Download } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const NoticeCard = ({ notice, isHod, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef();

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow">
      <div className="p-4 bg-primary/5 border-b border-gray-200 flex justify-between items-start">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <i className="far fa-file-pdf text-accent text-lg"></i>
          </div>
          <div className="ml-3">
            <h4 className="font-medium">{notice.title}</h4>
            <p className="text-xs text-gray-500">Published: {formatDate(notice.publishDate)}</p>
          </div>
        </div>

        {isHod && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-gray-500 hover:text-primary p-1 rounded-full focus:outline-none"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button
                  className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100"
                  onClick={() => {
                    setMenuOpen(false);
                    // Future: handle edit
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </button>
                <button
                  className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(notice.id);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-600 mb-4">{notice.description}</p>
        <div className="flex justify-between items-center">
          <span
            className={`inline-block text-xs px-2 py-1 rounded-full
            ${notice.category === 'Examination'
                ? 'bg-blue-100 text-secondary'
                : notice.category === 'Meeting'
                ? 'bg-green-100 text-success'
                : notice.category === 'Registration'
                ? 'bg-yellow-100 text-warning'
                : 'bg-gray-100 text-gray-800'
              }`}
          >
            {notice.category}
          </span>
          <a
            href="#"
            className="text-sm text-secondary hover:underline flex items-center"
          >
            <span>Download</span>
            <Download className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
