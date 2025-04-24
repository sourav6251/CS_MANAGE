import { formatDate } from '../../lib/utils';
import { MoreVertical, Pencil, Trash2, Download, Eye, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ApiFunction from '../services/ApiFunction';

const NoticeCard = ({ notice, isHod, onDelete, onEdit }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const dropdownRef = useRef();
console.log(notice.media[0]?.url);
console.log(notice);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = async (e) => {
    try {
        await ApiFunction.deleteNotice(e);
        toast.success("Deleted successfull")
    } catch (error) {
        throw new error("somthing wrong");
    }
};
  return (
    <>
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow">
        <div className="p-4 bg-primary/5 border-b border-gray-200 flex justify-between items-start">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <i className={`far ${notice.file?.endsWith('.pdf') ? 'fa-file-pdf' : 'fa-image'} text-accent text-lg`}></i>
            </div>
            <div className="ml-3">
              <h4 className="font-medium">{notice.title}</h4>
              <p className="text-xs text-gray-500">Published: {formatDate(notice.createdAt)}</p>
            </div>
          </div>

          {isHod && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMenuOpen(prev => !prev)}
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
                      onEdit(notice);
                    }}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </button>
                  <button
                    className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setMenuOpen(false);
                      handleDelete(notice._id);
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
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{notice.description}</p>
          <div className="flex justify-between items-center">
            <button
              onClick={() => setViewMode(true)}
              className="text-sm text-blue-600 hover:underline flex items-center"
            >
              <Eye className="mr-1 h-4 w-4" />
              View
            </button>
            <a
              href={notice.file}
              download
              className="text-sm text-secondary hover:underline flex items-center"
            >
              <span>Download</span>
              <Download className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {viewMode && (
        <div className="fixed inset-0 bg-black/40 z-30 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg overflow-hidden relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-500"
              onClick={() => setViewMode(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-primary mb-2">{notice.title}</h2>
              <p className="text-sm text-gray-500 mb-1">
                Published on: {formatDate(notice.createdAt)}
              </p>
              <p className="text-gray-700 text-sm whitespace-pre-line mb-4">
                {notice.description}
              </p>

              {notice.media[0]?.url && (
                <>
                  {notice.media[0]?.url.endsWith(".pdf") ? (
                    <iframe
                      src={notice.file}
                      className="w-full h-[400px] border rounded"
                      title="PDF Viewer"
                    />
                  ) : (
                    <img
                      src={notice.media[0]?.url}
                      alt="Notice Attachment"
                      className="max-w-full max-h-[400px] rounded border"
                    />
                  )}
                  <a
                    href={notice.media[0]?.url}
                    download
                    className="inline-flex items-center text-blue-600 hover:underline text-sm mt-2"
                  >
                    Download Attachment <Download className="ml-2 h-4 w-4" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoticeCard;