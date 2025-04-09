import { useSelector } from 'react-redux';
import { useState } from 'react';
import NoticeCard from './NoticeCard';
import { notices as initialNotices, noticeCategories } from '../../data/mockData';

const NoticeList = () => {
  const role = useSelector((state) => state.user.role);
  const isHod = role === 'hod';

  const [notices, setNotices] = useState(initialNotices);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Notices');

  const filteredNotices = notices
    .filter(notice => categoryFilter === 'All Notices' || notice.category === categoryFilter)
    .filter(notice =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleDeleteNotice = (id) => {
    setNotices(notices.filter(notice => notice.id !== id));
    alert('Notice deleted successfully.');
  };

  return (
    <div className="border-0 rounded-md overflow-hidden shadow">
      <div className="p-4 border-b flex justify-between items-center flex-wrap gap-2 bg-gray-50">
        <h2 className="text-lg font-semibold text-primary">Published Notices</h2>
        <div className="flex flex-wrap gap-2">
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
          <select
            className="px-3 py-1 border-0 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {noticeCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-4">
      {filteredNotices.length > 0 ? (
  <div
    className={`space-y-4 ${
      filteredNotices.length > 1 ? 'overflow-y-auto  pr-2' : ''
    }`}
  >
    {filteredNotices.map(notice => (
      <NoticeCard
        key={notice.id}
        notice={notice}
        isHod={isHod}
        onDelete={handleDeleteNotice}
      />
    ))}
  </div>
) : (
  <p className="text-center py-8 text-gray-500">No notices found matching your criteria</p>
)}

        {/* {filteredNotices.length > 0 && (
          <div className="flex justify-center mt-6">
            <nav className="flex items-center">
              <button className="px-2 py-1 border-0 border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-50">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="px-3 py-1 border-t border-b border-gray-300 bg-secondary text-white">1</button>
              <button className="px-3 py-1 border-t border-b border-gray-300 text-gray-600 hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border-t border-b border-gray-300 text-gray-600 hover:bg-gray-50">3</button>
              <button className="px-2 py-1 border-0 border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-50">
                <i className="fas fa-chevron-right"></i>
              </button>
            </nav>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default NoticeList;
