import { useSelector } from 'react-redux';
import { useState } from 'react';
import NoticeForm from './NoticeForm';
import NoticeList from './NoticeList';
import store from '../../redux/Store';


const NoticeBoard = () => {
  const { userid, departmentid,role } = store.getState().user;
  // const roles = useSelector((state) => state.user.role);
  const isHod = role === 'hod';
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);

  return (
    <div>
      <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <div className='w-[30rem]'>
          <h1 className="text-2xl font-bold text-primary">Notice Board</h1>
          <p className="text-gray-600">Manage department notices and announcements</p>
        </div>

        {isHod && (
          <button
            onClick={() => {
              setShowForm(prev => !prev);
              setEditingNotice(null);
            }}
            className="px-4 py-2 bg-[#3868a0] text-white h-10 w-[10rem] rounded-md hover:bg-secondary/90 transition-colors"
          >
            {showForm ? 'Hide Form' : 'Publish Notice'}
          </button>
        )}
      </div>

      <div className={`flex flex-col ${isHod && showForm ? 'md:flex-row gap-6' : ''}`}>
        {isHod && showForm && (
          <div className="md:w-1/2">
            <NoticeForm 
              edit={!!editingNotice}
              noticeData={editingNotice}
              onSuccess={() => {
                setShowForm(false);
                setEditingNotice(null);
              }}
            />
          </div>
        )}

        <div className={`${isHod && showForm ? 'md:w-1/2' : 'w-full'}`}>
          <NoticeList onEditNotice={(notice) => {
            setEditingNotice(notice);
            setShowForm(true);
          }} />
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;