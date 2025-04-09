import React from "react";
import { toast } from "sonner";

const SettingSlied = ({ setActiveSetting }) => {
  return (
    <div className="h-full bg-red-100 w-1/3 rounded-lg px-2 py-2 flex flex-col gap-y-5 transition-all duration-500">
      <button
        className="bg-blue-300 cursor-pointer hover:bg-blue-700 h-10 w-full rounded-lg transition-all duration-500"
        onClick={() => setActiveSetting('photo')}
      >
        Change Photo
      </button>

      <button
        className="bg-blue-300 cursor-pointer hover:bg-blue-700 h-10 w-full rounded-lg transition-all duration-500"
        onClick={() => setActiveSetting('email')}
      >
        Change Email
      </button>

      <button
        className="bg-blue-300 cursor-pointer hover:bg-blue-700 h-10 w-full rounded-lg transition-all duration-500"
        onClick={() => setActiveSetting('phone')}
      >
        Change Phone
      </button>

      <button
        className="bg-blue-300 cursor-pointer hover:bg-blue-700 h-10 w-full rounded-lg transition-all duration-500"
        onClick={() => setActiveSetting('password')}
      >
        Change Password
      </button>

      <button
        className="bg-blue-300 cursor-pointer hover:bg-red-700 h-10 w-full rounded-lg transition-all duration-500"
        onClick={() => toast.error('Delete account logic here')}
      >
        Delete Account
      </button>
    </div>
  );
};

export default SettingSlied;
