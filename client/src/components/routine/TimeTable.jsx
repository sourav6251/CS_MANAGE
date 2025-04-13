import { useState } from 'react';
import { routines as initialRoutines, semesters } from '../../data/mockData';
import { groupRoutinesByDay, formatTime } from '../../lib/utils';

const TimeTable = () => {
  const [semesterFilter, setSemesterFilter] = useState(1);
  const [routines] = useState(initialRoutines);

  const filteredRoutines = routines.filter(
    routine => routine.semester === semesterFilter
  );

  const routinesByDay = groupRoutinesByDay(filteredRoutines);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getClassForTimeSlot = (day, timeSlot) => {
    return filteredRoutines.find(routine =>
      routine.day === day &&
      routine.startTime <= timeSlot &&
      routine.endTime > timeSlot
    );
  };

  const getClassDuration = (routine) => {
    if (!routine) return 1;
    const startIndex = timeSlots.findIndex(slot => slot === routine.startTime);
    const endIndex = timeSlots.findIndex(slot => slot === routine.endTime);
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

  return (
    <div className="rounded-md shadow-sm border border-gray-200 overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
        <h2 className="text-lg font-semibold text-primary">Weekly Class Schedule</h2>
        <select
          className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(Number(e.target.value))}
        >
          {semesters.map(semester => (
            <option key={semester} value={semester}>Semester {semester}</option>
          ))}
        </select>
      </div>
      <div className="p-4 overflow-x-auto bg-white">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left">Time / Day</th>
              {days.map(day => (
                <th key={day} className="border border-gray-200 px-4 py-2 text-left">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((timeSlot, index) => (
              <tr key={timeSlot}>
                <td className="border border-gray-200 px-4 py-2 whitespace-nowrap bg-gray-50 font-medium">
                  {formatTime(timeSlot)} - {formatTime(timeSlots[index + 1] || '18:00')}
                </td>
                {days.map(day => {
                  const classData = getClassForTimeSlot(day, timeSlot);
                  if (!shouldRenderCell(day, timeSlot, index)) return null;

                  return (
                    <td
                      key={`${day}-${timeSlot}`}
                      className={`border border-gray-200 ${classData ? 'bg-blue-50' : ''}`}
                      rowSpan={classData ? getClassDuration(classData) : 1}
                    >
                      {classData && (
                        <div className="p-2">
                          <div className="font-medium text-secondary">{classData.paperCode}</div>
                          <div className="text-xs text-gray-600">{classData.room}</div>
                          <div className="text-xs mt-1">
                            {formatTime(classData.startTime)} - {formatTime(classData.endTime)}
                          </div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;
