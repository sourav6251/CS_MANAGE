import { useSelector } from 'react-redux';
import DashboardHOD from '../components/dashboard/DashboardHOD';
import DashboardFaculty from '../components/dashboard/DashboardFaculty';
import DashboardStudent from '../components/dashboard/DashboardStudent';
import DashboardExternal from '../components/dashboard/DashboardExternal';

export const DashboardPages = () => {
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
