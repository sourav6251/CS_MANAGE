import { useState } from 'react';
import { useSelector } from 'react-redux';
import SyllabusForm from './SyllabusForm';
import SyllabusList from './SyllabusList';

const SyllabusSection = () => {
  const role = useSelector((state) => state.user.role);
  const isHod = role === 'hod';

  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => setShowForm(prev => !prev);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className='w-[30rem]'>
          <h1 className="text-2xl font-bold text-primary">Syllabus Management</h1>
          <p className="text-gray-600">Upload and manage course syllabi</p>
        </div>

        {isHod && (
          <button
            onClick={handleToggleForm}
            className="px-4 py-2 bg-blue-400 text-white rounded-md cursor-pointer transition duration-300 hover:bg-blue-800 hover:shadow-md hover:scale-[1.02]"

          >
            {showForm ? 'Hide Form' : 'Upload Syllabus'}
          </button>
        )}
      </div>

      <div className={`flex flex-col ${isHod && showForm ? 'md:flex-row gap-6' : ''}`}>
        {isHod && showForm && (
          <div className="md:w-1/2">
            <SyllabusForm />
          </div>
        )}

        <div className={isHod && showForm ? 'md:w-1/2' : 'w-full'}>
          <SyllabusList />
        </div>
      </div>
    </div>
  );
};

export default SyllabusSection;
