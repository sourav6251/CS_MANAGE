import { useEffect, useState } from 'react';
import { semesters } from '../../data/mockData';
import { toast } from 'sonner';
import ApiFunction from '../services/ApiFunction';

const RoutineForm = ({ edit = false, routineData, onClose }) => {
  const [routine, setRoutine] = useState({
    _id: '',
    semester: '',
    paperCode: '',
    paperTitle: '',
    startTime: '',
    endTime: '',
    room: '',
    days: [],
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    if (edit && routineData) {
      setRoutine({
        _id: routineData._id || '',
        semester: routineData.semester || '',
        paperCode: routineData.schedules?.[0]?.timeSlots?.[0]?.paperCode || '',
        paperTitle: routineData.paperTitle || '',
        startTime: routineData.schedules?.[0]?.timeSlots?.[0]?.startTime || '',
        endTime: routineData.schedules?.[0]?.timeSlots?.[0]?.endTime || '',
        room: routineData.roomNo || '',
        days: routineData.schedules?.map((s) => s.dayName) || [],
      });
    }
  }, [edit, routineData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoutine((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = (day) => {
    setRoutine((prev) => {
      const updatedDays = prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day];
      return { ...prev, days: updatedDays };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !routine.semester ||
      !routine.paperCode ||
      !routine.startTime ||
      !routine.endTime ||
      !routine.room ||
      routine.days.length === 0
    ) {
      toast.error('Please fill all required fields');
      return;
    }

    if (routine.startTime >= routine.endTime) {
      toast.error('Start time must be before end time');
      return;
    }

    try {
      if (edit) {
        await ApiFunction.updateRoutine(routine._id, routine);
        toast.success('Routine updated successfully');
      } else {
        await ApiFunction.createRoutine(routine);
        toast.success('Routine created successfully');
      }
      setRoutine({
        _id: '',
        semester: '',
        paperCode: '',
        paperTitle: '',
        startTime: '',
        endTime: '',
        room: '',
        days: [],
      });
      onClose();
    } catch (error) {
      toast.error(`Failed to ${edit ? 'update' : 'create'} routine`);
    }
  };

  return (
    <div className="border border-gray-300 rounded-md shadow p-6 mb-6">
      <h2 className="text-lg font-semibold text-primary mb-4">
        {edit ? 'Edit Class Schedule' : 'Add New Class Schedule'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
            <select
              name="semester"
              value={routine.semester}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="">Select Semester</option>
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paper Code</label>
            <input
              type="text"
              name="paperCode"
              value={routine.paperCode}
              onChange={handleChange}
              placeholder="e.g. CS101"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paper Title</label>
            <input
              type="text"
              name="paperTitle"
              value={routine.paperTitle}
              onChange={handleChange}
              placeholder="e.g. Introduction to Programming"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={routine.startTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
            <input
              type="time"
              name="endTime"
              value={routine.endTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
            <input
              type="text"
              name="room"
              value={routine.room}
              onChange={handleChange}
              placeholder="e.g. Room 101"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Days</label>
          <div className="flex flex-wrap gap-4">
            {days.map((day) => (
              <label key={day} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={routine.days.includes(day)}
                  onChange={() => handleDayToggle(day)}
                  className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <i className="fas fa-plus mr-1"></i> {edit ? 'Update Routine' : 'Add to Routine'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoutineForm;