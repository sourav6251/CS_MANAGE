import { useSelector } from 'react-redux';
import DashboardHOD from '../dashboard/DashboardHOD';
import DashboardFaculty from '../dashboard/DashboardFaculty';
import DashboardStudent from '../dashboard/DashboardStudent';
import DashboardExternal from '../dashboard/DashboardExternal';

export const Home = () => {
  const role = useSelector((state) => state.user.role);

  switch (role) {
    case 'hod':
      return <DashboardHOD />;
    case 'faculty':
      return <DashboardFaculty />;
    case 'student':
      return <DashboardStudent />;
    case 'external':
      return <DashboardExternal />;
    default:
      return <div className="p-4">No dashboard available for this role.</div>;
  }
};
