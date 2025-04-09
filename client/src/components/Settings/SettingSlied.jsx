import React from "react";
import { toast } from "sonner";
import { 
  UserCircle, 
  Mail, 
  Phone, 
  Key, 
  Trash2,
  ChevronRight
} from "lucide-react";

const SettingSlied = ({ setActiveSetting }) => {
  return (
    <div className="h-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-1/3 rounded-lg px-4 py-6 flex flex-col gap-y-4 transition-all duration-500 bg-white">
      <button
        className="flex items-center justify-between bg-blue-50 hover:bg-blue-100 text-blue-800 cursor-pointer h-12 w-full rounded-lg px-4 transition-all duration-300 group"
        onClick={() => setActiveSetting('photo')}
      >
        <div className="flex items-center gap-3">
          <UserCircle size={20} />
          <span>Change Photo</span>
        </div>
        <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      <button
        className="flex items-center justify-between bg-blue-50 hover:bg-blue-100 text-blue-800 cursor-pointer h-12 w-full rounded-lg px-4 transition-all duration-300 group"
        onClick={() => setActiveSetting('email')}
      >
        <div className="flex items-center gap-3">
          <Mail size={20} />
          <span>Change Email</span>
        </div>
        <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      <button
        className="flex items-center justify-between bg-blue-50 hover:bg-blue-100 text-blue-800 cursor-pointer h-12 w-full rounded-lg px-4 transition-all duration-300 group"
        onClick={() => setActiveSetting('phone')}
      >
        <div className="flex items-center gap-3">
          <Phone size={20} />
          <span>Change Phone</span>
        </div>
        <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      <button
        className="flex items-center justify-between bg-blue-50 hover:bg-blue-100 text-blue-800 cursor-pointer h-12 w-full rounded-lg px-4 transition-all duration-300 group"
        onClick={() => setActiveSetting('password')}
      >
        <div className="flex items-center gap-3">
          <Key size={20} />
          <span>Change Password</span>
        </div>
        <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      <div className="border-t border-gray-200 my-2"></div>

      <button
        className="flex items-center justify-between bg-red-50 hover:bg-red-100 text-red-800 cursor-pointer h-12 w-full rounded-lg px-4 transition-all duration-300 group"
        onClick={() => toast.error('Delete account logic here')}
      >
        <div className="flex items-center gap-3">
          <Trash2 size={20} />
          <span>Delete Account</span>
        </div>
        <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
};

export default SettingSlied;