import { useSelector } from 'react-redux';
import RoutineForm from './RoutineForm';
import TimeTable from './TimeTable';
import { useState } from 'react';
import store from '../../redux/Store';

const RoutineSection = () => {
  const { role } = store.getState().user;
  const isHod = role === 'hod';

  const [showForm, setShowForm] = useState(false);
  const [editRoutine, setEditRoutine] = useState(null);

  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
    setEditRoutine(null);
  };

  const handleEdit = (routine) => {
    setEditRoutine(routine);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditRoutine(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Class Routine</h1>
          <p className="text-gray-600">
            {isHod ? 'Manage class schedules and routines' : 'View your class schedules'}
          </p>
        </div>
        {isHod && (
          <button
            onClick={handleToggleForm}
            className="px-4 py-2 bg-blue-400 text-white rounded-md cursor-pointer transition duration-300 hover:bg-blue-800 hover:shadow-md hover:scale-[1.02]"
          >
            {showForm ? 'Hide Form' : 'Add Routine'}
          </button>
        )}
      </div>

      {isHod && showForm && (
        <RoutineForm
          edit={!!editRoutine}
          routineData={editRoutine}
          onClose={handleCloseForm}
        />
      )}
      <TimeTable onEdit={handleEdit} />
    </div>
  );
};

export default RoutineSection;