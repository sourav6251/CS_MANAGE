import { useSelector } from 'react-redux';
import RoutineForm from './RoutineForm';
import TimeTable from './TimeTable';

const RoutineSection = () => {
  const role = useSelector((state) => state.user.role); // adjust 'auth' based on your actual reducer

  const isHod = role === 'hod';

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Class Routine</h1>
        <p className="text-gray-600">
          {isHod ? 'Manage class schedules and routines' : 'View your class schedules'}
        </p>
      </div>

      {isHod && <RoutineForm />}
      <TimeTable />
    </div>
  );
};

export default RoutineSection;
