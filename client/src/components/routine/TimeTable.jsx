import { useEffect, useState } from 'react';
import { semesters } from '../../data/mockData';
import { formatTime } from '../../lib/utils';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import ApiFunction from '../services/ApiFunction';
import store from '../../redux/Store';

const TimeTable = ({ onEdit }) => {
  const { role } = store.getState().user;
  const isHod = role === 'hod';


  const [semesterFilter, setSemesterFilter] = useState(1);
  const [routines, setRoutines] = useState([]); // Ensure initial state is an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const data = await ApiFunction.getRoutines();
        // Ensure data is an array, fallback to empty array if undefined/null
        setRoutines(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error('Failed to load routines');
        setRoutines([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchRoutines();
  }, []);

  // Ensure routines is an array before filtering
  const filteredRoutines = (Array.isArray(routines) ? routines : [])
    .filter((routine) => routine.semester === semesterFilter)
    .flatMap((routine) =>
      routine.schedules.map((schedule) => ({
        _id: routine._id,
        semester: routine.semester,
        day: schedule.dayName,
        paperCode: schedule.timeSlots[0].paperCode,
        paperTitle: routine.paperTitle || '',
        startTime: schedule.timeSlots[0].startTime,
        endTime: schedule.timeSlots[0].endTime,
        room: routine.roomNo,
      }))
    );

  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getClassForTimeSlot = (day, timeSlot) => {
    return filteredRoutines.find(
      (routine) =>
        routine.day === day &&
        routine.startTime <= timeSlot &&
        routine.endTime > timeSlot
    );
  };

  const getClassDuration = (routine) => {
    if (!routine) return 1;
    const startIndex = timeSlots.findIndex((slot) => slot === routine.startTime);
    const endIndex = timeSlots.findIndex((slot) => slot === routine.endTime);
    if (startIndex === -1 || endIndex === -1) return 1;
    return endIndex - startIndex;
  };

  const shouldRenderCell = (day, timeSlot, index) => {
    const prevTimeSlot = index > 0 ? timeSlots[index - 1] : null;
    const currentClass = getClassForTimeSlot(day, timeSlot);
    const prevClass = prevTimeSlot ? getClassForTimeSlot(day, prevTimeSlot) : null;
    if (!currentClass || !prevTimeSlot) return true;
    return currentClass !== prevClass;
  };

  const handleDelete = async (id) => {
    try {
      await ApiFunction.deleteRoutine(id);
      setRoutines((prev) => prev.filter((r) => r._id !== id));
      toast.success('Routine deleted successfully');
    } catch (error) {
      toast.error('Failed to delete routine');
    }
  };

  return (
    <div className="rounded-md shadow-sm border border-gray-200 overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
        <h2 className="text-lg font-semibold text-primary">Weekly Class Schedule</h2>
        <select
          className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(Number(e.target.value))}
        >
          {semesters.map((semester) => (
            <option key={semester} value={semester}>
              Semester {semester}
            </option>
          ))}
        </select>
      </div>
      <div className="p-4 overflow-x-auto bg-white">
        {loading ? (
          <div className="text-center py-8">
            <i className="fas fa-spinner fa-spin text-2xl text-blue-500"></i>
            <p className="mt-2 text-gray-600">Loading routines...</p>
          </div>
        ) : filteredRoutines.length > 0 ? (
          <table className="min-w-full border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Time / Day
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    className="border border-gray-200 px-4 py-2 text-left"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((timeSlot, index) => (
                <tr key={timeSlot}>
                  <td className="border border-gray-200 px-4 py-2 whitespace-nowrap bg-gray-50 font-medium">
                    {formatTime(timeSlot)} -{' '}
                    {formatTime(timeSlots[index + 1] || '18:00')}
                  </td>
                  {days.map((day) => {
                    const classData = getClassForTimeSlot(day, timeSlot);
                    if (!shouldRenderCell(day, timeSlot, index)) return null;

                    return (
                      <td
                        key={`${day}-${timeSlot}`}
                        className={`border border-gray-200 ${
                          classData ? 'bg-blue-50' : ''
                        }`}
                        rowSpan={classData ? getClassDuration(classData) : 1}
                      >
                        {classData && (
                          <div className="p-2">
                            <div className="font-medium text-secondary">
                              {classData.paperCode}
                            </div>
                            <div className="text-xs text-gray-600">
                              {classData.room}
                            </div>
                            <div className="text-xs mt-1">
                              {formatTime(classData.startTime)} -{' '}
                              {formatTime(classData.endTime)}
                            </div>
                            {isHod && (
                              <div className="flex space-x-2 mt-2">
                                <button
                                  onClick={() => onEdit(classData)}
                                  className="p-1 text-green-600 hover:text-green-700"
                                  title="Edit"
                                >
                                  <Pencil className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(classData._id)}
                                  className="p-1 text-red-600 hover:text-red-700"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-8 text-gray-500">
            No routines found for this semester
          </p>
        )}
      </div>
    </div>
  );
};

export default TimeTable;