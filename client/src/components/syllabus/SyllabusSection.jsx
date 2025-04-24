import { useState } from 'react';
import store from '../../redux/Store';
import SyllabusForm from './SyllabusForm';
import SyllabusList from './SyllabusList';

const SyllabusSection = () => {
  // import store from '../../redux/Store';
  const { role } = store.getState().user;
  const isHod = role === 'hod';

  const [showForm, setShowForm] = useState(false);
  const [editSyllabus, setEditSyllabus] = useState(null);

  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
    setEditSyllabus(null); // Reset edit state when toggling form
  };

  const handleEdit = (syllabus) => {
    setEditSyllabus(syllabus);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditSyllabus(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="w-[30rem]">
          <h1 className="text-2xl font-bold text-primary">Syllabus </h1>
          {/* <p className="text-gray-600">Upload and manage course syllabi</p> */}
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
            <SyllabusForm
              edit={!!editSyllabus}
              syllabusData={editSyllabus}
              onClose={handleCloseForm}
            />
          </div>
        )}

        <div className={isHod && showForm ? 'md:w-1/2' : 'w-full'}>
          <SyllabusList onEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
};

export default SyllabusSection;