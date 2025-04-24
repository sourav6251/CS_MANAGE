import { useSelector, useDispatch } from 'react-redux';
// import { setRole } from '../redux/UserState';
import { setRole } from "../../redux/UserState";
import { Bell, Menu } from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role);

  const handleRoleChange = (newRole) => {
    dispatch(setRole(newRole));
  };

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

  return (
    <header className="bg-blue-700 text-white shadow-md h-[3rem]">
      <div className="max-w-7xl mx-auto px-4  flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🏫</span>
          <h1 className="text-xl font-bold hidden md:block">College Department Management</h1>
          <h1 className="text-xl font-bold md:hidden">CDM System</h1>
        </div>
  
        {/* Role Dropdown */}
        {/* <div className="relative group">
          <button className="bg-white bg-opacity-20 px-3 py-1 rounded flex items-center gap-2 cursor-pointer">
            {getRoleDisplay()}
            <span>▼</span>
          </button>
          <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md w-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <div
              onClick={() => handleRoleChange('hod')}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              HOD View
            </div>
            <div
              onClick={() => handleRoleChange('faculty')}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Faculty View
            </div>
            <div
              onClick={() => handleRoleChange('student')}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Student View
            </div>
            <div
              onClick={() => handleRoleChange('external')}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              External View
            </div>
          </div>
        </div> */}

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Bell icon */}
          <button className="hidden md:inline-flex p-2 rounded-full hover:bg-white hover:bg-opacity-20">
            <Bell className="h-5 w-5" />
          </button>

          {/* Avatar + Label */}
          <div className="hidden md:flex items-center gap-2 p-2 rounded-full hover:bg-white hover:bg-opacity-20 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white font-semibold">{getRoleInitials()}</span>
            </div>
            <span className="font-medium">{getRoleDisplay()}</span>
          </div>

          {/* Menu icon for mobile */}
          <button className="md:hidden p-2 rounded-full hover:bg-white hover:bg-opacity-20">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
