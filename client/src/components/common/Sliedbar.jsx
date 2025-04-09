import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home, Bell, BookOpen, Calendar,
  Users, Award, Settings, LogOut
} from 'lucide-react';
import { logoutUser } from '../../redux/UserState'; // adjust to your actual path

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const role = useSelector((state) => state.user.role);

  const getRoleDisplay = () => {
    switch (role) {
      case 'hod': return 'Admin HOD';
      case 'faculty': return 'Faculty Member';
      case 'student': return 'Student';
      case 'external': return 'External User';
      default: return 'User';
    }
  };

  const getRoleInitials = () => {
    switch (role) {
      case 'hod': return 'AH';
      case 'faculty': return 'FM';
      case 'student': return 'ST';
      case 'external': return 'EU';
      default: return 'U';
    }
  };

  const navItems = [
    { label: 'Dashboard', icon: Home, path: '/', roles: ['hod', 'faculty', 'student', 'external'] },
    { label: 'Notice Board', icon: Bell, path: '/notices', roles: ['hod', 'faculty', 'student'] },
    { label: 'Syllabus', icon: BookOpen, path: '/syllabus', roles: ['hod', 'faculty', 'student', 'external'] },
    { label: 'Routine', icon: Calendar, path: '/routine', roles: ['hod', 'student', 'faculty'] },
    { label: 'Meetings', icon: Users, path: '/meetings', roles: ['hod', 'faculty', 'external'], badge: role === 'faculty' ? '2' : null },
    { label: 'Certificate Requests', icon: Award, path: '/certificates', roles: ['hod', 'external'], badge: role === 'hod' ? '3' : null },
    { label: 'Settings', icon: Settings, path: '/settings', roles: ['hod', 'faculty', 'student', 'external'] },
  ];

  return (   <aside className="w-64 bg-gradient-to-b from-white to-gray-50 shadow-xl h-full flex flex-col justify-between border-r border-gray-100">
    {/* Profile Section */}
    <div className="px-4 py-6">
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg">
          <span className="text-white text-2xl font-semibold">
            {getRoleInitials()}
          </span>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {getRoleDisplay()}
          </h3>
          <p className="text-sm text-primary/80">Computer Science</p>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-1.5">
        {navItems.map(({ label, icon: Icon, path, roles, badge }) =>
          roles.includes(role) && (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `group flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary/10 border-l-4 border-primary text-primary font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <Icon className={`w-5 h-5 ${role === 'hod' ? 'stroke-2' : ''}`} />
              <span className="ml-3 text-sm">{label}</span>
              {badge && (
                <span className="ml-auto bg-accent text-white text-xs px-2 py-1 rounded-full">
                  {badge}
                </span>
              )}
            </NavLink>
          )
        )}
      </nav>
    </div>

    {/* Logout Section */}
    <div className="border-t border-gray-100 px-4 py-5">
      <button
        onClick={() => dispatch(logoutUser())}
        className="w-full flex items-center justify-center px-4 py-2.5 text-red-600 rounded-lg hover:bg-red-50/80 transition-all"
      >
        <LogOut className="w-5 h-5 mr-2 stroke-red-600" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
  </aside>
);
    // <aside className="w-64 bg-white shadow-md hidden md:flex flex-col h-full">
    //   <div className="py-6 px-4 flex-1">
    //     <div className="flex items-center justify-center mb-6">
    //       <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
    //         <span className="text-white text-xl font-medium">{getRoleInitials()}</span>
    //       </div>
    //     </div>

    //     <div className="text-center mb-6">
    //       <h3 className="font-medium text-lg">{getRoleDisplay()}</h3>
    //       <p className="text-gray-500 text-sm">Computer Science</p>
    //     </div>

    //     <nav>
    //       <ul className="space-y-1">
    //         {navItems.map(({ label, icon: Icon, path, roles, badge }) =>
    //           roles.includes(role) && (
    //             <li key={path}>
    //               <NavLink
    //                 to={path}
    //                 className={({ isActive }) =>
    //                   `flex items-center px-4 py-3 rounded-lg transition-colors ${
    //                     isActive
    //                       ? 'bg-background/50 text-primary font-medium'
    //                       : 'text-gray-700 hover:bg-gray-100'
    //                   }`
    //                 }
    //               >
    //                 <Icon className="w-5 h-5 mr-3" />
    //                 <span>{label}</span>
    //                 {badge && (
    //                   <span className="ml-auto bg-accent text-white text-xs px-2 py-1 rounded-full">{badge}</span>
    //                 )}
    //               </NavLink>
    //             </li>
    //           )
    //         )}
    //       </ul>
    //     </nav>
    //   </div>

    //   <div className="mt-auto border-t border-gray-200 p-4">
    //     <button
    //       onClick={() => dispatch(logoutUser())}
    //       className="w-full flex items-center justify-center px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition"
    //     >
    //       <LogOut className="mr-2 h-4 w-4" />
    //       <span>Logout</span>
    //     </button>
    //   </div>
    // </aside>
//   );
};

export default Sidebar;